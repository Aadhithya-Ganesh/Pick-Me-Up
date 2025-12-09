import asyncio
from aio_pika import connect_robust, ExchangeType, IncomingMessage
from app.database import SessionLocal
from app.service.ride_service import RideService
from app.rabbitmq.event_service import EventService
from app.models.model import PendingRequest
import logging
import json
import os

logging.basicConfig(
    level=logging.INFO,
    format=f'%(asctime)s - RideService - %(levelname)s - %(message)s')

logger = logging.getLogger(__name__)

RABBITMQ_USER = os.getenv("RABBITMQ_USER")
RABBITMQ_PASSWORD = os.getenv("RABBITMQ_PASSWORD")
RABBITMQ_HOST = os.getenv("RABBITMQ_HOST")
RABBITMQ_PORT = os.getenv("RABBITMQ_PORT")

async def process_seat_reserve_requested(message_body: dict, db):
    try:
        ride_id = message_body.get("ride_id")
        booking_id = message_body.get("booking_id")
        user_id = message_body.get("user_id")
        seats_requested = int(message_body.get("seats_requested", 1))
        pickup = message_body.get("pickup_location", "")
        dropoff = message_body.get("dropoff_location", "")

        logger.info(f"Processing seat.reserve_requested for booking {booking_id} on ride {ride_id}")

        # create new pending request row
        pending = RideService.create_pending_request(
            db=db,
            ride_id=ride_id,
            booking_id=booking_id,
            user_id=user_id,
            seats_requested=seats_requested,
            pickup_location=pickup,
            dropoff_location=dropoff,
        )

        if pending:
            logger.info(f"Pending request created for booking {booking_id}")
        else:
            logger.warning(f"Failed to create pending request for booking {booking_id}")

    except Exception as e:
        logger.error(f"Error processing seat.reserve_requested: {e}")
        raise

async def process_booking_cancelled(message_body: dict, db):
    try:
        booking_id = message_body.get("booking_id")
        ride_id = message_body.get("ride_id")
        seats_to_release = int(message_body.get("seats_to_release", 0))
        cancellation_reason = message_body.get("cancellation_reason", message_body.get("reason", "UNKNOWN"))

        logger.info(
            f"Processing booking.cancelled for booking {booking_id}, ride {ride_id}, reason: {cancellation_reason}"
        )

        # Remove pending requests for this booking (if any)
        removed_count = RideService.clear_pending_request(db=db, booking_id=booking_id)

        logger.info(f"Removed {removed_count} pending requests for cancelled booking {booking_id}")

        # Free seat or update ride if needed
        updated_ride = RideService.free_seat_after_cancellation(
            db=db,
            ride_id=ride_id,
            seats_to_release=seats_to_release,
            cancellation_reason=cancellation_reason
        )

        if updated_ride:
            logger.info(f"Seat freed for ride {ride_id} after cancellation")

    except Exception as e:
        logger.error(f"Error processing booking.cancelled: {e}")
        raise

async def on_message(message: IncomingMessage):
    async with message.process():
        try:
            message_body = json.loads(message.body.decode())
            event_type = message_body.get("event_type")

            logger.info(f"Received event: {event_type}")

            db = SessionLocal()

            try:
                if event_type == "seat.reserve_requested":
                    await process_seat_reserve_requested(message_body, db)

                elif event_type == "booking.cancelled":
                    await process_booking_cancelled(message_body, db)

                else:
                    logger.warning(f"Unknown event type: {event_type}")

            finally:
                db.close()

        except Exception as e:
            logger.error(f"Error processing message: {e}")
            raise

async def start_consumer():
    try:
        rabbitmq_url = (
                f"amqp://{RABBITMQ_USER}:{RABBITMQ_PASSWORD}@{RABBITMQ_HOST}:{RABBITMQ_PORT}/"
            )

        connection = await connect_robust(rabbitmq_url)
        channel = await connection.channel()

        await channel.set_qos(prefetch_count=10)

        booking_events_exchange = await channel.declare_exchange(
            name="booking_events",
            type=ExchangeType.TOPIC,
            durable=True
        )

        queue = await channel.declare_queue(
            name="ride_service_booking_updates",
            durable=True
        )

        # listen for both events
        await queue.bind(booking_events_exchange, "seat.reserve_requested")
        await queue.bind(booking_events_exchange, "booking.cancelled")

        logger.info("Ride-service consumer ready")
        logger.info("Listening for: seat.reserve_requested, booking.cancelled")

        await queue.consume(on_message)

        await asyncio.Future()

    except KeyboardInterrupt:
        logger.info("Consumer stopped by user")
    except Exception as e:
        logger.error(f"Consumer error: {e}")
        raise

if __name__ == "__main__":
    asyncio.run(start_consumer())