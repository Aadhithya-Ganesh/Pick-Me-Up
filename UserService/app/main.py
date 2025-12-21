#starter template
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db import Base, engine
from app.routes.users import router as user_router
from app.routes.auth import router as auth_router

app = FastAPI(title="Secure User Service")

Base.metadata.create_all(bind=engine)
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(user_router)
app.include_router(auth_router)

@app.get("/health")
def health():
    return {"status": "user-service OK"}
