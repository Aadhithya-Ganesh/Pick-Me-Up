from fastapi import FastAPI
from database import collection, database

app = FastAPI()

@app.get("/healthz")
def read_root():
    return {"message": "healthy"}

@app.get("/db")
def check_db_connection():
    return collection.find()