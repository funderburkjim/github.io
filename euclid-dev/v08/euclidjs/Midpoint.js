euclid.Midpoint = function(slate,Aval,Bval)  {
 // A and B are PointElements
 // Underlying coordinates of the Point involved (x,y,z) are computed by update
 // This initializes this point to the origin.
 euclid.PointElement.call(this,slate,0.0,0.0,0.0); // Similar to super()
 this.A = Aval; this.B = Bval;
 
 this.elementClassName = "Midpoint";
 this.parentClassName = "PointElement";
};
// Midpoint extends PointElement
euclid.Midpoint.prototype = Object.create(euclid.PointElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.Midpoint,
      writable: true
    }
  });
euclid.Midpoint.prototype.update = function () {
 this.x = (this.A.x + this.B.x) / 2.0;
 this.y = (this.A.y + this.B.y) / 2.0;
 this.z = (this.A.z + this.B.z) / 2.0;
};