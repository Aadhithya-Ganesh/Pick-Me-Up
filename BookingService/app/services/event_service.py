from app.events.schemas import (
    SeatReserveRequestedEvent,
    BookingConfirmedEvent,
    BookingCancelledEvent,
    BookingExpiredEvent,
)
from app.core.rabbitmq import rabbitmq_client
from app.config import settings
from app.models.booking import Booking
import logging
import aio_pika
import json

logger = logging.getLogger(__name__)

class EventService:    
    @staticmethod
    async def get_rabbitmq_connection():
        """Get RabbitMQ connection"""
        rabbitmq_url = (
            f"amqp://{settings.RABBITMQ_USER}:{settings.RABBITMQ_PASSWORD}"
            f"@{settings.RABBITMQ_HOST}:{settings.RABBITMQ_PORT}{settings.RABBITMQ_VHOST}"
        )
        connection = await aio_pika.connect_robust(rabbitmq_url)
        return connection

    @staticmethod
    async def publish_booking_created(booking):
        event = {
            "event_type": "booking.created",
            "data": {
                "user_id": booking.user_id,
                "booking_id": booking.booking_id,
                "ride_id": booking.ride_id
            }
        }
        await rabbitmq_client.publish_event(
            exchange_name="booking_events",
            routing_key="booking.created",
            message=event
        )
        logger.info(f"[EVENT] booking.created → booking={booking.id}")
    
    @staticmethod
    async def publish_event(exchange_name: str, routing_key: str, message: dict):
        try:
            connection = await EventService.get_rabbitmq_connection()
            channel = await connection.channel()
            
            exchange = await channel.declare_exchange(
            name=exchange_name,
            type=aio_pika.ExchangeType.TOPIC,
            durable=True
        )
            message_body = json.dumps(message).encode()
            
            rabbitmq_message = aio_pika.Message(
                body=message_body,
                content_type="application/json",
                delivery_mode=aio_pika.DeliveryMode.PERSISTENT
            )
            
            await exchange.publish(rabbitmq_message, routing_key=routing_key)
            
            logger.info(f"Event published: {routing_key} to {exchange_name}")
            
            await connection.close()
            
        except Exception as e:
            logger.error(f"Failed to publish event: {e}")
            raise
    
    @staticmethod
    async def publish_seat_reserve_requested(booking: Booking):
        # Publish event when user creates a booking
        try:
            event = SeatReserveRequestedEvent(
                booking_id=booking.booking_id,
                ride_id=booking.ride_id,
                user_id=booking.user_id,
                seats_requested=booking.seats_booked,
                pickup_location=booking.pickup_location,
                dropoff_location=booking.dropoff_location,
                instance_id=settings.INSTANCE_ID
            )
            
            await EventService.publish_event(
                exchange_name="booking_events",
                routing_key="seat.reserve_requested",
                message=event.model_dump(mode='json')
            )
            
            logger.info(f"Published seat.reserve_requested for booking {booking.booking_id}")
            
        except Exception as e:
            logger.error(f"Failed to publish seat.reserve_requested: {e}")
    
    @staticmethod
    async def publish_booking_confirmed(booking: Booking, driver_id: str = None):
        # Publish event when booking is confirmed
        try:
            event = BookingConfirmedEvent(
                booking_id=booking.booking_id,
                user_id=booking.user_id,
                ride_id=booking.ride_id,
                driver_id=driver_id,
                seats_booked=booking.seats_booked,
                total_price=float(booking.total_price) if booking.total_price else None,
                pickup_location=booking.pickup_location,
                dropoff_location=booking.dropoff_location,
                instance_id=settings.INSTANCE_ID
            )
            
            await EventService.publish_event(
                exchange_name="booking_events",
                routing_key="booking.confirmed",
                message=event.model_dump(mode='json')
            )
            
            logger.info(f"Published booking.confirmed for booking {booking.booking_id}")
            
        except Exception as e:
            logger.error(f"Failed to publish booking.confirmed: {e}")
    
    @staticmethod
    async def publish_booking_cancelled(booking: Booking, cancelled_by: str = "USER"):
        # Publish event when booking is cancelled
        try:
            event = BookingCancelledEvent(
                booking_id=booking.booking_id,
                user_id=booking.user_id,
                ride_id=booking.ride_id,
                seats_to_release=booking.seats_booked,
                cancellation_reason=booking.cancellation_reason,
                cancelled_by=cancelled_by,
                instance_id=settings.INSTANCE_ID
            )
            
            await EventService.publish_event(
                exchange_name="booking_events",
                routing_key="booking.cancelled",
                message=event.model_dump(mode='json')
            )
            
            logger.info(f"Published booking.cancelled for booking {booking.booking_id}")
            
        except Exception as e:
            logger.error(f"Failed to publish booking.cancelled: {e}")
    
    @staticmethod
    async def publish_booking_expired(booking: Booking):
        # Publish event when booking expires
        try:
            event = BookingExpiredEvent(
                booking_id=booking.booking_id,
                user_id=booking.user_id,
                ride_id=booking.ride_id,
                reason="TIMEOUT",
                instance_id=settings.INSTANCE_ID
            )
            
            await EventService.publish_event(
                exchange_name="booking_events",
                routing_key="booking.expired",
                message=event.model_dump(mode='json')
            )
            
            logger.info(f"Published booking.expired for booking {booking.booking_id}")
            
        except Exception as e:
            logger.error(f"Failed to publish booking.expired: {e}")