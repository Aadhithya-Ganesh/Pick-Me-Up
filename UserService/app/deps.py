from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.config import SECRET_KEY, ALGORITHM
from app.db import get_db
from app import models

oauth2_scheme = HTTPBearer()

def get_current_user(credentials = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str= payload.get("id")
        email: str = payload.get("email")

        if user_id is None or email is None:
            raise HTTPException(
                status_code = status.HTTP_401_UNAUTHORIZED,
                detail = "Invalid or Expired Token"
            )

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Authentication Credentials!!"
        )

    user = db.query(models.User).filter(models.User.id == user_id).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found!")
    
    if user.email != email:
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail = "Mismatch Email-Token"
        )

    return user