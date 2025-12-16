# from datetime import timedelta
import os

DATABASE_URL = os.getenv("DATABASE_URL","sqlite:///./users.db")
if DATABASE_URL is None:
    raise ValueError("DATABASE_URL is missing. Check docker compose.")

# JWT / SECURITY
SECRET_KEY = "super-secret-key-change-this"  # change for real deployment
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60  # 1 hr
