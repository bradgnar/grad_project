#!/usr/bin/python

import sys
import os
import csv
from pymongo import MongoClient, GEOSPHERE
from datetime import datetime

client = MongoClient('localhost', 27017)

def instantiateDb(argv):
	db = client[argv[2]]
	db[argv[3]].drop()
	db[argv[3]].create_index([("loc", GEOSPHERE)])
	return db

def createSoundingObj(row):
	return {
		"loc": map(float,[row[1],row[0]]),
		"WLDepth_ft": float(row[2]),
		"StaticDraft": float(row[5]),
		"Vessel": row[6],
		"Date": row[3],
		"Time": row[4]
		}

def main(argv):
	os.chdir(os.path.expanduser('~'))
	db = instantiateDb(argv)
	with open(os.path.expanduser('~' + argv[1]), 'rb') as csvfile:
	    csvreader = csv.reader(csvfile, delimiter=',')
	    for row in csvreader:
	    	obj = createSoundingObj(row)
	    	db[argv[3]].insert(obj)

if __name__ == "__main__":
	main(sys.argv)