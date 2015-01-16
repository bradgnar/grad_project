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
You are going to need to email survice engineering for a zip of the ENC data
files or a file that has broken them down into either KML or csv format
depending on your needs

run 'python csv2mongo.py /the/path/to/your/file'

####Putting in your csv/data
-------------------------------------------------------------------------------
The soundings that you have should be in a csv format with the following columns:
`longitude, latitude, WLDepth_ft, Date, Time, StaticDraft, Vessel`
In order to move that data into your db, you will need to run
`python csv2mongo.py /filepath/of/csv dbName collectionName`
This is a simple script and there are no checks to make sure that you have
entered the correct information, so be careful





