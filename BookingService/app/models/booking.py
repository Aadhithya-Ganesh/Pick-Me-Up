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
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    confirmed_at = Column(DateTime, nullable=True)
    cancelled_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    
    # Additional Info
    cancellation_reason = Column(Text, nullable=True)
    
    def __repr__(self):
        return f"<Booking {self.booking_id} - Status: {self.status}>"