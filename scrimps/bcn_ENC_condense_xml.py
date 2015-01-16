import os
from lxml import etree
from io import StringIO, BytesIO
from pymongo import MongoClient, GEO2D
import re

#stands for  kml.  Because this is appended onto the beginning of all of th kml pieces
sfkml = '{http://www.opengis.net/kml/2.2}'
client = MongoClient('localhost', 27017)
db = client.project_db
db.drop_collection("points")
db.points.create_index([("loc", GEO2D)])
with open('condensed.txt', 'w') as f:
    print f

    #takes a string of lattitude and longitude, splits them into an array of strings, maps it into an array of float
    def splitCoordsMakeArray(coords):
    	return map(float, re.split(r',', coords))

    #finds all xml files, then finds all relevant points within the files and puts them into the db.
    indir = '/home/bradgnar/ENC_ROOT/all_xml_files'
    for root, dirs, filenames in os.walk(indir):
        for f in filenames:
            # print 'start ' + f
            tree = etree.parse(indir + "/" + f)
            root = tree.getroot()
            for element in root.iter(sfkml + 'SchemaData'):
                # print element
                schemaUrl = element.get('schemaUrl')
                if schemaUrl in ('#BCNLAT'):
                   print etree.tostring(element.getparent().getparent())