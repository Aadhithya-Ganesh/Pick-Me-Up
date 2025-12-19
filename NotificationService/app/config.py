import os

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres@database:5432/notifications"
)

RABBITMQ_URL = os.getenv("RABBITMQ_URL")