from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os

app = Flask (__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'airportLA'
COLLECTION_NAME = 'airport'


@app.route ("/")
def index():
    """
    A Flask view to serve the main dashboard page.
    """
    return render_template ("index.html")


@app.route ("/airportLA/airport")
def airport():
    """
    A Flask view to serve the project data from
    MongoDB in JSON format.
    """

    # A constant that defines the record fields that we wish to retrieve.
    FIELDS = {
        '_id': False, 'ReportPeriod': True, 'Terminal': True,
        'Arrival_Departure': True, 'Domestic_International': True, 'Passenger_Count': True,
    }

    # Open a connection to MongoDB using a with statement such that the
    # connection will be closed as soon as we exit the with statement
    # The MONGO_URI connection is required when hosted using a remote mongo db.
    with MongoClient () as conn:
        # Define which collection we wish to access
        collection = conn[DBS_NAME][COLLECTION_NAME]
        # Retrieve a result set only with the fields defined in FIELDS
        # and limit the the results to a lower limit of 20000
        projects = collection.find (projection=FIELDS, limit=20000)
        # Convert projects to a list in a JSON object and return the JSON data
        return json.dumps (list (projects))


if __name__ == "__main__":
    app.run(debug=True)