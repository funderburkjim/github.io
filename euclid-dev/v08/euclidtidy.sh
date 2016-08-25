FILE=$1
echo "BEGIN euclidtidy.sh for $FILE"
tidy --output-xhtml yes --numeric-entities yes --output-encoding utf8 -o $FILE ../clarkhtml/$FILE
#python euclidtidy.py $FILE
#tidy --output-xhtml yes --numeric-entities yes --output-encoding utf8 --markup yes -o $FILE ../clarkhtml/$FILE
#tidy --add-xml-decl yes --output-xhtml yes --numeric-entities yes --output-encoding utf8 -o $FILE ../clarkhtml/$FILE
#tidy --char-encoding utf8 --output-xhtml yes --numeric-entities yes --output-encoding utf8 -o $FILE ../clarkhtml/$FILE
echo "checking xmllint"
xmllint --noout $FILE
echo "end checking xmllint"
echo "Further adjustments by euclidtidy.py"
python euclidtidy.py $FILE
echo "END euclidtidy.sh for $FILE"
