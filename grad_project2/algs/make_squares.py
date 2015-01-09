# The point of this script is to implement a sliding window
# function that will find a high density clustern 
from pymongo import MongoClient, GEOSPHERE 

client = MongoClient('localhost', 27017)
db = client.project_db
clean_buoys = db.clean_buoys
sounds = db.proto_sounds
LATITUDE_POINT_DIFFERENCE = 1 

# getLat - get the latitude of an item that is geo-indexed with 'loc'
# @param - {dict} - item - a dict with a geo-index 'loc'
# @returns - {Number} - latitude coordinate value
def getLat(item):
	return item['loc'][1]

# getLong - get the longitudinal value of an item geo-indexed with 'loc'
# @param - {dict} - item - a dict with a geo-index 'loc'
# @returns - {Number} - longitude coordinate value
def getLong(item):
	return item['loc'][0]	

buoyList = list(clean_buoys.find())
buoyListLen = len(buoyList)

# getWindowLongitudes - return longitudes based off of a longitude number
# @param - previousLongitude - This will be the highest density point
# from the previous window.
# @returns - A python list of 2 points, the first being the westernmost point
# and the second being the easternmost point
def getWindowLongitudes(previousLongitude):
	return [previousLongitude + LATITUDE_POINT_DIFFERENCE, previousLongitude - LATITUDE_POINT_DIFFERENCE]


# 1) Step 1 find min and max latitudes
firstBuoy = buoyList[0]
lastBuoy = buoyList[buoyListLen-1]
firstBuoyLat = getLat(firstBuoy)
lastBuoyLat = getLat(lastBuoy)



# for i in range(0, buoyListLen-2):
# 	min(buoyList[i]['loc'][1])


# The Steps
# 1) Find the first and last latitude... This is indexed at 1(not 0)
# 2) Use a dbscan or k means clustering? to find the highest density
# 3) make a sliding window function to create a bounds for the data
# the sliding window will move vertically and horizontally
# 	-the vertical difference will be a fixed amount with the floor
#  	of the previous window being the ceiling for the new one
# 	-the horizontal piece of the window will be a fixed amount greater 
# 	than and less than the previous windows center.  So it will not slide 
#  	a fixed amount
# 4) save the stats of the cluster to the database.  Index it by the loc 
#  	of the top left corner(all other corners can be figured out from that one)
