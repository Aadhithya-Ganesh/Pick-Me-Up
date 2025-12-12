from pydantic import BaseModel, EmailStr
from typing import Optional

# Base schema for shared fields
class UserBase(BaseModel):
    firstName: str
    lastName: str
    gender: str | None = None
    email: EmailStr
    phone: str | None = None

#for Registration
class UserCreate(UserBase):
    password: str

# Schema for Login
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Sending back user information
class UserResponse(UserBase):
    id: str
    # created_at: datetime

    class Config:
        from_attributes = True

# JWT access token response
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

# Internal token data (after decoding JWT)
class TokenData(BaseModel):
    id: Optional[str] = None
    email: Optional[EmailStr] = None