import pika
import json
# from app.config import RABBITMQ_HOST
# from app.config import RABBITMQ_QUEUE
# RABBITMQ_HOST = "localhost"
# RABBITMQ_QUEUE = "user.events"

#------temp disabled RabbitMQ--------

def publish_event(event_name:str,data:dict):
    """Publish user--related event to this MQ"""
    print(f"[RabbitMQ DISABLED] EVENT → {event_name}: {data}")
    # #connect
    # connection = pika.BlockingConnection(
    #     pika.ConnectionParameters(host=RABBITMQ_HOST)
    # )
    # channel = connection.channel()

    # #ensure Que exists
    # channel.queue_declare(queue=RABBITMQ_QUEUE, durable=True)

    # #mesg create
    # payload={
    #     "event": event_name,
    #     "data":data
    # }

    # #publish
    # channel.basic_publish(
    #     exchange="",
    #     routing_key=RABBITMQ_QUEUE,
    #     body=json.dumps(payload),
    #     properties=pika.BasicProperties(
    #         delivery_mode=2
    #     )
    # )

    # print("Event Published!!!!", payload)
    # connection.close()