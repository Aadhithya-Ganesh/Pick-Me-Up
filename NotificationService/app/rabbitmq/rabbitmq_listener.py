import asyncio
import json
import logging
from aio_pika import IncomingMessage, ExchangeType
from app.rabbitmq.connection import connect_rabbitmq
from app.db import SessionLocal
from app.models import Notification

logger = logging.getLogger(__name__)

QUEUE_NAME = "notification_queue"

async def handle_message(message: IncomingMessage):
    async with message.process():
        payload = json.loads(message.body.decode())
        event_type = (payload.get("event_type") or payload.get("event") or payload.get("type"))
        data = payload.get("data") or payload

        db = SessionLocal()
        try:
            if event_type == "booking.created":
                user_id = data.get("user_id")
                if user_id:
                    db.add(Notification(
                        user_id = user_id,
                        type = event_type,
                        message = "Your Booking has been requested!"
                    ))
            elif event_type == "ride.published":
                driver_id = data.get("driver_id")
                if driver_id:
                    db.add(Notification(
                        user_id = driver_id,
                        type = event_type,
                        message = "Your ride has been published successfully!"
                    ))
            elif event_type == "booking.confirmed":
                user_id = data.get("user_id")
                if user_id:
                    db.add(Notification(
                        user_id = user_id,
                        type = event_type,
                        message = "Your booking request has been accepted!"
                    ))
            elif event_type in ["booking.cancelled","booking.expired"]:
                user_id = data.get("user_id")
                if user_id:
                    db.add(Notification(
                        user_id = user_id,
                        type = event_type,
                        message = "Your booking request was cancelled!"
                    ))
            # elif event_type == "ride.cancelled":
            #     driver_id = data.get("driver_id")
            #     db.add(Notification(
            #         user_id=driver_id,
            #         type=event_type,
            #         message="Your ride was cancelled"
            #     ))
            db.commit()
        finally:
            db.close()

async def start_consumer():
    while True:
        try:
            channel = await connect_rabbitmq()
            await channel.set_qos(prefetch_count=10)

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

            logger.info("NotificationService is listening for events...")
            await asyncio.Future() 

        except Exception as e:
            logger.error(f"RabbitMQ not ready, retrying in 5s → {e}")
            await asyncio.sleep(5)
