from fastapi import APIRouter, Depends, HTTPException, Header, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.schemas import (
    BookingCreate, 
    BookingCreateResponse, 
    BookingResponse,
    BookingListResponse,
    BookingCancel,
    ErrorResponse,
    BookingStatus
)
from app.services.booking_service import BookingService
from typing import Optional
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/bookings", tags=["bookings"])

@router.post("/", response_model=BookingCreateResponse, status_code=202)
async def create_booking(
    booking_data: BookingCreate,
    x_user_id: str = Header(..., alias="X-User-ID"),
    x_user_role: str = Header(..., alias="X-User-Role"),
    db: Session = Depends(get_db)
):
    """
    Create a new booking
    """
    logger.info(f"Creating booking for user {x_user_id}, ride {booking_data.ride_id}")
    
    booking_service = BookingService(db)
    
    # 1. Check if user already has pending/confirmed booking for this ride
    if booking_service.check_user_has_pending_booking(x_user_id, booking_data.ride_id):
        raise HTTPException(
            status_code=400,
            detail={
                "error_code": "DUPLICATE_BOOKING",
                "message": "You already have a booking for this ride"
            }
        )
    
    booking = booking_service.create_booking(x_user_id, booking_data)
    
    return BookingCreateResponse(
        success=True,
        booking_id=booking.booking_id,
        status=BookingStatus.PENDING,
        message="Your booking is being processed. You will receive confirmation shortly.",
        estimated_confirmation_time="30 seconds",
        created_at=booking.created_at
    )

@router.get("/{booking_id}/status")
async def get_booking_status(
    booking_id: str,
    x_user_id: str = Header(..., alias="X-User-ID"),
    db: Session = Depends(get_db)
):
    logger.info(f"Getting status for booking {booking_id}")
    
    booking_service = BookingService(db)
    booking = booking_service.get_booking(booking_id)
    
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    # authorization
    if booking.user_id != x_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to view this booking")
    
    return {
        "success": True,
        "booking_id": booking.booking_id,
        "status": booking.status,
        "created_at": booking.created_at,
        "confirmed_at": booking.confirmed_at,
        "ride_id": booking.ride_id,
        "seats_booked": booking.seats_booked
    }

@router.get("/{booking_id}", response_model=BookingResponse)
async def get_booking_details(
    booking_id: str,
    x_user_id: str = Header(..., alias="X-User-ID"),
    db: Session = Depends(get_db)
):
    """Get full booking details"""
    logger.info(f"📖 Getting details for booking {booking_id}")
    
    booking_service = BookingService(db)
    booking = booking_service.get_booking(booking_id)
    
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    # Check authorization
    if booking.user_id != x_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to view this booking")
    
    return booking

@router.get("/", response_model=BookingListResponse)
async def list_user_bookings(
    x_user_id: str = Header(..., alias="X-User-ID"),
    status: Optional[str] = Query(None, description="Filter by status"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=100, description="Results per page"),
    db: Session = Depends(get_db)
):
    """Get all bookings for current user"""
    logger.info(f"Listing bookings for user {x_user_id}")
    
    booking_service = BookingService(db)
    offset = (page - 1) * limit
    
    bookings, total = booking_service.get_user_bookings(
        user_id=x_user_id,
        status=status,
        limit=limit,
        offset=offset
    )
    
    return BookingListResponse(
        success=True,
        bookings=bookings,
        total=total,
        page=page,
        limit=limit
    )

@router.delete("/{booking_id}")
async def cancel_booking(
    booking_id: str,
    cancellation_data: Optional[BookingCancel] = None,
    x_user_id: str = Header(..., alias="X-User-ID"),
    db: Session = Depends(get_db)
):
    logger.info(f"Cancelling booking {booking_id}")
    
    booking_service = BookingService(db)
    booking = booking_service.get_booking(booking_id)
    
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    # authorization
    if booking.user_id != x_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to cancel this booking")
    
    if booking.status not in [BookingStatus.PENDING, BookingStatus.CONFIRMED]:
        raise HTTPException(
            status_code=400,
            detail=f"Cannot cancel booking with status {booking.status}"
        )

    cancellation_reason = None
    if cancellation_data:
        cancellation_reason = cancellation_data.cancellation_reason
    
    cancelled_booking = booking_service.cancel_booking(booking_id, cancellation_reason)

    return {
        "success": True,
        "booking_id": booking_id,
        "status": "CANCELLED",
        "message": "Booking cancelled successfully"
    }