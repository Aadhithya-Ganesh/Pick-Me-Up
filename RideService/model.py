from sqlalchemy import Column, Integer, String, Float
from database import Base

class Rides(Base):
    __tablename__ = 'rides'

    rideid = Column(Integer, primary_key=True, index=True)
    driver_name = Column(String, index=True)
    passenger_name = Column(String, index=True)
    origin = Column(String)
    destination = Column(String)
    fare = Column(Float)
    departure_date = Column(String)
    departure_time = Column(String)
    estimated_duration = Column(Float)
    available_seats = Column(Integer)
    price_per_seat = Column(Float)