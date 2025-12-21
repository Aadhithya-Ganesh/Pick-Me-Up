from sqlalchemy import Column, String, Integer, DateTime, Enum, Text, DECIMAL
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import enum

Base = declarative_base()

class BookingStatus(str, enum.Enum):
    PENDING = "PENDING"
    CONFIRMED = "CONFIRMED"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"
    EXPIRED = "EXPIRED"

class Booking(Base):
    __tablename__ = "bookings"
    
    # Primary Key
    booking_id = Column(String(50), primary_key=True)
    
    # Foreign Keys 
    user_id = Column(String(50), nullable=False, index=True)
    ride_id = Column(String(50), nullable=False, index=True)
    
    # Booking Details
    seats_booked = Column(Integer, nullable=False)
    total_price = Column(DECIMAL(10, 2), nullable=True)
    
    # Status
    status = Column(Enum(BookingStatus), nullable=False, default=BookingStatus.PENDING, index=True)
    
    # Locations
    pickup_location = Column(Text, nullable=True)
    dropoff_location = Column(Text, nullable=True)
    
    # Ride Details
    price_per_seat = Column(DECIMAL(10, 2), nullable=True)
    duration = Column(String(50), nullable=True)
    departure_time = Column(String(20), nullable=True)
    ride_date = Column(String(20), nullable=True)

    # Vehicle Details
    car_make = Column(String(50), nullable=True)
    car_color = Column(String(50), nullable=True)
    license_plate = Column(String(50), nullable=True)
    driver_name = Column(String(100), nullable=True)

    # Origin/Destination 
    origin = Column(String(200), nullable=True)
    destination = Column(String(200), nullable=True)

    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    confirmed_at = Column(DateTime, nullable=True)
    cancelled_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    
    # Additional Info
    cancellation_reason = Column(Text, nullable=True)
    
    def __repr__(self):
        return f"<Booking {self.booking_id} - Status: {self.status}>"