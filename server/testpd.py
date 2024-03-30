import os
from pymongo import MongoClient
from dotenv import load_dotenv
import pandas as pd

load_dotenv()

SECRET_STRING = (os.getenv("MONGO_STRING"))
client = MongoClient(SECRET_STRING)

orgs = pd.DataFrame(list(client["orgradar"]["organizations"].find()))
orgs.drop(columns=['_id', 'index'], inplace=True)
print(orgs.shape)