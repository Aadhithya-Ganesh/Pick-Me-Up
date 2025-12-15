from fastapi  import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db import get_db
from app.deps import get_current_user
from app import models
from app.schemas import UserResponse,UserUpdate
from app.rabbitmq import publish_event

router = APIRouter(prefix="/api/users", tags=["Users"])

# GET current logged-in user
@router.get("/me",response_model=UserResponse)
def get_current(current_user: models.User = Depends(get_current_user)):
    return current_user

# Internal endpoint for booking & ride service
@router.get("/internal/{user_id}", response_model=UserResponse)
def get_user_internal(user_id: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
 
@router.put("/me", response_model=UserResponse)
def update_user(
    user_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    update_dict = user_data.dict(exclude_unset=True)

    for field, value in update_dict.items():
        setattr(current_user, field, value)

    db.commit()
    db.refresh(current_user)

    publish_event("user.updated", {
        "id": current_user.id,
        "email": current_user.email
    })

    return current_user

@router.delete("/delete")
def delete_user(db: Session = Depends(get_db),
                current_user: models.User = Depends(get_current_user)
                ):
    if not current_user:
        raise HTTPException(status_code=404, detail="User Not Found!!")
    
    db.delete(current_user)
    db.commit()

    publish_event("user.deleted", {"id": current_user.id})

    return{"payload": "User Deleted!!!"}