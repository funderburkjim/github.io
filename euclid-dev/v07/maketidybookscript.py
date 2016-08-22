"""maketidybookscript.py
   python maketidybookscript.py bookI html
   Reads all html filenames in clarkhtml/bookI directory
   Creates a script that read
"""
# Import the os module, for the os.walk function
import os,sys,codecs

def filter_files(directory,filter):
 # Set the directory you want to start from
 rootDir = directory
 ans=[]
 for dirName, subdirList, fileList in os.walk(rootDir):
  for fname in fileList:
   #print('\t%s' % fname)
   if fname.endswith(filter):
    ans.append(fname)
 return ans


if __name__ =="__main__":
 bookdir = sys.argv[1]
 filter = sys.argv[2]
 #fileout = sys.argv[3]
 fileout = "euclidtidy_%s.sh" % bookdir
 directory='../clarkhtml/' + bookdir
 htmlfiles = filter_files(directory,filter)
 print len(htmlfiles),filter,"files in",directory
 with codecs.open(fileout,"w","utf-8") as f:
  for fname in htmlfiles:
   out = "sh euclidtidy.sh %s/%s" %(bookdir,fname)
   f.write(out + "\n")
 print "constructed",fileout
