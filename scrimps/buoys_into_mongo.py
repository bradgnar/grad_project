import csv
from pymongo import MongoClient, GEO2D 
from datetime import datetime

client = MongoClient('localhost', 27017)
db = client.project_db
db.clean_buoys.drop()
db.clean_buoys.create_index([("loc", GEO2D)])

def createSoundingObj(row, index):
	return {
		"loc": map(float,[row[0],row[1]]),
		"point_number": index
		}

with open('/home/bradgnar/grad_project/ogr_transform/bcnLattcoordinateList.csv', 'rb') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    index = 0
    for row in csvreader:
    	obj = createSoundingObj(row, index)
    	index = index + 1
    	db.clean_buoys.insert(obj)