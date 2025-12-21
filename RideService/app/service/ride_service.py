from sqlalchemy.orm import Session
from fastapi import HTTPException
from typing import Optional, List

from app.models.model import Rides, PendingRequest
from app.models.schema import RideCreate, RideUpdate
from datetime import datetime

class RideService:
    @staticmethod
    def create_ride(db: Session, ride_data: RideCreate) -> Rides:
        new_ride = Rides(**ride_data.dict())
        db.add(new_ride)
        db.commit()
        db.refresh(new_ride)
        return new_ride

    @staticmethod
    def get_rides(db: Session, user_id: str) -> List[Rides]:
        return (
            db.query(Rides)
            .filter(Rides.user_id != user_id and Rides.seats > 0)
            .all()
        )
    
    @staticmethod
    def get_rides_by_user(db: Session, user_id: str) -> List[Rides]:
        return (
            db.query(Rides)
            .filter(Rides.user_id == user_id)
            .all()
        )

    @staticmethod
    def get_ride(db: Session, ride_id: str) -> Optional[Rides]:
        return db.query(Rides).filter(Rides.id == ride_id).first()

    @staticmethod
    def update_ride(db: Session, ride_id: str, ride_update: RideUpdate) -> Optional[Rides]:
        ride = db.query(Rides).filter(Rides.id == ride_id).first()
        if not ride:
            return None

        for key, value in ride_update.dict(exclude_unset=True).items():
            setattr(ride, key, value)

        db.commit()
        db.refresh(ride)
        return ride

    @staticmethod
    def delete_ride(db: Session, ride_id: str) -> Optional[Rides]:
        ride = db.query(Rides).filter(Rides.id == ride_id).first()
        if not ride:
            return None

        db.delete(ride)
        db.commit()
        return ride

    @staticmethod
    def accept_request(db: Session, request_id: str) -> Optional[PendingRequest]:
        request = (
            db.query(PendingRequest)
            .filter(
                PendingRequest.id == request_id,
                PendingRequest.status == "PENDING"
            )
            .first()
        )

        print(request)

        if not request:
            return None

        ride = db.query(Rides).filter(Rides.id == request.ride_id).first()
        if not ride:
            raise HTTPException(status_code=404, detail="Ride not found")

        # Check seats
        if ride.seats < request.seats:
            raise HTTPException(status_code=400, detail="Not enough seats available")

        # Deduct seats
        ride.seats -= request.seats

        request.status = "ACCEPTED"

        db.commit()
        db.refresh(request)
        db.refresh(ride)

        return request

    @staticmethod
    def reject_request(db: Session, request_id: str) -> Optional[PendingRequest]:
        request = (
            db.query(PendingRequest)
            .filter(
                PendingRequest.id == request_id,
                PendingRequest.status == "PENDING"
            )
            .first()
        )

        if not request:
            return None

        request.status = "REJECTED"
        db.commit()
        db.refresh(request)

        return request
    
    @staticmethod
    def create_pending_request(
        db: Session,
        *,
        ride_id: str,
        booking_id: str,
        user_id: str,
        seats_requested: int,
        pickup_location: str,
        dropoff_location: str
    ) -> PendingRequest:

        ride = db.query(Rides).filter(Rides.id == ride_id).first()
        if not ride:
            raise HTTPException(404, "Ride not found")

        pending = PendingRequest(
            ride_id=ride_id,
            booking_id=booking_id,
            user_id=user_id,
            seats=seats_requested,
            pickup_location=pickup_location,
            dropoff_location=dropoff_location,
            status="PENDING",
        )

        db.add(pending)
        db.commit()
        db.refresh(pending)
        return pending
    
    @staticmethod
    def clear_pending_request(db: Session, booking_id: str) -> int:
        pending_rows = (
            db.query(PendingRequest)
            .filter(PendingRequest.booking_id == booking_id)
            .all()
        )

        count = len(pending_rows)

        for row in pending_rows:
            db.delete(row)

        db.commit()
        return count
    
    def free_seat_after_cancellation(
        db: Session,
        *,
        ride_id: str,
        seats_to_release: int,
        cancellation_reason: str
    ) -> Optional[Rides]:

        ride = db.query(Rides).filter(Rides.id == ride_id).first()
        if not ride:
            return None

        # Increase seats back
        ride.seats += seats_to_release

        db.commit()
        db.refresh(ride)
        return ride
