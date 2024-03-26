from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import Levenshtein
import itertools
import numpy as np

app = Flask(__name__)
cors = CORS(app, origins='*')

similarity = pd.read_pickle(r"ml_assets\\similarity.pkl")
orgs = pd.read_pickle(r"ml_assets\\org_list.pkl")

category_map = {
    "academics" : ["Academic - Business", "Academic - Law", "Academic - Veterinary Medicine and Biomedical Sciences", "Academic - Honors", "Academic - Science", "Academic - Liberal Arts", "Academic - Education and Human Development", "Academic - Geosciences", "Academic - Architecture", "Academic - Government and Public Service", "Academic - Engineering", "Academic - Health Sciences", "Academic - Agriculture and Life Sciences"],
    "fineArts" : ["Arts/ Entertainment"],
    "greekLife" : ["Fraternity/Sorority Life"],
    "leadership" : ["Leadership/Governance"],
    "professional" : ["Professional/Career"],
    "spiritual" : ["Religious/Spiritual"],
    "cultural" : ["International/Multicultural"],
    "service" : ["Politics/Advocacy", "Service"],
    "social" : ["Social", "Recreation/Sports"],
    "military" : ["Military"],
    "residenceHalls" : ["Residence Halls"],
    "specialInterest" : ["Special Interest"]
  }

threshold_map = {
    "rec" : ["Recognized", "Exempt from Recognition"],
    "pend": ["Recognized", "Renewing Recognition", "Pending Recognition", "Exempt from Recognition", "Recognized with Suspension"],
    "all" : ["Recognized", "Not Recognized", "Renewing Recognition", "Recognized with Restrictions", "Exempt from Recognition", "Pending Recognition", "Recognized with Suspension"]
}

def filtered_subset(filters):
    cat_string, thresh = filters.split("&")
    categories = [category_map[val] for val in cat_string.split("-")]
    categories = list(itertools.chain(*categories))
    rec_statuses = threshold_map[thresh]

    orgs_subset = orgs[orgs['filter'].isin(categories) & orgs['rec_status'].isin(rec_statuses)]
    # orgs_subset = orgs[orgs['rec_status'].isin(rec_statuses)]
    return orgs_subset

def recommend(org, orgs_subset, startind):
    
    index = orgs_subset[orgs_subset['title'] == org].index[0]
    indexes_to_use = np.array(orgs_subset.index.tolist())
    # distances = sorted(list(altered_similarity.loc[index]),reverse=True,key = lambda x: x)
    distances = np.array(sorted(list(enumerate(similarity[index])),reverse=True,key = lambda x: x[1]))
    recommended_orgs = pd.DataFrame(columns=orgs_subset.columns)

    matching_indexes = np.in1d(distances[:, 0], indexes_to_use)
    distances = distances[matching_indexes]


    if (len(distances) - startind) >= 10:
        for i in distances[startind:startind+10]:
            recommended_orgs = pd.concat([recommended_orgs, orgs.iloc[[i[0]]]], ignore_index=True)
    else:
        for i in distances[startind:startind+(len(distances) - startind)]:
            recommended_orgs = pd.concat([recommended_orgs, orgs.iloc[[i[0]]]], ignore_index=True)
    return recommended_orgs

def closest_name(input_name, orgs_subset):
    closest = min(orgs_subset['title'].tolist(), key=lambda x: Levenshtein.distance(input_name.lower(), x.lower()))
    return closest

# @app.route("/api/search/", defaults={"name" : ""})
@app.route("/api/search/<name>/<filters>/<offset>", methods=['GET'])
def search(name, filters, offset):
    subset = filtered_subset(filters)
    orgname = closest_name(name, subset)
    startind = int(offset)
    # indexes_to_use = np.array(orgs_subset.index.tolist())
    return recommend(orgname, subset, startind).to_json(orient="table")

@app.route("/api/numorgs/<filters>", methods=['GET'])
def numorgs(filters):
    subset = filtered_subset(filters)
    
    return jsonify (
        {
            "numorgs": len(subset.index.tolist())
        }
    )

if __name__ == "__main__":
    app.run(debug=True, port=8080)