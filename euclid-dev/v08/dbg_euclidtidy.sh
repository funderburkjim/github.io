FILE=$1
FILEIN=${FILE}_TEMP
FILEOUT=$FILE
echo "FILEIN = $FILEIN"
echo "FILEOUT = $FILEOUT"
tidy --output-xhtml yes --numeric-entities yes --output-encoding utf8 -o $FILEIN ../clarkhtml/$FILE
python euclidtidy.py $FILEIN $FILEOUT
#tidy --output-xhtml yes --numeric-entities yes --output-encoding utf8 --markup yes -o $FILE ../clarkhtml/$FILE
#tidy --add-xml-decl yes --output-xhtml yes --numeric-entities yes --output-encoding utf8 -o $FILE ../clarkhtml/$FILE
#tidy --char-encoding utf8 --output-xhtml yes --numeric-entities yes --output-encoding utf8 -o $FILE ../clarkhtml/$FILE
echo "checking xmllint $FILEIN"
xmllint --noout $FILEIN
echo "end checking xmllint $FILEIN"
echo "checking xmllint $FILEOUT"
xmllint --noout $FILEOUT
echo "end checking xmllint $FILEOUT"
