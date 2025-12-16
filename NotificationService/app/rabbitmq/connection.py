import asyncio
import aio_pika
from app.config import RABBITMQ_URL

connection = None
channel = None


async def connect_rabbitmq(max_retries: int = 20, delay_seconds: int = 3):
    """
    Try to connect to RabbitMQ with retries to avoid race-condition
    when RabbitMQ is still starting up.
    """
    global connection, channel

    for attempt in range(1, max_retries + 1):
        try:
            print(f"🔌 [RabbitMQ] Connecting (attempt {attempt}/{max_retries}) to {RABBITMQ_URL}")
            connection = await aio_pika.connect_robust(RABBITMQ_URL)
            channel = await connection.channel()
            print("✅ [RabbitMQ] Connected and channel opened")
            return channel
        except Exception as e:
            print(f"⚠️ [RabbitMQ] Not ready yet: {e}")
            if attempt == max_retries:
                print("❌ [RabbitMQ] Failed to connect after retries, giving up")
                raise
            await asyncio.sleep(delay_seconds)
