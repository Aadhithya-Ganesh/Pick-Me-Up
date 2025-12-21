import asyncio
import aio_pika
import logging
from app.config import RABBITMQ_URL

logger = logging.getLogger(__name__)

async def connect_rabbitmq(max_retries: int = 20, delay_seconds:int = 3):
    for attempt in range(1, max_retries + 1):
        try:
            logger.info(f"RabbitMQ Connecting...attempt {attempt}/{max_retries}) to {RABBITMQ_URL}")
            connection = await aio_pika.connect_robust(RABBITMQ_URL)
            channel = await connection.channel()
            logger.info("RabbitMQ connected and channel opened...")
            return channel
        
        except Exception as e:
            logger.warning(f"RabbitMQ not ready yet..... {e}")
            if attempt == max_retries:
                raise
            await asyncio.sleep(delay_seconds)
