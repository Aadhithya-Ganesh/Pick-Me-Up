from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
# from sqlalchemy.pool import StaticPool
from app.config import settings
from app.models.booking import Base
import logging

logger = logging.getLogger(__name__)

engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,       
    pool_size=10, 
    max_overflow=20,    
    echo=settings.DEBUG     
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """
    Initialize database
    """
    try:
        logger.info("Creating database tables...")
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully")
    except Exception as e:
        logger.error(f"Error creating database tables: {e}")
        raise

def test_connection():
    """
    Test database connection
    """
    try:
        db = SessionLocal()
        # Execute a simple query
        db.execute(text("SELECT 1"))
        db.close()
        logger.info("Database connection successful")
        return True
    except Exception as e:
        logger.error(f"Database connection failed: {e}")
        return False

def get_db_health():
    """
    Check database health for health endpoint
    """
    try:
        db = SessionLocal()
        db.execute(text("SELECT 1"))
        db.close()
        return {"status": "connected", "database": "booking_db"}
    except Exception as e:
        return {"status": "disconnected", "error": str(e)}