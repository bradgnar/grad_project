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

####Get the data in there
You are going to need to email survice engineering for the data files.  Once you have them you will need to install [pymongo](http://api.mongodb.org/python/2.0.1/installation.html)

####Buoys
run 'python csv2mongo.py /the/path/to/your/file'

####Putting in your csv

`python csv2mongo.py filepath/of/csv`


