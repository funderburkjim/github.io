euclid.Layoff = function(slate,Aval,Cval,Dval,Eval,Fval) {
 // Lay off a line AB with endpoint A given, so that AB is parallel to CD
 // and equal to EF.  (this is B)

 // Cval is a CircleElement
 // xVal,yVal,zVal are double
 euclid.PointElement.call(this,slate); // 'B' == this point
 this.elementClassName = "Layoff";
 this.parentClassName = "PointElement";
 this.A = Aval;
 this.C = Cval;
 this.D = Dval;
 this.E = Eval;
 this.F = Fval;
 this.dimension = 0;
 if ((this.A.AP == this.C.AP) && (this.A.AP == this.D.AP)) {
  this.AP = this.A.AP;
 }
}
//Layoff extends PointElement
euclid.Layoff.prototype = Object.create(euclid.PointElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.Layoff,
      writable: true
    }
  });
euclid.Layoff.prototype.update = function () {
 var A = this.A; var C = this.C; var D = this.D;
 var E = this.E; var F = this.F;
 var factor = E.distance(F) / C.distance(D);
 this.to(D).minus(C);
 this.times(factor).plus(A);
};

/*
euclid.Layoff.prototype. = function () {
};
*/
