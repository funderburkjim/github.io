euclid.Intersection = function(slate,Aval,Bval,Cval,Dval,APval)  {
 // this point is the intersection of lines AB and CD in the ambient plane AP
 // Underlying coordinates of the Point involved (x,y,z) are computed by update
 // This initializes this point to the origin.
 euclid.PointElement.call(this,slate,0.0,0.0,0.0); // Similar to super()
 this.A = Aval; this.B = Bval;
 this.C = Cval; this.D = Dval;
 this.AP = APval;
 this.elementClassName = "Intersection";
 this.parentClassName = "PointElement";
};
// Intersection extends PointElement
euclid.Intersection.prototype = Object.create(euclid.PointElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.Intersection,
      writable: true
    }
  });
euclid.Intersection.prototype.update = function () {
 this.toIntersection(this.A,this.B,this.C,this.D,this.AP);
};