from pymongo import MongoClient
import os

url = os.getenv('MONGO_URI')

client = MongoClient(url)
database = client.ride_share
collection = database["rides"]
