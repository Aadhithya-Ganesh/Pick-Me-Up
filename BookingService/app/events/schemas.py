from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, Dict, Any

class BaseEvent(BaseModel):
    # Base event schema
    event_type: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    instance_id: Optional[str] = None

class SeatReserveRequestedEvent(BaseEvent):
    # Published when user creates a booking
    event_type: str = "seat.reserve_requested"
    booking_id: str
    ride_id: str
    user_id: str
    seats_requested: int
    pickup_location: Optional[str] = None
    dropoff_location: Optional[str] = None

class BookingConfirmedEvent(BaseEvent):
    # Published when booking is confirmed
    event_type: str = "booking.confirmed"
    booking_id: str
    user_id: str
    ride_id: str
    driver_id: Optional[str] = None
    seats_booked: int
    total_price: Optional[float] = None
    pickup_location: Optional[str] = None
    dropoff_location: Optional[str] = None

class BookingCancelledEvent(BaseEvent):
    # Published when booking is cancelled
    event_type: str = "booking.cancelled"
    booking_id: str
    user_id: str
    ride_id: str
    seats_to_release: int
    cancellation_reason: Optional[str] = None
    cancelled_by: str  

class BookingExpiredEvent(BaseEvent):
    # Published when booking expires (not confirmed in time)
    event_type: str = "booking.expired"
    booking_id: str
    user_id: str
    ride_id: str
    reason: str = "TIMEOUT"

# Events Consumed BY Booking Service
class SeatReservedEvent(BaseEvent):
    # Published by Ride Service when seats successfully reserved
    event_type: str = "seat.reserved"
    booking_id: str
    ride_id: str
    seats_reserved: int
    remaining_seats: int
    driver_id: Optional[str] = None

class SeatReservationFailedEvent(BaseEvent):
    # Published by Ride Service when reservation fails
    event_type: str = "seat.reservation_failed"
    booking_id: str
    ride_id: str
    reason: str  

class RideCancelledEvent(BaseEvent):
    # Published by Ride Service when driver cancels ride
    event_type: str = "ride.cancelled"
    ride_id: str
    driver_id: str
    cancellation_reason: str

class RideUpdatedEvent(BaseEvent):
    # Published by Ride Service when ride details change
    event_type: str = "ride.updated"
    ride_id: str
    changes: Dict[str, Any]