from pymongo import MongoClient, GEOSPHERE 

client = MongoClient('localhost', 27017)
db = client.project_db
db.buoy_sounds.drop()
db.buoy_sounds.create_index([("loc", GEOSPHERE)])

def createObj(data):
	return {
		'loc': data['loc'],
		'sounds': []
	}

for buoy in db.clean_buoys.find():
	buoySoundObj = createObj(buoy)
	for item in db.proto_sounds.find({ "loc" :{'$geoWithin' : { '$center': [[ buoy['loc'][0], buoy['loc'][1]], .007] }}}).limit(20):
		buoySoundObj['sounds'].append(item)
	db.buoy_sounds.insert(buoySoundObj)

