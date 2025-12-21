from pydantic import BaseModel
from typing import Optional
from uuid import UUID

# ---------------------------------------------------------
# seat.reserved  (Ride → Booking)
# ---------------------------------------------------------
class SeatReservedEvent(BaseModel):
    event_type: str = "seat.reserved"
    booking_id: str
    ride_id: UUID
    seats: int

# ---------------------------------------------------------
# seat.reservation_failed  (Ride → Booking)
# ---------------------------------------------------------
class SeatReservationFailedEvent(BaseModel):
    event_type: str = "seat.reservation_failed"
    booking_id: str
    ride_id: UUID
    reason: str

# ---------------------------------------------------------
# ride.cancelled  (Ride → Booking)
# ---------------------------------------------------------
class RideCancelledEvent(BaseModel):
    event_type: str = "ride.cancelled"
    ride_id: UUID

# ---------------------------------------------------------
# ride.published (Ride → Booking)
# ---------------------------------------------------------
class RidePublishedEvent(BaseModel):
    event_type: str = "ride.published"
    data: dict