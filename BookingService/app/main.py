from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.config import settings
from app.core.database import init_db, test_connection, get_db_health
from app.core.redis_client import test_redis_connection, get_redis_health
from app.core.rabbitmq import init_rabbitmq, close_rabbitmq, get_rabbitmq_health
from app.api.v1 import bookings
import logging
import asyncio
from app.workers.event_consumer import start_consumer  

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format=f'%(asctime)s - {settings.INSTANCE_ID} - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    
    # Test database connection
    logger.info("Testing database connection...")
    if test_connection():
        init_db()
        logger.info("Database initialization complete")
    else:
        logger.error("Failed to connect to database")
        raise Exception("Database connection failed")
    
    # Test Redis connection
    logger.info("Testing Redis connection...")
    if test_redis_connection():
        logger.info("Redis initialization complete")
    else:
        logger.warning("Redis connection failed - distributed locking disabled")
    
    # Initialize RabbitMQ
    logger.info("Initializing RabbitMQ connection...")
    try:
        await init_rabbitmq()
        logger.info("RabbitMQ initialization complete")
    except Exception as e:
        logger.error(f"RabbitMQ initialization failed: {e}")
        logger.warning("Continuing without RabbitMQ - async events disabled")
    
    # START EVENT CONSUMER 
    logger.info("Starting event consumer...")
    asyncio.create_task(start_consumer())
    logger.info("Event consumer task started")
    
    logger.info("Application startup complete")
    
    yield
    
    logger.info("Shutting down application...")
    await close_rabbitmq()

# Create FastAPI app with lifespan
app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    description="Booking Service for Carpooling Application",
    lifespan=lifespan
)

# Include routers
app.include_router(bookings.router)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "service": settings.APP_NAME,
        "instance": settings.INSTANCE_ID,
        "status": "running",
        "message": "Booking Service API",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint - used by load balancer"""
    db_health = get_db_health()
    redis_health = get_redis_health()
    rabbitmq_health = get_rabbitmq_health()
    
    # Overall health status
    is_healthy = (
        db_health["status"] == "connected" and 
        redis_health["status"] == "connected" and
        rabbitmq_health["status"] == "connected"
    )
    
    return {
        "status": "healthy" if is_healthy else "unhealthy",
        "service": settings.APP_NAME,
        "instance_id": settings.INSTANCE_ID,
        "checks": {
            "database": db_health["status"],
            "redis": redis_health["status"],
            "rabbitmq": rabbitmq_health["status"]
        }
    }

@app.get("/ready")
async def readiness_check():
    """Readiness check - is service ready to accept traffic"""
    db_health = get_db_health()
    redis_health = get_redis_health()
    rabbitmq_health = get_rabbitmq_health()
    
    is_ready = (
        db_health["status"] == "connected" and
        redis_health["status"] == "connected" and
        rabbitmq_health["status"] == "connected"
    )
    
    if is_ready:
        return {
            "status": "ready",
            "instance_id": settings.INSTANCE_ID
        }
    else:
        return {
            "status": "not_ready",
            "instance_id": settings.INSTANCE_ID,
            "reason": f"Database: {db_health['status']}, Redis: {redis_health['status']}, RabbitMQ: {rabbitmq_health['status']}"
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8080,
        reload=True
    )