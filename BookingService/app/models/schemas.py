from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import datetime
from enum import Enum

class BookingStatus(str, Enum):
    PENDING = "PENDING"
    CONFIRMED = "CONFIRMED"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"
    EXPIRED = "EXPIRED"

# Request Schemas
class BookingCreate(BaseModel):
    """Schema for creating a new booking"""
    ride_id: str = Field(..., min_length=1, max_length=50, description="ID of the ride to book")
    seats_requested: int = Field(..., gt=0, le=10, description="Number of seats to book (1-10)")
    pickup_location: Optional[str] = Field(None, max_length=500, description="Pickup location")
    dropoff_location: Optional[str] = Field(None, max_length=500, description="Drop-off location")
    
    # Ride details
    price: Optional[float] = Field(None, description="Price per seat")
    duration: Optional[str] = Field(None, description="Ride duration")
    time: Optional[str] = Field(None, description="Departure time")
    date: Optional[str] = Field(None, description="Ride date")
    
    # Vehicle details
    car_make: Optional[str] = Field(None, description="Car make")
    car_color: Optional[str] = Field(None, description="Car color")
    license_plate: Optional[str] = Field(None, description="License plate")
    driver_name: Optional[str] = Field(None, description="Driver name")
    
    # Origin/Destination
    origin: Optional[str] = Field(None, description="Origin location")
    destination: Optional[str] = Field(None, description="Destination location")
    
    @field_validator('seats_requested')
    @classmethod
    def seats_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError('Seats requested must be greater than 0')
        if v > 10:
            raise ValueError('Cannot book more than 10 seats at once')
        return v


class BookingCancel(BaseModel):
    """Schema for cancelling a booking"""
    cancellation_reason: Optional[str] = Field(None, max_length=500, description="Reason for cancellation")

# Response Schemas 
class BookingResponse(BaseModel):
    """Schema for booking details response"""
    booking_id: str
    user_id: str
    ride_id: str
    seats_booked: int
    total_price: Optional[float] = None
    status: BookingStatus
    pickup_location: Optional[str] = None
    dropoff_location: Optional[str] = None
    created_at: datetime
    confirmed_at: Optional[datetime] = None
    cancelled_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    cancellation_reason: Optional[str] = None
    price_per_seat: Optional[float] = None
    duration: Optional[str] = None
    departure_time: Optional[str] = None
    ride_date: Optional[str] = None
    car_make: Optional[str] = None
    car_color: Optional[str] = None
    license_plate: Optional[str] = None
    driver_name: Optional[str] = None
    origin: Optional[str] = None
    destination: Optional[str] = None

    class Config:
        from_attributes = True  # Allows conversion from SQLAlchemy models

class BookingCreateResponse(BaseModel):
    """Schema for booking creation response"""
    success: bool
    booking_id: str
    status: BookingStatus
    message: str
    estimated_confirmation_time: str
    created_at: datetime

class BookingListResponse(BaseModel):
    """Schema for list of bookings"""
    success: bool
    bookings: list[BookingResponse]
    total: int
    page: int
    limit: int

class ErrorResponse(BaseModel):
    """Schema for error responses"""
    success: bool = False
    error_code: str
    message: str
