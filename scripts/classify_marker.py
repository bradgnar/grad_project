#!/usr/bin/python
import sys
import os
import csv
from pymongo import MongoClient, GEOSPHERE
from datetime import datetime
from bson.code import Code

client = MongoClient('localhost', 27017)
userPath = os.path.expanduser('~')
PROTO_SOUNDS = 'proto_sounds'

def instantiateCollection (argv):
    db = client[argv[2]]
    collection = db[argv[3]]
    collection.drop()
    collection.create_index([("loc", GEOSPHERE)])
    return collection

def createSoundingObj (row, index):
	return {
		"loc": map(float,[row[0],row[1]]),
		"point_number": index
		}

def readCsv2Mongo (filePath, collection):
    pointDic = {}
    with open(filePath, 'rb') as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',')
        index = 0
        totIndex = 0
        for row in csvreader:
            obj = createSoundingObj(row, index)
            if(tuple(obj.get("loc")) not in pointDic):
                pointDic[tuple(obj.get("loc"))] = obj.get("point_number")
                index = index + 1
                collection.insert(obj)

# def mapFunction ():
#     return Code("function () {"
#                 "  var key = this.WLDepth_ft;"
#                 "  var value = 1"
#                 "  emit(key, value)"
#                 "}")

# def reduceFunction (): 
#     return Code("function (key, values) {"
#                 "  var reducedObject = {"
#                 "  key: key,"
#                 "  count: 0,"
#                 "};"
#                 "")

# def finalizeFunction ():
#     return Code()



def querySoundings (argv, loc):
    db = client[argv[2]]
    collection = db[PROTO_SOUNDS]
    collection.map_reduce(mapFunction, reduceFunction, {query: })

def main (argv):
    print userPath
    os.chdir(userPath)
    filePath = userPath + argv[1]
    print filePath
    collection = instantiateCollection(argv)
    readCsv2Mongo(filePath, collection)

if __name__ == "__main__":
    main(sys.argv)