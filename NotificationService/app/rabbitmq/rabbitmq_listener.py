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
        data = payload.get("data")

        print(f"📩 Received event: {event_type}")

        db = SessionLocal()
        try:
            if event_type == "ride.published":
                db.add(Notification(
                    user_id=data["user_id"],
                    type=event_type,
                    message="Your ride has been published successfully"
                ))
            if event_type == "booking.created":
                db.add(Notification(
                    user_id=data["user_id"],
                    type=event_type,
                    message="Your booking has been created"
                ))

            elif event_type == "booking.confirmed":
                db.add(Notification(
                    user_id=data["user_id"],
                    type=event_type,
                    message="Your booking has been confirmed"
                ))
            elif event_type == "booking.cancelled":
                db.add(Notification(
                    user_id=data["user_id"],
                    type=event_type,
                    message="Your booking was cencelled"
                ))

            elif event_type == "ride.cancelled":
                for user_id in data.get("affected_users", []):
                    db.add(Notification(
                        user_id=user_id,
                        type=event_type,
                        message="Your ride was cancelled"
                    ))
            # elif event_type == "ride.published":
            #     db.add(Notification(
            #         user_id=data["driver_id"],
            #         type=event_type,
            #         message="Your ride has been published successfully"
            #     ))

            db.commit()
        finally:
            db.close()


async def start_consumer():
    while True:
        try:
            print("🔁 Trying to connect to RabbitMQ...")
            channel = await connect_rabbitmq()

            # await channel.set_qos(prefetch_count=10)

            # queue = await channel.declare_queue(
            #     QUEUE_NAME,
            #     durable=True
            # )

            # await queue.consume(handle_message)
            exchange = await channel.declare_exchange(
                name="booking_events",
                type=ExchangeType.TOPIC,
                durable=True
            )

            queue = await channel.declare_queue(
                name=QUEUE_NAME,
                durable=True
            )

            await queue.bind(exchange, routing_key="booking.*")
            # await queue.bind(exchange, routing_key="ride.*")

            await queue.consume(handle_message)

            print("🔔 NotificationService is listening for events...")
            
            # 👇 VERY IMPORTANT
            await asyncio.Future()  # keep task alive forever

        except Exception as e:
            print(f"⚠️ RabbitMQ not ready, retrying in 5s → {e}")
            await asyncio.sleep(5)
