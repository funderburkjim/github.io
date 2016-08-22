"""makep5html.py
   July 19, 2016
   Read Clark html file and create a p5.js version for it
   python makep5html.py bookI/post1.html ../clarkhtml 
   python makep5html.py  <infile> <indir>
   The output is written to current directory.
   Assume utf-8 encoding of input file
"""
import sys,re,codecs
class OUT(object):
 def __init__(self,line,n):
  self.line = line.rstrip('\r\n')
  self.n = n
  self.insertafter=[]

def make_p5_v1(lines):
 recs = []
 for line in lines:
  
if __name__ == "__main__":
 filein = sys.argv[1]
 dirin = sys.argv[2]
 pathin = "%s/%s" %(dirin,filein)
 pathout = filein # questionable
 # slurp lines of pathin
 with codecs.open(pathin,"r","utf-8") as f:
  lines = f.readlines()
 outlines = make_p5_v1(lines)
 with codecs.open(pathout,"w","utf-8") as f:
  for line in outlines:
   f.write(line + "\n")
