from fastapi import FastAPI
from app.config import settings
from app.core.database import init_db, test_connection, get_db_health
from app.api.v1 import bookings
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format=f'%(asctime)s - {settings.INSTANCE_ID} - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    description="Booking Service for Carpooling Application"
)

app.include_router(bookings.router)

@app.on_event("startup")
async def startup_event():
    """Run on application startup"""
    logger.info(f"Starting {settings.APP_NAME}")
    logger.info(f"Instance ID: {settings.INSTANCE_ID}")
    logger.info(f"Debug Mode: {settings.DEBUG}")
    
    # Test database connection
    logger.info("Testing database connection...")
    if test_connection():
        init_db()
        logger.info("Database initialization complete")
    else:
        logger.error("Failed to connect to database")
        raise Exception("Database connection failed")
    
    logger.info("=" * 60)
    logger.info("Application startup complete")
    logger.info("=" * 60)

@app.on_event("shutdown")
async def shutdown_event():
    """Run on application shutdown"""
    logger.info("Shutting down application...")

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
    
    is_healthy = db_health["status"] == "connected"
    
    return {
        "status": "healthy" if is_healthy else "unhealthy",
        "service": settings.APP_NAME,
        "instance_id": settings.INSTANCE_ID,
        "checks": {
            "database": db_health["status"]
        }
    }

@app.get("/ready")
async def readiness_check():
    """Readiness check - is service ready to accept traffic"""
    db_health = get_db_health()
    is_ready = db_health["status"] == "connected"
    
    if is_ready:
        return {
            "status": "ready",
            "instance_id": settings.INSTANCE_ID
        }
    else:
        return {
            "status": "not_ready",
            "instance_id": settings.INSTANCE_ID,
            "reason": "Database not connected"
        }
        
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8080,
        reload=True
    )