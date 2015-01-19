#!/usr/bin/python
import sys
import os
from lxml import etree

userPath = os.path.expanduser('~')

def main (argv):
    os.chdir(userPath)
    filePath = userPath + argv[1]
    #stands for  kml.  Because this is appended onto all of the tags
    sfkml = '{http://www.opengis.net/kml/2.2}'
    tree = etree.parse(filePath)
    root = tree.getroot()

    for element in root.iter(sfkml + 'coordinates'):
        elementString = element.text
        elementArray = elementString.split(',')
        lat = float(elementArray[0])
        lon = float(elementArray[1])
        print element.text
        # prototype contraints for the buoy layer
        # if lat >= -78.51665 and lat <= -78.25579:
        #     if lon >= 33.87697 and lon <= 33.92045:
        #         print element.text

if __name__ == "__main__":
    main(sys.argv)
