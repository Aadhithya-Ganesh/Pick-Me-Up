import logging
from typing import Optional
from app.core.redis_client import get_redis
from app.config import settings

logger = logging.getLogger(__name__)

class LockService:
    """
    Distributed locking service using Redis
    Prevents race conditions in distributed systems
    """
    
    def __init__(self):
        self.redis_client = get_redis()
        self.lock_timeout = settings.LOCK_TIMEOUT  
    
    def acquire_lock(self, resource_id: str, lock_value: str) -> bool:

        lock_key = f"lock:ride:{resource_id}"
        
        try:
            result = self.redis_client.set(
                lock_key,
                lock_value,
                nx=True, 
                ex=self.lock_timeout 
            )
            
            if result:
                logger.info(f"Lock acquired: {lock_key} by {lock_value}")
            else:
                logger.warning(f"Lock already held: {lock_key}")
            
            return result
            
        except Exception as e:
            logger.error(f"Error acquiring lock for {resource_id}: {e}")
            return False
    
    def release_lock(self, resource_id: str, lock_value: str) -> bool:
        lock_key = f"lock:ride:{resource_id}"
        
        lua_script = """
        if redis.call("get", KEYS[1]) == ARGV[1] then
            return redis.call("del", KEYS[1])
        else
            return 0
        end
        """
        
        try:
            result = self.redis_client.eval(lua_script, 1, lock_key, lock_value)
            
            if result:
                logger.info(f"Lock released: {lock_key} by {lock_value}")
            else:
                logger.warning(f"Lock not owned or already released: {lock_key}")
            
            return bool(result)
            
        except Exception as e:
            logger.error(f"Error releasing lock for {resource_id}: {e}")
            return False
    
    def get_lock_value(self, instance_id: str) -> str:
        import time
        timestamp = int(time.time() * 1000) 
        return f"{instance_id}:{timestamp}"
    
    def is_locked(self, resource_id: str) -> bool:

        lock_key = f"lock:ride:{resource_id}"
        
        try:
            exists = self.redis_client.exists(lock_key)
            return bool(exists)
        except Exception as e:
            logger.error(f"Error checking lock status for {resource_id}: {e}")
            return False
    
    def get_lock_ttl(self, resource_id: str) -> Optional[int]:

        lock_key = f"lock:ride:{resource_id}"
        
        try:
            ttl = self.redis_client.ttl(lock_key)
            return ttl if ttl > 0 else None
        except Exception as e:
            logger.error(f"Error getting lock TTL for {resource_id}: {e}")
            return None
