"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
var euclid;
(function (euclid) {
    var StringTokenizer = (function () {
        function StringTokenizer(str0, regex0) {
            this.inext = 0;
            this.str = str0;
            this.regex = regex0;
            this.inext = 0;
            this.tokens = this.str.split(this.regex);
        }
        StringTokenizer.prototype.hasMoreTokens = function () {
            return (this.inext < this.tokens.length);
        };
        StringTokenizer.prototype.nextToken = function () {
            if (this.hasMoreTokens()) {
                var next = this.tokens[this.inext];
                this.inext = this.inext + 1;
                return next;
            }
            else {
                return "";
            }
        };
        return StringTokenizer;
    }());
    euclid.StringTokenizer = StringTokenizer;
})(euclid || (euclid = {}));
