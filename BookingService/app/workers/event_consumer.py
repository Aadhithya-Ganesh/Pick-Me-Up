import asyncio
from aio_pika import connect_robust, ExchangeType, IncomingMessage
from app.core.database import SessionLocal
from app.services.booking_service import BookingService
from app.services.event_service import EventService
from app.models.booking import BookingStatus
from app.config import settings
import logging
import json

logging.basicConfig(
    level=logging.INFO,
    format=f'%(asctime)s - {settings.INSTANCE_ID} - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

async def process_seat_reserved(message_body: dict, db):
    try:
        booking_id = message_body.get("booking_id")
        driver_id = message_body.get("driver_id")
        
        logger.info(f"Processing seat.reserved for booking {booking_id}")
        
        booking_service = BookingService(db)
        
        booking = booking_service.update_booking_status(
            booking_id=booking_id,
            new_status=BookingStatus.CONFIRMED
        )
        
        if booking:
            logger.info(f"Booking {booking_id} confirmed successfully")
            
            await EventService.publish_booking_confirmed(booking, driver_id=driver_id)
        else:
            logger.warning(f"Booking {booking_id} not found")
        
    except Exception as e:
        logger.error(f"Error processing seat.reserved: {e}")
        raise

async def process_seat_reservation_failed(message_body: dict, db):
    try:
        booking_id = message_body.get("booking_id")
        reason = message_body.get("reason", "UNKNOWN")
        
        logger.info(f"Processing seat.reservation_failed for booking {booking_id}, reason: {reason}")
        
        booking_service = BookingService(db)
        
        booking = booking_service.update_booking_status(
            booking_id=booking_id,
            new_status=BookingStatus.EXPIRED
        )
        
        if booking:
            logger.info(f"Booking {booking_id} expired due to: {reason}")
            
            await EventService.publish_booking_expired(booking)
        else:
            logger.warning(f"Booking {booking_id} not found")
        
    except Exception as e:
        logger.error(f"Error processing seat.reservation_failed: {e}")
        raise

async def process_ride_cancelled(message_body: dict, db):
    try:
        ride_id = message_body.get("ride_id")
        
        logger.info(f"Processing ride.cancelled for ride {ride_id}")
        
        booking_service = BookingService(db)
        
        bookings = booking_service.get_bookings_by_ride(
            ride_id=ride_id,
            status=None  
        )
        
        cancelled_count = 0
        for booking in bookings:
            if booking.status in [BookingStatus.PENDING, BookingStatus.CONFIRMED]:
                cancelled_booking = booking_service.cancel_booking(
                    booking_id=booking.booking_id,
                    cancellation_reason="Ride cancelled by driver"
                )
                
                await EventService.publish_booking_cancelled(
                    cancelled_booking,
                    cancelled_by="SYSTEM"
                )
                
                cancelled_count += 1
        
        logger.info(f"Cancelled {cancelled_count} bookings for ride {ride_id}")
        
    except Exception as e:
        logger.error(f"Error processing ride.cancelled: {e}")
        raise

async def on_message(message: IncomingMessage):
    """
    Callback function for processing incoming messages
    """
    async with message.process():
        try:
            message_body = json.loads(message.body.decode())
            event_type = message_body.get("event_type")
            
            logger.info(f"Received event: {event_type}")
            
            db = SessionLocal()
            
            try:
                if event_type == "seat.reserved":
                    await process_seat_reserved(message_body, db)
                    
                elif event_type == "seat.reservation_failed":
                    await process_seat_reservation_failed(message_body, db)
                    
                elif event_type == "ride.cancelled":
                    await process_ride_cancelled(message_body, db)
                    
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
            f"amqp://{settings.RABBITMQ_USER}:{settings.RABBITMQ_PASSWORD}"
            f"@{settings.RABBITMQ_HOST}:{settings.RABBITMQ_PORT}{settings.RABBITMQ_VHOST}"
        )
        
        connection = await connect_robust(rabbitmq_url)
        channel = await connection.channel()
        
        await channel.set_qos(prefetch_count=10)
        
        ride_events_exchange = await channel.declare_exchange(
            name="ride_events",
            type=ExchangeType.TOPIC,
            durable=True
        )
        
        queue = await channel.declare_queue(
            name="booking_service_ride_updates",
            durable=True
        )
        
        await queue.bind(
            exchange=ride_events_exchange,
            routing_key="seat.reserved"
        )
        await queue.bind(
            exchange=ride_events_exchange,
            routing_key="seat.reservation_failed"
        )
        await queue.bind(
            exchange=ride_events_exchange,
            routing_key="ride.cancelled"
        )
        
        logger.info(f"Consumer ready, listening on queue: booking_service_ride_updates")
        logger.info(f"Listening for: seat.reserved, seat.reservation_failed, ride.cancelled")
        
        await queue.consume(on_message)
        
        await asyncio.Future()  
        
    except KeyboardInterrupt:
        logger.info("Consumer stopped by user")
    except Exception as e:
        logger.error(f"Consumer error: {e}")
        raise

if __name__ == "__main__":
    asyncio.run(start_consumer())