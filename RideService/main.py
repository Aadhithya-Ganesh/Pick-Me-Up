from fastapi import FastAPI
from database import init_db
from rides import router as ridesRouter

app = FastAPI()

init_db()

@app.get("/")
def hello():
    return {"message" : "hello from ride"}

app.include_router(ridesRouter)