from fastapi  import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import timedelta

from app.db import get_db
from app import models
from app.schemas import UserCreate, UserLogin, UserResponse, Token
from app.security import verify_password,get_password_hash,create_access_token
from app.config import ACCESS_TOKEN_EXPIRE_MINUTES
from app.rabbitmq import publish_event

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

#Reg
@router.post("/register",response_model=UserResponse)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code = 400, detail="Email already registered")
    
    hashed_pw = get_password_hash(user_data.password)
    new_user = models.User(
        firstName = user_data.firstName,
        lastName = user_data.lastName,
        gender = user_data.gender,
        email = user_data.email,
        phone = user_data.phone,
        hashed_password = hashed_pw
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    publish_event("user.created", {
        "id": new_user.id,
        "firstName": new_user.firstName,
        "lastName": new_user.lastName,
        "email":new_user.email,
    })

    return new_user

#Login
@router.post("/login", response_model=Token)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == credentials.email).first()

    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(status_code=401, detail = "Invalid email or password")
    
    access_token = create_access_token(
        data={"id": user.id,
              "email": user.email},
              expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return{
        "access_token": access_token,
        "token_type": "bearer"
    }
