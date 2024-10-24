from mongoengine import connect
import os
from dotenv import load_dotenv

load_dotenv()

connect(
    host=os.getenv('DATABASE_URL'),  # Load the MongoDB URL from .env
    ssl=True
)


print("Connected to MongoDB!") 