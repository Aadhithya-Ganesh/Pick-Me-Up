from fastapi import FastAPI
from database import init_db, get_db_health
from RideService.app.controller.rides import router as ridesRouter
import logging
from RideService.app.rabbitmq.rabbitmq import init_rabbitmq, get_rabbitmq_health

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format=f'%(asctime)s - RideService - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)

app = FastAPI()

init_db()
init_rabbitmq()

@app.get("/health")
async def health_check():
    """Health check endpoint - used by load balancer"""
    db_health = get_db_health()
    rabbitmq_health = get_rabbitmq_health()  
    
    # Overall health status
    is_healthy = (
        db_health["status"] == "connected" and 
        rabbitmq_health["status"] == "connected"  
    )
    
    return {
        "status": "healthy" if is_healthy else "unhealthy",
        "checks": {
            "database": db_health["status"],
            "rabbitmq": rabbitmq_health["status"]  
        }
    }

app.include_router(ridesRouter)