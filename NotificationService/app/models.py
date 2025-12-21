from sqlalchemy import Column, String, Boolean, DateTime, Text
from app.db import Base
from sqlalchemy.sql import func
import uuid

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(String, primary_key = True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, index=True, nullable=False)
    type = Column(String, nullable = False)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    