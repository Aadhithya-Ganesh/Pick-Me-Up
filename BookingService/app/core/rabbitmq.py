import aio_pika
from aio_pika import connect_robust, ExchangeType
from aio_pika.abc import AbstractRobustConnection, AbstractChannel, AbstractExchange
from app.config import settings
import logging
from typing import Optional

logger = logging.getLogger(__name__)

class RabbitMQClient:
    """RabbitMQ client for publishing and consuming events"""
    
    def __init__(self):
        self.connection: Optional[AbstractRobustConnection] = None
        self.channel: Optional[AbstractChannel] = None
        self.booking_events_exchange: Optional[AbstractExchange] = None
        self.ride_events_exchange: Optional[AbstractExchange] = None
    
    async def connect(self):
        """Establish connection to RabbitMQ"""
        try:
            rabbitmq_url = (
                f"amqp://{settings.RABBITMQ_USER}:{settings.RABBITMQ_PASSWORD}"
                f"@{settings.RABBITMQ_HOST}:{settings.RABBITMQ_PORT}{settings.RABBITMQ_VHOST}"
            )
            
            self.connection = await connect_robust(rabbitmq_url)
            
            # Create channel
            self.channel = await self.connection.channel()
            
            await self.channel.set_qos(prefetch_count=10)
            
            self.booking_events_exchange = await self.channel.declare_exchange(
                name="booking_events",
                type=ExchangeType.TOPIC,
                durable=True  
            )
            
            self.ride_events_exchange = await self.channel.declare_exchange(
                name="ride_events",
                type=ExchangeType.TOPIC,
                durable=True
            )
            
            logger.info(f"RabbitMQ connected: {settings.RABBITMQ_HOST}:{settings.RABBITMQ_PORT}")
            
        except Exception as e:
            logger.error(f"RabbitMQ connection failed: {e}")
            raise
    
    async def disconnect(self):
        try:
            if self.connection:
                await self.connection.close()
                logger.info("RabbitMQ connection closed")
        except Exception as e:
            logger.error(f"Error closing RabbitMQ connection: {e}")
    
    async def publish_event(
        self, 
        exchange_name: str, 
        routing_key: str, 
        message: dict
    ):

        try:
            import json
            
            exchange = None
            if exchange_name == "booking_events":
                exchange = self.booking_events_exchange
            elif exchange_name == "ride_events":
                exchange = self.ride_events_exchange
            else:
                logger.error(f"Unknown exchange: {exchange_name}")
                return
            
            message_body = json.dumps(message).encode()
            
            rabbitmq_message = aio_pika.Message(
                body=message_body,
                content_type="application/json",
                delivery_mode=aio_pika.DeliveryMode.PERSISTENT 
            )
            
            # Publish message
            await exchange.publish(
                rabbitmq_message,
                routing_key=routing_key
            )
            
            logger.info(f"Event published: {routing_key} to {exchange_name}")
            
        except Exception as e:
            logger.error(f"Failed to publish event: {e}")
            raise

rabbitmq_client = RabbitMQClient()

async def get_rabbitmq():
    """Dependency function to get RabbitMQ client"""
    return rabbitmq_client

async def init_rabbitmq():
    """Initialize RabbitMQ connection"""
    await rabbitmq_client.connect()

async def close_rabbitmq():
    """Close RabbitMQ connection"""
    await rabbitmq_client.disconnect()

async def test_rabbitmq_connection():
    """Test RabbitMQ connection"""
    try:
        await rabbitmq_client.connect()
        logger.info("RabbitMQ connection test successful")
        return True
    except Exception as e:
        logger.error(f"RabbitMQ connection test failed: {e}")
        return False

def get_rabbitmq_health():
    """Get RabbitMQ health status"""
    if rabbitmq_client.connection and not rabbitmq_client.connection.is_closed:
        return {"status": "connected", "host": settings.RABBITMQ_HOST}
    else:
        return {"status": "disconnected"}