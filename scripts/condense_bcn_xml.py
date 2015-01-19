import os
import lxml
from lxml import etree
import re


#takes a string of lattitude and longitude, splits them into an array
#of strings, maps it into an array of float
def splitCoordsMakeArray(coords):
    return map(float, re.split(r',', coords))

def main (argv):
    userPath = os.path.expanduser('~')
    os.chdir(userPath)
    indir = userPath + argv[1]

    #finds all xml files, then finds all relevant points within the files
    #and puts them into the db.
    for root, dirs, filenames in os.walk(indir):
        for f in filenames:
            tree = etree.parse(indir + "/" + f)
            root = tree.getroot()
            for element in root.iter(sfkml + 'SchemaData'):
                schemaUrl = element.get('schemaUrl')
                if schemaUrl in ('#BCNLAT'):
                   print etree.tostring(element.getparent().getparent())

if __name__ == "__main__":
    main(sys.argv)