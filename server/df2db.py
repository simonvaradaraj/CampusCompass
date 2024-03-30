# Imports
import pandas as pd
from pymongo import MongoClient
import os
from dotenv import load_dotenv, dotenv_values 

load_dotenv()

# data = pd.read_pickle(r"ml_assets\\newer_org_list.pkl")

# Connect to MongoDB
# client =  MongoClient(SECRET_STRING)
# db = client['orgradar']
# collection = db['organizations']
# data.reset_index(inplace=True)
# data_dict = data.to_dict("records")
# # Insert collection
# collection.insert_many(data_dict)