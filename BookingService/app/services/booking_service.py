from sqlalchemy.orm import Session
from app.models.booking import Booking, BookingStatus
from app.models.schemas import BookingCreate
from datetime import datetime
from typing import Optional, List, Tuple
import uuid
import logging

logger = logging.getLogger(__name__)

class BookingService:
    
    def __init__(self, db: Session):
        self.db = db
    
    def generate_booking_id(self) -> str:
        return f"booking_{uuid.uuid4().hex[:12]}"
    
    def create_booking(
        self, 
        user_id: str, 
        booking_data: BookingCreate
    ) -> Booking:

        booking_id = self.generate_booking_id()

        booking = Booking(
            booking_id=booking_id,
            user_id=user_id,
            ride_id=booking_data.ride_id,
            seats_booked=booking_data.seats_requested,
            status=BookingStatus.PENDING,
            pickup_location=booking_data.pickup_location,
            dropoff_location=booking_data.dropoff_location,
            created_at=datetime.utcnow()
        )
        
        self.db.add(booking)
        self.db.commit()
        self.db.refresh(booking)
        
        logger.info(f"Booking created: {booking_id} for user {user_id}, ride {booking_data.ride_id}")
        return booking
    
    def get_booking(self, booking_id: str) -> Optional[Booking]:
        booking = self.db.query(Booking).filter(
            Booking.booking_id == booking_id
        ).first()
        
        if booking:
            logger.info(f"Retrieved booking: {booking_id}")
        else:
            logger.warning(f"Booking not found: {booking_id}")
        
        return booking
    
    def get_user_bookings(
        self, 
        user_id: str, 
        status: Optional[str] = None,
        limit: int = 10,
        offset: int = 0
    ) -> Tuple[List[Booking], int]:
    
        query = self.db.query(Booking).filter(Booking.user_id == user_id)
        
        if status:
            try:
                status_enum = BookingStatus(status)
                query = query.filter(Booking.status == status_enum)
            except ValueError:
                logger.warning(f" Invalid status filter: {status}")
        
        total = query.count()
        
        bookings = query.order_by(
            Booking.created_at.desc()
        ).limit(limit).offset(offset).all()
        
        logger.info(f"Retrieved {len(bookings)} bookings for user {user_id} (total: {total})")
        return bookings, total
    
    def update_booking_status(
        self, 
        booking_id: str, 
        new_status: BookingStatus
    ) -> Optional[Booking]:
        
        booking = self.get_booking(booking_id)
        
        if not booking:
            return None
        
        old_status = booking.status
        booking.status = new_status
        
        if new_status == BookingStatus.CONFIRMED:
            booking.confirmed_at = datetime.utcnow()
        elif new_status == BookingStatus.CANCELLED:
            booking.cancelled_at = datetime.utcnow()
        elif new_status == BookingStatus.COMPLETED:
            booking.completed_at = datetime.utcnow()
        
        self.db.commit()
        self.db.refresh(booking)
        
        logger.info(f"Booking {booking_id} status updated: {old_status} → {new_status}")
        return booking
    
    def cancel_booking(
        self, 
        booking_id: str, 
        cancellation_reason: Optional[str] = None
    ) -> Optional[Booking]:
        
        booking = self.get_booking(booking_id)
        
        if not booking:
            return None
        
        booking.status = BookingStatus.CANCELLED
        booking.cancelled_at = datetime.utcnow()
        booking.cancellation_reason = cancellation_reason
        
        self.db.commit()
        self.db.refresh(booking)
        
        logger.info(f"Booking {booking_id} cancelled. Reason: {cancellation_reason}")
        return booking
    
    def check_user_has_pending_booking(
        self, 
        user_id: str, 
        ride_id: str
    ) -> bool:
        
        existing = self.db.query(Booking).filter(
            Booking.user_id == user_id,
            Booking.ride_id == ride_id,
            Booking.status.in_([BookingStatus.PENDING, BookingStatus.CONFIRMED])
        ).first()
        
        if existing:
            logger.warning(f"User {user_id} already has booking for ride {ride_id}")
            return True
        
        return False
    
    def get_bookings_by_ride(
        self,
        ride_id: str,
        status: Optional[str] = None
    ) -> List[Booking]:
        
        query = self.db.query(Booking).filter(Booking.ride_id == ride_id)
        
        if status:
            try:
                status_enum = BookingStatus(status)
                query = query.filter(Booking.status == status_enum)
            except ValueError:
                logger.warning(f"Invalid status filter: {status}")
        
        bookings = query.all()
        logger.info(f"Retrieved {len(bookings)} bookings for ride {ride_id}")
        return bookings