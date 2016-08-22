euclid.Bichord = function(slate,Cval,Dval) {
  /*--------------------------------------------------------------------+
  | This line AB connects the two points where the two circles C and D	|
  | meet. It is assumed that the two circles lie in the same plane, the	|
  | plane of C.								|
  +--------------------------------------------------------------------*/
  // instance variables C,D (CircleElements)
  // A,B PointElements 
  euclid.LineElement.call(this,slate,null,null);
  this.dimension = 1;
  this.C = Cval;
  this.D = Dval;
  var Pval = Cval.AP;  // the ambient plane
  var dbg=false;
  this.A = new euclid.PointElement(slate,Pval);
  this.B = new euclid.PointElement(slate,Pval);
  this.elementClassName = "Bichord";
  this.parentClassName = "LineElement";
  //console.log("Bichord constructor:A=",this.A,"\nB=",this.B);
};
// Bichord extends LineElement
euclid.Bichord.prototype = Object.create(euclid.LineElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.Bichord,
      writable: true
    }
});
euclid.Bichord.prototype.translate = function(dx,dy) {
 // dx, dy are double
 this.A.translate(dx,dy);
 this.B.translate(dx,dy);
};
euclid.Bichord.prototype.rotate = function(pivot,ac,as) {
 // pivot is PointElement
 // ac, as are double
 this.A.rotate(pivot,ac,as);
 this.B.rotate(pivot,ac,as);
};
euclid.Bichord.prototype.update = function() {
 // predefine local variables to instance variables.
 // This is so the translation from Java to JS is easier.
 var dbg=false;
 var A = this.A; 
 var B = this.B;
 var C = this.C;
 var D = this.D; 
 var F = this.F;
 var r = C.radius();
 var s = D.radius();
 var d = C.Center.distance(D.Center);
 if (d > r + s) {
  // Not sure, but I think 0.0/0.0 yields NaN in both Java and Javascript
  // Also the syntax 'a=b=c' is acceptable with same semantics in both languages.
   A.x = A.y = B.x = B.y = A.z = B.z = 0.0/0.0;
   return;
 }
 var costheta = (d*d + r*r - s*s) / (2.0 * d * r);
 var sintheta = Math.sqrt(1.0-costheta*costheta);
 A.to(D.Center).toCircle(C);
 B.to(A);
 A.rotate(C.Center,costheta,sintheta,C.AP);
 B.rotate(C.Center,costheta,-sintheta,C.AP);
};

