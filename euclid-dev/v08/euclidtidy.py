""" euclidtidy.py  
    July 23, 2016. Jim Funderburk
    Modifies a file 'in place', by default. If two run-time parameters provided,
    writes to the 2nd file.
    Assumes input file is in utf-8 encoding
    July 25. Use xml.etree.elementtree
    Aug 21, 2016.
"""
import sys,codecs
import re
import xml.etree.ElementTree as ET

if __name__ == "__main__":
 filein = sys.argv[1]
 if len(sys.argv) > 2:
  fileout = sys.argv[2]
 else:
  fileout = filein
 # slurp lines from filein
 print "\neuclidtidy.py begins..."
 print "parsing",filein
 tree = ET.parse(filein)
 root = tree.getroot()
 namespace="http://www.w3.org/1999/xhtml"
 def mypath(x):
  return "{%s}%s" %(namespace,x)
 ## 1. remove applet/img 
 for applet in tree.findall(".//" +mypath('applet')):
  print "found applet"
  for img in applet.findall(mypath('img')):
   print "removing applet/img:",ET.tostring(img)
   applet.remove(img)
  # --------------------- ---------------------
  # change name of applet to object
  # This seemed like a good idea, but in fact does not work
  # since the plugin type of p5js is unknown.
  #applet.tag = 'object'
  # add type attribute
  #applet.attrib['type'] = 'p5js'
  # --------------------- ---------------------
  # remove some of the 'applet-specific' attributes
  for name in ['archive','code','codebase']:
   del applet.attrib[name]
 ## 2. remove the 'javaEnabled' script
 # since xml.etree.ElementTree does not have the
 # ability to identify the parent of a node,
 # we search through all nodes that have a script child
 for elt in tree.findall(".//" +mypath('script') + '/..'):
  print elt.tag," has a script child"
  nfound=0
  for script in elt.findall('./' + mypath('script')):
   if script.text.find('navigator.javaEnabled') != -1:
    print "removing navigator in script with parent=",elt.tag
    nfound = nfound + 1
    #removing
    elt.remove(script)
    
 # insert our script tags at end of Head
 #head in tree.findall(".//" +mypath('applet')):
 head = tree.find(".//" +mypath('head'))
 for src in ["../../js/jquery-3.0.0.min.js","../../js/p5.js","../euclidbundle.js"]:
  # There is a subtle detail here.  Note the 'space' before the closing </script>.
  # Without it, the tree.write() method (see end of this module) uses the 
  # empty script shorthand of xml:  <script ... />  rather than <script ...></script>
  # This empty-script syntax is (at least in Chrome browser) not properly recognized
  # and the javascript is not loaded.
  # WITH the </script> tag, the javascript loads just fine.
  elt = ET.XML('<script language="javascript" type="text/javascript" src="%s"> </script>'%src)
  head.append(elt)

 """ This doesn't work very well
import xml.dom.minidom
def prettify(elem):
 rough_string = ET.tostring(elem, 'utf-8')
 reparsed = xml.dom.minidom.parseString(rough_string)
 return reparsed.toprettyxml(indent=" ")
 out = prettify(root)
 with codecs.open(fileout,"w","utf-8") as f:
  f.write(out)
 """
 print "writing ",fileout
 ET.register_namespace('',namespace)
 tree.write(fileout,encoding="utf-8",xml_declaration=True,method="xml")
 
 # In propI4.html, it was noticed that certain unacceptable coding was present.
 # ... proposition, that is, two triangles <i>ABC</i>and <i>DEF</i>are
 #  <i>congruent</i>if angles <i>A, B,</i>and <i>C</i>are equal to
 # there are missing spaces after </i> at several points, and this makes the output
 # hard to read. The following attempts to rectify this
 # read fileout, and do some additional prettyifying
 with codecs.open(fileout,"r","utf-8") as f:
  outlines = f.readlines()
 with codecs.open(fileout,"w","utf-8") as f:
  for line in outlines:
   line = line.rstrip()
   #line=re.sub(r'</','\n</',line)
   # Aug 21, 2016: Skip <?xml version='1.0' encoding='utf-8'?>
   if (line == "<?xml version='1.0' encoding='utf-8'?>"):
    continue
   # Aug 21, 2016: replace <html xmlns="http://www.w3.org/1999/xhtml"> with
   # Html5 doctype:
   if (line == r'<html xmlns="http://www.w3.org/1999/xhtml">'):
    line = r'<!DOCTYPE html>'
    f.write(line+'\n')
    # and insert <meta charset="UTF-8">
    f.write('<meta charset="UTF-8">\n')
    continue
   # Aug 21, 2016
   # <div id="header" />  => <div id="header">
   if line == r'<div id="header" />':
    line = '<div id="header"></div>'
    f.write(line+'\n')
    continue
   # Aug 21, 2016
   # <div id="footer" />  => <div id="footer">
   if line == r'<div id="footer" />':
    line = '<div id="footer"></div>'
    f.write(line+'\n')
    continue
   # Aug 21, 2016
   if filein.endswith('propI11.html'):
    line = line.replace('<i>FG&lt;/&gt;.</i>','<i>FG.</i>')
   # Aug 10, 2016
   line=re.sub(r'</i>([A-Za-z])',r'</i> \1',line)
   # similar issue in propI4.html with </a>
   line=re.sub(r'</a>([A-Za-z])',r'</a> \1',line)
   # For FireFox browser, the 'applet' tag has ugly display. Use 'object' instead.
   # This requires a change in loadXML.js
   line = line.replace('<applet','<object')
   line = line.replace('</applet>','</object>')
   f.write(line+'\n')
 print "euclidtidy.py is finished\n"
 
