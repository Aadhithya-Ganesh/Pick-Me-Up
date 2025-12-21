from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from app.models import Notification
from app.schemas import NotificationResponse

router = APIRouter(prefix="/api/notifications", tags=["Notifications"])

@router.get("/{user_id}", response_model=list[NotificationResponse])
def get_notifications(user_id: str, db: Session = Depends(get_db)):
    return (
        db.query(Notification)
        .filter(Notification.user_id == user_id)
        .order_by(Notification.created_at.desc()).all()
    )

@router.get("/unread/{user_id}", response_model=list[NotificationResponse])
def get_unread(user_id: str, db: Session = Depends(get_db)):
    return (
        db.query(Notification)
        .filter(Notification.user_id == user_id,
                Notification.is_read.is_(False)
    ).order_by(Notification.created_at.desc())
    .all()
    )

@router.patch("/{notification_id}/read")
def mark_as_read(notification_id: str, db: Session = Depends(get_db)):
    notif = db.query(Notification).filter(Notification.id == notification_id).first()
    if notif:
        notif.is_read = True
        db.commit()
    return {"status": "ok"}
