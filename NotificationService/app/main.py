from fastapi import FastAPI
from app.db import Base, engine
from app.routes.notifications import router
import asyncio
from app.rabbitmq.rabbitmq_listener import start_consumer
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Notification Service")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(router)

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(start_consumer())

@app.get("/health")
def health():
    return {"status": "notification-service OK"}