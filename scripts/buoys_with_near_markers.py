#!/usr/bin/python
import sys
import os
import csv
from pymongo import MongoClient, GEOSPHERE
from datetime import datetime

client = MongoClient('localhost', 27017)
db = client['icw']
soundingsCollection = db['proto_sounds']
buoyCollection = db['buoys']
db.depth_buoys.drop()
db.depth_buoys.create_index([("loc", GEOSPHERE)])
buoyWDepth = db['depth_buoys']
buoyCursor = buoyCollection.find({"loc": {"$within": {"$box": [[-78.51665,33.87697], [-78.25579,33.92045]]}}})
index = 0

def createMarkerObj (loc, index, avgDepth, count):
	return {
		"loc": loc,
		"point_number": index,
		"avg_depth": avgDepth,
		"number_of_soundings": count
		}

for buoy in buoyCursor:
	loc = buoy['loc']
	totalDepth = 0
	count = 0
	for sound in soundingsCollection.find({"loc": {"$near": {"$geometry": {"type": "Point", "coordinates": loc}, "$maxDistance": 50}}}).limit(200):
		totalDepth = totalDepth + float(sound['WLDepth_ft'])
		count = count + 1
	avgDepth = totalDepth / count
	markerObj = createMarkerObj(loc, index, avgDepth, count)
	buoyWDepth.insert(markerObj)
	index = index + 1