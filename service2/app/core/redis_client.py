import redis
from app.config import settings
import logging

logger = logging.getLogger(__name__)

class RedisClient:
    """Redis client singleton for distributed locking and caching"""
    
    _instance = None
    _client = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(RedisClient, cls).__new__(cls)
        return cls._instance
    
    def __init__(self):
        if self._client is None:
            self.connect()
    
    def connect(self):
        """Initialize Redis connection"""
        try:
            self._client = redis.Redis(
                host=settings.REDIS_HOST,
                port=settings.REDIS_PORT,
                db=settings.REDIS_DB,
                decode_responses=True,  
                socket_connect_timeout=5,
                socket_timeout=5,
                retry_on_timeout=True,
                health_check_interval=30
            )
            
            # Test connection
            self._client.ping()
            logger.info(f"Redis connected: {settings.REDIS_HOST}:{settings.REDIS_PORT}")
            
        except redis.ConnectionError as e:
            logger.error(f"Redis connection failed: {e}")
            self._client = None
            raise
        except Exception as e:
            logger.error(f"Unexpected Redis error: {e}")
            self._client = None
            raise
    
    def get_client(self):
        """Get Redis client instance"""
        if self._client is None:
            self.connect()
        return self._client
    
    def ping(self):
        """Test Redis connection"""
        try:
            return self._client.ping()
        except Exception as e:
            logger.error(f"Redis ping failed: {e}")
            return False
    
    def close(self):
        """Close Redis connection"""
        if self._client:
            self._client.close()
            logger.info("Redis connection closed")

# Global instance
redis_client = RedisClient()

def get_redis():
    """Dependency function to get Redis client"""
    return redis_client.get_client()

def test_redis_connection():
    """Test Redis connection"""
    try:
        client = get_redis()
        client.ping()
        logger.info("Redis connection test successful")
        return True
    except Exception as e:
        logger.error(f"Redis connection test failed: {e}")
        return False

def get_redis_health():
    """Get Redis health status for health endpoint"""
    try:
        client = get_redis()
        client.ping()
        return {"status": "connected", "host": settings.REDIS_HOST}
    except Exception as e:
        return {"status": "disconnected", "error": str(e)}