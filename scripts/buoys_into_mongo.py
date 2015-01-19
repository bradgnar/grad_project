import csv
from pymongo import MongoClient, GEO2D
from datetime import datetime

client = MongoClient('localhost', 27017)
userPath = os.path.expanduser('~')

def instantiateCollection (argv):
    db = client[argv[2]]
    collection = db[argv[3]].drop()
    collection.create_index([("loc", GEOSPHERE)])
    return collection

def createSoundingObj (row, index):
	return {
		"loc": map(float,[row[0],row[1]]),
		"point_number": index
		}

def readCsv2Mongo (filePath, collection):
    with open(filePath, 'rb') as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',')
        index = 0
        for row in csvreader:
            obj = createSoundingObj(row, index)
            index = index + 1
            collection.insert(obj)


def main (argv):
    os.chdir(userPath)
    filePath = userPath + argv[1]
    collection = instantiateCollection(argv)
    readCsv2Mongo(filePath, collection)

if __name__ == "__main__":
    main(sys.argv)