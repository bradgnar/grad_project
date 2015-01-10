#!/usr/bin/python

import sys
import os
import csv
from pymongo import MongoClient, GEOSPHERE
from datetime import datetime

client = MongoClient('localhost', 27017)
db = client.icw
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



def main(argv):
	print 'argv1 is' + argv[1]
	print 'path is ' + os.path.expanduser('~'+argv[1])
	print 'file dir ' + os.path.dirname(os.path.realpath(__file__))
	print 'cwd dir ' + os.getcwd()
	os.chdir(os.path.expanduser('~'+argv[1]))
	print 'cwd dir ' + os.getcwd()

	# '/Users/bradleysmith/workspace/grad_project/data/DB_5_Brad_Towson.csv'
	# os.path.expanduser('~' + argv[1])
	# with open('/Users/bradleysmith/workspace/grad_project/data/DB_5_Brad_Towson.csv', 'rb') as csvfile:
	#     csvreader = csv.reader(csvfile, delimiter=',')
	#     for row in csvreader:
	# 		obj = createSoundingObj(row)
	# 		db.proto_sounds.insert(obj)

if __name__ == "__main__":
	main(sys.argv)