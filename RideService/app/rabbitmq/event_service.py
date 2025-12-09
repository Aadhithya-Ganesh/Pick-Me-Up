from app.rabbitmq.rabbitmq import rabbitmq_client
from app.rabbitmq.schema import (
    SeatReservedEvent,
    SeatReservationFailedEvent,
    RideCancelledEvent
)
import logging

logger = logging.getLogger(__name__)

class EventService:
    @staticmethod
    async def publish_seat_reserved(pending_request):
        event = SeatReservedEvent(
            booking_id=pending_request.booking_id,
            ride_id=pending_request.ride_id,
            seats=pending_request.seats,
        )

        await rabbitmq_client.publish_event(
            exchange_name="ride_events",
            routing_key="seat.reserved",
            message=event.model_dump(mode="json")
        )

        logger.info(f"[EVENT] seat.reserved → booking_id={pending_request.booking_id}")


    @staticmethod
    async def publish_seat_reservation_failed(pending_request, reason: str):
        event = SeatReservationFailedEvent(
            booking_id=pending_request.booking_id,
            ride_id=pending_request.ride_id,
            reason=reason,
        )

        await rabbitmq_client.publish_event(
            exchange_name="ride_events",
            routing_key="seat.reservation_failed",
            message=event.model_dump(mode="json")
        )

        logger.info(f"[EVENT] seat.reservation_failed → booking_id={pending_request.booking_id}")

    @staticmethod
    async def publish_ride_cancelled(ride):
        event = RideCancelledEvent(
            ride_id=ride.id,
        )

        await rabbitmq_client.publish_event(
            exchange_name="ride_events",
            routing_key="ride.cancelled",
            message=event.model_dump(mode="json")
        )

        logger.info(f"[EVENT] ride.cancelled → ride_id={ride.id}")
