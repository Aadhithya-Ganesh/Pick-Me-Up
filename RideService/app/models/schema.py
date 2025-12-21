from pydantic import BaseModel
from datetime import date
from datetime import time
from typing import Optional, List
from uuid import UUID


# ---------------------------
# Pending Request Schemas
# ---------------------------

class PendingRequestBase(BaseModel):
    ride_id: UUID
    user_id: str
    seats: int
    booking_id: str
    pickup_location: str
    dropoff_location: str
    status: str = "PENDING"


class PendingRequestResponse(PendingRequestBase):
    id: UUID

    class Config:
        orm_mode = True


class PendingRequestCreate(PendingRequestBase):
    pass

# ---------------------------
# Ride Schemas
# ---------------------------

class RideBase(BaseModel):
    user_id: str
    driver_name: str
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


class RideResponse(RideBase):
    id: UUID
    pending_requests: List[PendingRequestResponse] = []

    class Config:
        orm_mode = True