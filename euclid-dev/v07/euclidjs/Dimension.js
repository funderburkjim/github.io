// in euclid package
euclid.Dimension = function(w,h) {
 this.width=w;
 this.height=h;
};
euclid.Dimension.prototype.toString = function () {
 return "(" + this.width + "," + this.height + ")";
}