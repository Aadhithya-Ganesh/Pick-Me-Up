from pydantic import BaseModel
from datetime import date
from datetime import time
from typing import Optional, List


# ---------------------------
# Pending Request Schemas
# ---------------------------

class PendingRequestBase(BaseModel):
    ride_id: int
    user_id: str
    seats: int
    booking_id: str
    pickup_location: str
    dropoff_location: str
    status: str = "pending"


class PendingRequestCreate(PendingRequestBase):
    pass


class PendingRequestResponse(PendingRequestBase):
    id: int

    class Config:
        orm_mode = True


# ---------------------------
# Ride Schemas
# ---------------------------

class RideBase(BaseModel):
    user_id: str
    origin: str
    destination: str
    date: date
    time: time
    duration: str
    seats: int
    price: float
    car_make: str
    car_color: str
    license_plate: str
    notes: Optional[str] = None
    instant_booking: bool = False


class RideCreate(RideBase):
    """Payload to create a ride."""
    pass


class RideUpdate(BaseModel):
    """Optional fields for PATCH/PUT requests."""
    origin: Optional[str] = None
    destination: Optional[str] = None
    date: Optional[date] = None
    time: Optional[time] = None
    duration: Optional[str] = None
    seats: Optional[int] = None
    price: Optional[float] = None
    car_make: Optional[str] = None
    car_color: Optional[str] = None
    license_plate: Optional[str] = None
    notes: Optional[str] = None
    instant_booking: Optional[bool] = None


class RideResponse(RideBase):
    """Ride response WITHOUT pending requests."""
    id: int
    pending_requests: List[PendingRequestResponse] = []
    class Config:
        orm_mode = True