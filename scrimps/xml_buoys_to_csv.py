#!/usr/bin/python
import os
from lxml import etree

#stands for  kml.  Because this is appended onto all of the 
sfkml = '{http://www.opengis.net/kml/2.2}'
indir = '/home/bradgnar/grad_project/ogr_transform/condensed_bcn65.kml'
tree = etree.parse(indir)
root = tree.getroot()

for element in root.iter(sfkml + 'coordinates'):
    elementString = element.text
    elementArray = elementString.split(',')
    lat = float(elementArray[0])
    lon = float(elementArray[1])
    if lat >= -78.51665 and lat <= -78.25579:
        if lon >= 33.87697 and lon <= 33.92045:
            print element.text