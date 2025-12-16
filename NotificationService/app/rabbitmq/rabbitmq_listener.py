import asyncio
import json
from aio_pika import IncomingMessage, ExchangeType

from app.rabbitmq.connection import connect_rabbitmq
from app.db import SessionLocal
from app.models import Notification

QUEUE_NAME = "notification_queue"


async def handle_message(message: IncomingMessage):
    async with message.process():
        payload = json.loads(message.body.decode())
        event_type = payload.get("event_type")

        print(f"Received event: {event_type}")

        db = SessionLocal()
        try:
            if event_type == "ride.published":
                # Assuming ride service sends driver_id
                db.add(Notification(
                    user_id=payload.get("driver_id") or payload.get("user_id"),
                    type=event_type,
                    message="Your ride has been published successfully"
                ))
            
            elif event_type == "booking.created":

                db.add(Notification(
                    user_id=payload.get("user_id"),
                    type=event_type,
                    message="Your booking has been created"
                ))

            elif event_type == "booking.confirmed":
                db.add(Notification(
                    user_id=payload.get("user_id"),
                    type=event_type,
                    message=f"Your booking for ride {payload.get('ride_id')} has been confirmed!"
                ))
                
                # Also notify driver if driver_id is present
                driver_id = payload.get("driver_id")
                if driver_id:
                    db.add(Notification(
                        user_id=driver_id,
                        type=event_type,
                        message=f"Booking confirmed: {payload.get('seats_booked')} seats booked by user {payload.get('user_id')}"
                    ))
            
            elif event_type == "booking.cancelled":
                # FIXED: Get data from top level
                db.add(Notification(
                    user_id=payload.get("user_id"),
                    type=event_type,
                    message=f"Your booking {payload.get('booking_id')} was cancelled"
                ))
                
                # Also notify driver if driver_id is present
                driver_id = payload.get("driver_id")
                if driver_id:
                    db.add(Notification(
                        user_id=driver_id,
                        type=event_type,
                        message=f"Booking cancelled: {payload.get('seats_to_release')} seats released"
                    ))

            elif event_type == "ride.cancelled":
                # Assuming ride service sends affected_users list
                affected_users = payload.get("affected_users", [])
                for user_id in affected_users:
                    db.add(Notification(
                        user_id=user_id,
                        type=event_type,
                        message=f"Ride {payload.get('ride_id')} was cancelled by the driver"
                    ))
            
            elif event_type == "booking.expired":
                # NEW: Handle booking expired
                db.add(Notification(
                    user_id=payload.get("user_id"),
                    type=event_type,
                    message=f"Your booking {payload.get('booking_id')} expired due to: {payload.get('reason')}"
                ))

            db.commit()
            print(f"Notification(s) created for event: {event_type}")
            
        except Exception as e:
            print(f"Error handling event {event_type}: {e}")
            db.rollback()
        finally:
            db.close()


async def start_consumer():
    while True:
        try:
            print("Trying to connect to RabbitMQ...")
            channel = await connect_rabbitmq()

            # await channel.set_qos(prefetch_count=10)

            # queue = await channel.declare_queue(
            #     QUEUE_NAME,
            #     durable=True
            # )

            # await queue.consume(handle_message)
            ride_exchange = await channel.declare_exchange(
                name="ride_events",
                type=ExchangeType.TOPIC,
                durable=True
            )
            book_exchange = await channel.declare_exchange(
                name="booking_events",
                type=ExchangeType.TOPIC,
                durable=True
            )

            queue = await channel.declare_queue(
                name=QUEUE_NAME,
                durable=True
            )

            await queue.bind(book_exchange, routing_key="booking.*")
            await queue.bind(ride_exchange, routing_key="ride.*")

            await queue.consume(handle_message)

            print("🔔 NotificationService is listening for events...")
            
            # VERY IMPORTANT
            await asyncio.Future()  # keep task alive forever

        except Exception as e:
            print(f"RabbitMQ not ready, retrying in 5s → {e}")
            await asyncio.sleep(5)
