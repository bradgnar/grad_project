import csv
from pymongo import MongoClient, GEOSPHERE 
from datetime import datetime

client = MongoClient('localhost', 27017)
db = client.project_db
db.proto_sounds.drop()
db.proto_sounds.create_index([("loc", GEOSPHERE)])

def createSoundingObj(row):
	return {
		"loc": map(float,[row[1],row[0]]),
		"WLDepth_ft": float(row[2]),
		"StaticDraft": float(row[5]),
		"Vessel": row[6],
		"Date": row[3],
		"Time": row[4]
		}

with open('/home/bradgnar/grad_project2/data/DB5_Brad_Towson.csv', 'rb') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    for row in csvreader:
		obj = createSoundingObj(row)
		db.proto_sounds.insert(obj)
		# These are the headers for the csv file that matters
		# if u lose headers just re download the csv
    		# Latitude,Longitude,WLDepth_ft,Date,Time,StaticDraft,Vessel