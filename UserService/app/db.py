# import os

# # Database connection details
# DB_USER = "postgres"
# DB_PASSWORD = "password"
# DB_HOST = "localhost"
# DB_NAME = "users_db"

# DATABASE_URL = f"postgresql://postgres:password@postgres:5432/users_db"


from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import DATABASE_URL


# engine = create_engine(
#     DATABASE_URL, 
#     pool_pre_ping=True)

#Sqllite
engine = create_engine(
    DATABASE_URL, 
    connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
