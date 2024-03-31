from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
# import Levenshtein
# import itertools
import numpy as np
import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
cors = CORS(app)

SECRET_STRING = (os.getenv("MONGO_STRING"))

# similarity = pd.read_pickle(r"ml_assets\\similarity.pkl")
client = MongoClient(SECRET_STRING)
orgs = pd.DataFrame(list(client["orgradar"]["organizations"].find()))
orgs.drop(columns=['_id', 'index'], inplace=True)


# category_map = {
#     "academics" : ["Academic - Business", "Academic - Law", "Academic - Veterinary Medicine and Biomedical Sciences", "Academic - Honors", "Academic - Science", "Academic - Liberal Arts", "Academic - Education and Human Development", "Academic - Geosciences", "Academic - Architecture", "Academic - Government and Public Service", "Academic - Engineering", "Academic - Health Sciences", "Academic - Agriculture and Life Sciences"],
#     "fineArts" : ["Arts/ Entertainment"],
#     "greekLife" : ["Fraternity/Sorority Life"],
#     "leadership" : ["Leadership/Governance"],
#     "professional" : ["Professional/Career"],
#     "spiritual" : ["Religious/Spiritual"],
#     "cultural" : ["International/Multicultural"],
#     "service" : ["Politics/Advocacy", "Service"],
#     "social" : ["Social", "Recreation/Sports"],
#     "military" : ["Military"],
#     "residenceHalls" : ["Residence Halls"],
#     "specialInterest" : ["Special Interest"]
#   }

threshold_map = {
    "rec" : ["Recognized", "Texas A&M Department", "University Committee"],
    "pend": ["Recognized", "Renewing Recognition", "Pending Recognition", "Renewing Recognition", "Texas A&M Department", "University Committee"],
    "all" : ["Recognized", "Not Recognized", "Renewing Recognition", "Recognized with Restrictions", "Exempt from Recognition", "Pending Recognition", "Suspended"]
}

# CATEGORIES WILL BE ADDED BACK IN THE FUTURE
def filtered_subset(query, filters):
    cat_string, thresh = filters.split("&")
    # categories = [category_map[val] for val in cat_string.split("-")]
    # categories = list(itertools.chain(*categories))
    rec_statuses = threshold_map[thresh]

    # orgs_subset = orgs[orgs['filter'].isin(categories) & orgs['rec_status'].isin(rec_statuses)]
    orgs_subset = orgs[orgs['rec_status'].isin(rec_statuses)]
    if len(orgs_subset[orgs_subset['title'].str.contains(query, case=False) | orgs_subset['desc'].str.contains(query, case=False)]) != 0:
        return orgs_subset[orgs_subset['title'].str.contains(query, case=False) | orgs_subset['desc'].str.contains(query, case=False)]
    else:
        return orgs_subset
    
# FOR FUTURE ITERATIONS
def recommend(orgs_subset, startind):
    
    # index = orgs_subset[orgs_subset['title'] == org].index[0]
    # indexes_to_use = np.array(orgs_subset.index.tolist())
    # # distances = sorted(list(altered_similarity.loc[index]),reverse=True,key = lambda x: x)
    # distances = np.array(sorted(list(enumerate(similarity[index])),reverse=True,key = lambda x: x[1]))
    # recommended_orgs = pd.DataFrame(columns=orgs_subset.columns)

    # matching_indexes = np.in1d(distances[:, 0], indexes_to_use)
    # distances = distances[matching_indexes]



    recommended_orgs = pd.DataFrame(columns=orgs_subset.columns)

    if (len(orgs_subset) - startind) >= 10:
        return orgs_subset[startind:startind+10]
    else:
        return orgs_subset[startind:startind+(len(orgs_subset) - startind)]

def query_to_list(collection, query):
    results = collection.find(query)
    data = pd.DataFrame(list(results))
    if len(data) != 0:
        data.drop(columns=['_id'], inplace=True)
        
    # return jsonify(data)

    return data.to_json(orient="table")

@app.route("/api/search/<name>/<filters>/<offset>", methods=['GET'])
def search(name, filters, offset):
    subset = filtered_subset(name, filters)
    startind = int(offset)
    return recommend(subset, startind).to_json(orient="table")

@app.route("/api/numorgs/<query>/<filters>", methods=['GET'])
def numorgs(query, filters):
    subset = filtered_subset(query, filters)
    
    return jsonify (
        {
            "numorgs": len(subset.index.tolist())
        }
    )

@app.route("/api/getorg/<uni_id>/<org_id>", methods=['GET'])
def getorg(uni_id, org_id):

    mask = (orgs['uni_id'] == int(uni_id)) & (orgs['org_id'] == int(org_id))
    org = orgs[mask]
    
    return org.to_json(orient="table")

# work in progress
@app.route("/api/getratings/<uni_id>/<org_id>", methods=['GET'])
def getratings(uni_id, org_id):

    uni_id = int(uni_id)
    org_id = int(org_id)

    collection = client["orgradar"]["ratings"]
    query = {
        "uni_id": uni_id,
        "org_id": org_id
    }
    
    return query_to_list(collection, query)

@app.route("/api/createrating", methods=["POST"])
def createrating():
    data = request.get_json()

    client["orgradar"]["ratings"].insert_one(data)

    return "Successfully Added Data"

if __name__ == "__main__":
    app.run(debug=True, port=8080)