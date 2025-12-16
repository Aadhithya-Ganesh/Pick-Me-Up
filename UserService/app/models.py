from sqlalchemy import Column, String, DateTime
# from sqlalchemy.sql import func
from datetime import datetime
from app.db import Base
import uuid

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    firstName = Column(String(50), nullable=False)
    lastName = Column(String(50), nullable=False)
    gender = Column(String(20),nullable = True)
    email = Column(String(120), unique=True, nullable = False)
    phone = Column(String(20), nullable=True)
    hashed_password = Column(String(255), nullable = False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)