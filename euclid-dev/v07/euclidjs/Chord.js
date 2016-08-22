euclid.Chord = function(slate,Dval,Eval,Cval) {
  /*--------------------------------------------------------------------+
  | This line AB is the segment of the line DE (extended) that		|
  | interects the circle C.  It is assumed that DE and C lie in the	|
  | same plane, namely that of C.					|
  +--------------------------------------------------------------------*/
  // instance variables C (CircleElement)
  // D,E PointElements 
  // A,B PointELements (in LineElement parent)
  euclid.LineElement.call(this,slate,null,null);
  this.dimension = 1;
  this.C = Cval;
  this.D = Dval;
  this.E = Eval;
  var Pval = Cval.AP;  // the ambient plane
  var dbg=false;
  this.A = new euclid.PointElement(slate,Pval);
  this.B = new euclid.PointElement(slate,Pval);
  this.elementClassName = "Chord";
  this.parentClassName = "LineElement";
};
// Chord extends LineElement
euclid.Chord.prototype = Object.create(euclid.LineElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.Chord,
      writable: true
    }
});
euclid.Chord.prototype.translate = function(dx,dy) {
 // dx, dy are double
 this.A.translate(dx,dy);
 this.B.translate(dx,dy);
};
euclid.Chord.prototype.rotate = function(pivot,ac,as) {
 // pivot is PointElement
 // ac, as are double
 this.A.rotate(pivot,ac,as);
 this.B.rotate(pivot,ac,as);
};
euclid.Chord.prototype.update = function() {
 // predefine local variables to instance variables.
 // This is so the translation from Java to JS is easier.
 var dbg=false;
 var A = this.A; 
 var B = this.B;
 var C = this.C;
 var D = this.D; 
 var E = this.E; 
 var F = this.F;
 B.to(C.Center).toLine(D,E,false);
 var d2 = C.Center.distance2(B);
 var r2 = C.radius2();
 if (d2 > r2) {
   A.x = A.y = A.z = B.x = B.y = B.z = 0.0/0.0; // NaN
   return;
 }
 var s = Math.sqrt(r2 - d2);
 var factor = s/D.distance(B);
 if (factor < 1e10)
   A.to(D).minus(B).times(factor).plus(B);
 else {
   factor = s/E.distance(B);
   A.to(E).minus(B).times(factor).plus(B);
 }
 B.times(2.0).minus(A);
};

