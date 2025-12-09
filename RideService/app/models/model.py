from sqlalchemy import Column, Integer, String, Float, Boolean, Date, Time, Text, ForeignKey
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

class Rides(Base):
    __tablename__ = "rides"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, nullable=False)

    origin = Column(String, nullable=False)
    destination = Column(String, nullable=False)

    date = Column(Date, nullable=False)
    time = Column(Time, nullable=False)

    duration = Column(String, nullable=False)
    seats = Column(Integer, nullable=False)

    price = Column(Float, nullable=False)

    car_make = Column(String, nullable=False)
    car_color = Column(String, nullable=False)
    license_plate = Column(String, nullable=False)

    notes = Column(Text)
    instant_booking = Column(Boolean, default=False)

    # 1 Ride → Many Pending Requests
    pending_requests = relationship("PendingRequest", back_populates="ride")


class PendingRequest(Base):
    __tablename__ = "pending_requests"

    id = Column(Integer, primary_key=True, index=True)

    ride_id = Column(Integer, ForeignKey("rides.id"), nullable=False)
    user_id = Column(Integer, nullable=False)
    seats = Column(Integer, nullable=False)

    booking_id = Column(Integer, nullable=False)

    pickup_location = Column(String, nullable=False)
    dropoff_location = Column(String, nullable=False)

    status = Column(String, default="pending")

    # Many PendingRequests → One Ride
    ride = relationship("Rides", back_populates="pending_requests")
