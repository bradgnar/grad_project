#Scripts
-------------------------------------------------------------------------------

This will be a step by step tutorial/guide for setting up the database for the
Atlantic ICW Magenta Line. Right now all of the scripts are in a pretty rough
version and as the scripts get better the tutorial [should] get better.

**First things first** it will be necessary to set up an instance of mongodb
[Mac OSX setup](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/ "mongoDB on Mac")
[Ubuntu setup](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/ "mongoDB on Ubuntu")
[Windows setup](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/ "mongoDB on Windows")

**Next** create a database - you can name it anything, but I made it with
`use icw_magenta` while running in the mongodb shell

###Script Time
-------------------------------------------------------------------------------
Now comes the fun time - running custom scripts

#Get the data in there
Before you do anything install [pymongo](http://api.mongodb.org/python/2.0.1/installation.html)

####Buoys - The ENC data files
You are going to need to email Survice Engineering for a zip if you want all of
the ENC data files. As it stands there is a condensed xml of BCNLAT markers,
which mark the AICW and can act as a layer for the Google Maps API.  Here is
the script that creates it from the ENC root of the xml files.

run `python ENC_condense_xml.py /theRoot/OfENCfiles > /the/destination/file.xml`

If you would like to get that data into mongodb for further processing it will
take two more steps. The first step will be to transform the kml into a csv
file.

run `python xml_buoys_to_csv.py /path/of/file > ~/the/destination/file.csv`

After that you will want to run another script which will move the csv into
mongo.  It is important to note that this will index the points via their
coordinates.


run `python buoys_into_mongo.py /the/path/to/your/file databaseName collectionName`


####Putting in your csv/data
-------------------------------------------------------------------------------
The soundings that you have should be in a csv format with the following columns:
`longitude, latitude, WLDepth_ft, Date, Time, StaticDraft, Vessel`
In order to move that data into your db, you will need to run
`python csv2mongo.py /filepath/of/csv dbName collectionName`
This is a simple script and there are no checks to make sure that you have
entered the correct information, so be careful





