import redis
from app.config import settings
import logging

logger = logging.getLogger(__name__)

class RedisClient:
    """Redis client for distributed locking"""
    
    _instance = None
    _client = None
    _connection_attempted = False
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(RedisClient, cls).__new__(cls)
        return cls._instance
    
    def connect(self):
        """Initialize Redis connection - called lazily when needed"""
        if self._connection_attempted:
            return  
        
        self._connection_attempted = True
        
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
            
            self._client.ping()
            logger.info(f"Redis connected: {settings.REDIS_HOST}:{settings.REDIS_PORT}")
            
        except redis.ConnectionError as e:
            logger.warning(f"Redis connection failed: {e}")
            logger.warning(f"Distributed locking will be disabled")
            self._client = None
        except Exception as e:
            logger.warning(f"Unexpected Redis error: {e}")
            self._client = None
    
    def get_client(self):
        if self._client is None and not self._connection_attempted:
            self.connect()
        return self._client
    
    def ping(self):
        try:
            client = self.get_client()
            if client:
                return client.ping()
            return False
        except Exception as e:
            logger.error(f"Redis ping failed: {e}")
            return False
    
    def close(self):
        if self._client:
            self._client.close()
            logger.info("Redis connection closed")

redis_client = RedisClient()

def get_redis():
    return redis_client.get_client()

def test_redis_connection():
    try:
        client = get_redis()
        if client is None:
            logger.warning("Redis client not available")
            return False
        client.ping()
        logger.info("Redis connection test successful")
        return True
    except Exception as e:
        logger.warning(f"Redis connection test failed: {e}")
        return False

def get_redis_health():
    try:
        client = get_redis()
        if client is None:
            return {"status": "disconnected", "reason": "not initialized"}
        client.ping()
        return {"status": "connected", "host": settings.REDIS_HOST}
    except Exception as e:
        return {"status": "disconnected", "error": str(e)}