from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # App
    APP_NAME: str = "booking-service"
    INSTANCE_ID: str = "booking-1"
    DEBUG: bool = True
    
    # Database
    DATABASE_URL: str = "postgresql://booking_user:password@localhost:5432/booking_db"
    
    # Redis
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    REDIS_DB: int = 0
    
    # RabbitMQ
    RABBITMQ_HOST: str = "localhost"
    RABBITMQ_PORT: int = 5672
    RABBITMQ_USER: str = "guest"
    RABBITMQ_PASSWORD: str = "guest"
    
    # External Services
    RIDE_SERVICE_URL: str = "http://localhost:8001"
    USER_SERVICE_URL: str = "http://localhost:8002"
    
    # JWT
    JWT_SECRET_KEY: str = "your-secret-key-change-this"
    JWT_ALGORITHM: str = "HS256"
    
    # Business Logic
    LOCK_TIMEOUT: int = 10  # seconds
    BOOKING_EXPIRY_MINUTES: int = 5
    CANCELLATION_HOURS_BEFORE: int = 1
    
    class Config:
        env_file = ".env"

settings = Settings()