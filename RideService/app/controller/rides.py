from typing import List
from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.schema import (
    RideCreate,
    RideResponse,
    RideUpdate,
)
from app.service.ride_service import RideService
from app.rabbitmq.event_service import EventService

router = APIRouter(prefix="/api/rides", tags=["rides"])

@router.post("/", response_model=RideResponse, status_code=201)
async def create_ride(ride: RideCreate, db: Session = Depends(get_db)):
    new_ride = RideService.create_ride(db, ride)

    await EventService.publish_ride_published(new_ride)

    return new_ride

@router.get("/rides", response_model=List[RideResponse])
def get_all_rides(user_id: str, db: Session = Depends(get_db)):
    return RideService.get_rides(db, user_id)

@router.get("/my-rides", response_model=List[RideResponse])
def get_all_rides_for_user(user_id: str, db: Session = Depends(get_db)):
    return RideService.get_rides_by_user(db, user_id)

@router.get("/{ride_id}", response_model=RideResponse)
def get_ride(ride_id: str, db: Session = Depends(get_db)):
    ride = RideService.get_ride(db, ride_id)
    if not ride:
        raise HTTPException(status_code=404, detail="Ride not found.")
    return ride

@router.put("/{ride_id}", response_model=RideResponse)
async def update_ride(ride_id: str, ride_update: RideUpdate, db: Session = Depends(get_db)):
    updated = RideService.update_ride(db, ride_id, ride_update)
    if not updated:
        raise HTTPException(status_code=404, detail="Ride not found.")

    return updated

@router.delete("/{ride_id}", status_code=204)
async def delete_ride(ride_id: str, db: Session = Depends(get_db)):
    ride = RideService.delete_ride(db, ride_id)
    if not ride:
        raise HTTPException(status_code=404, detail="Ride not found.")

    await EventService.publish_ride_cancelled(ride)

    return

@router.post("/requests/{request_id}/accept")
async def accept_request(request_id: str, db: Session = Depends(get_db)):
    pending_request = RideService.accept_request(db, request_id)
    if not pending_request:
        raise HTTPException(status_code=404, detail="Pending request not found.")

    await EventService.publish_seat_reserved(
        pending_request=pending_request
    )

    return {"message": "Request accepted", "request_id": request_id}


@router.post("/requests/{request_id}/reject")
async def reject_request(request_id: str, db: Session = Depends(get_db)):
    rejected_request = RideService.reject_request(db, request_id)
    if not rejected_request:
        raise HTTPException(status_code=404, detail="Pending request not found.")

    await EventService.publish_seat_reservation_failed(
        pending_request=rejected_request,
        reason="Driver rejected request"
    )

    return {"message": "Request rejected", "request_id": request_id}

