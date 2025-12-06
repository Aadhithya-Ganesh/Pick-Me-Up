from typing import Annotated, List
from fastapi import Depends, APIRouter, HTTPException
import requests
from sqlalchemy.orm import Session
from database import SessionLocal
from model import Rides
from schema import RideCreate, RideResponse, RideUpdate

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

router = APIRouter(prefix="/rides", tags=["rides"])

# create a new ride
@router.post("/", response_model=RideResponse, status_code=201)
def create_ride(ride: RideCreate, db: db_dependency):
    user_id = ride.user_id

    try:
        user = requests.get(f"http://UserService:5002/users/{user_id}")
        user.raise_for_status()
    except requests.RequestException:
        # raise HTTPException(status_code=400, detail="Invalid user_id: User does not exist.")
        user = "Noob"
    
    db_ride = Rides(**ride.dict())
    db.add(db_ride)
    db.commit()
    db.refresh(db_ride)
    return db_ride

# Display the rides of a specific user
@router.get("/", response_model=List[RideResponse], status_code=200)
def get_all_rides(user_id: int, db: db_dependency):
    return db.query(Rides).filter(Rides.user_id == user_id).all()

# Get a specific ride by its ID
@router.get("/{ride_id}", response_model=RideResponse, status_code=200)
def get_ride(ride_id: int, db: db_dependency):
    db_ride = db.query(Rides).filter(Rides.id == ride_id).first()
    if not db_ride:
        raise HTTPException(status_code=404, detail="Ride not found.")
    return db_ride

@router.put("/{ride_id}", response_model=RideResponse, status_code=200)
def update_ride(ride_id: int, ride_update: RideUpdate, db: db_dependency):
    db_ride = db.query(Rides).filter(Rides.id == ride_id).first()
    if not db_ride:
        raise HTTPException(status_code=404, detail="Ride not found.")

    for key, value in ride_update.dict(exclude_unset=True).items():
        setattr(db_ride, key, value)

    db.commit()
    db.refresh(db_ride)
    return db_ride

@router.delete("/{ride_id}", status_code=204)
def delete_ride(ride_id: int, db: db_dependency):
    db_ride = db.query(Rides).filter(Rides.id == ride_id).first()
    if not db_ride:
        raise HTTPException(status_code=404, detail="Ride not found.")

    db.delete(db_ride)
    db.commit()
    return