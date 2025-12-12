# from datetime import timedelta
import os

# DATABASE
# For dev: SQLite (file in the user-service folder)
# DATABASE_URL = os.getenv("DATABASE_URL")
# DB_USER = "postgres"
# DB_PASSWORD = "password"
# DB_HOST = "localhost"        # service name from docker-compose
# DB_NAME = "pickmeup"
DATABASE_URL = os.getenv("DATABASE_URL","sqlite:///./users.db")
# Later for Postgres (example):
# DATABASE_URL = "postgresql://user:password@db-host/db-name" or

# DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:5432/{DB_NAME}"

# JWT / SECURITY
SECRET_KEY = "super-secret-key-change-this"  # change for real deployment
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60  # 1 hour

# RABBITMQ
# RABBITMQ_HOST = "localhost"
# RABBITMQ_QUEUE = "user.events"
