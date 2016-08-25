euclid.RegularPolygon = function(slate,A,B,Pval,nVal,d) {
  /*--------------------------------------------------------------------+
  | The regular polygon has n vertices in the plane P, with two, A and	|
  | B, being given. The variables cos and sin are the cosine and sine	|
  | of an internal angle.  Regular star polygons are given by the	|
  | second constructor with density d, that is, edges connect every	|
  | d-th vertex.							|
  +--------------------------------------------------------------------*/


/* Two constructors, all have slate parameter.
   First constructor: PointElements A,B; PlaneELement Pval; integer nVal (# of vertices)
   Second constructor: additional parameter 'd'
   In addition to the slate,n,V instance variables from PolygonElement, there 
   are instance variables cos, sin (of the internal angle), and P (the PlaneElement)
*/
 // Similar to super().  This establishes instance variables n,V, dimension (=2)
 euclid.PolygonElement.call(this,slate,nVal); 
 //this.dimension = 2;
 this.P = Pval;
 var theta;
 // This is where 'd' (if present) comes into play
 if (d == undefined) {
  // first constructor. regular polygon
  // in effect, d = 1.0
  theta = Math.PI * (this.n-2.0)/this.n;
 } else {
  // second constructor, regular star polygon
  theta = Math.PI * d*(this.n-2.0)/this.n;
 }
 this.cos = Math.cos(theta);
 this.sin = Math.sin(theta);
 this.V[0] = A; this.V[1] = B;
 var i;
 for (i=2; i<this.n; ++i) {
  this.V[i] = new euclid.PointElement(slate,this.P);
 }
 this.elementClassName = "RegularPolygon";
 this.parentClassName = "PolygonElement";
 
};
// RegularPolygon extends PolygonElement
euclid.RegularPolygon.prototype = Object.create(euclid.PolygonElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.RegularPolygon,
      writable: true
    }
  });
euclid.RegularPolygon.prototype.translate = function (dx,dy) {
 // dx,dy double
 var i;
 var n = this.n;
 var V = this.V;
 for (i=2; i<n; ++i){
   V[i].translate(dx,dy);
 }
};
euclid.RegularPolygon.prototype.rotate = function (pivot,c,s) {
 // pivot is a PointElement
 // c and s are numbers 
 var i;
 var n = this.n;
 var V = this.V;
 var P = this.P;
 for (i=2; i<n; ++i) {
   V[i].rotate(pivot,c,s,P);
 }
};
euclid.RegularPolygon.prototype.update = function () {
 var i;
 var n = this.n;
 var V = this.V;
 var P = this.P;
 var cos = this.cos; var sin = this.sin;
 for (i=2; i<n; ++i) {
  // the 'rotate' method here is defined in PointElement
   V[i].to(V[i-2]).rotate(V[i-1],cos,sin,P);
 }
};

/*
euclid.RegularPolygon.prototype. = function () {
};
*/