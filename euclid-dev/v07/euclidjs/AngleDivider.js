euclid.AngleDivider = function(slate,Bval, Aval, Cval,APval,nVal)  { 
 /* n-sect angle BAC in the ambient plane AP .
  The ambient plane and coordinates of 'this' point are instance variables.
  The point coordinates are calculated via update method.
  The instance variables of AngleDivider and A,B,C and the number of variables.
  The ambient plane comes in via the constructor.
 */
 euclid.PointElement.call(this,slate); // Similar to super()
 this.B = Bval; this.A = Aval; this.C = Cval;
 this.AP = APval; this.n = nVal;
 this.dimension = 0;
 this.elementClassName = "AngleDivider";
 this.parentClassName = "PointElement";
};
// AngleDivider extends PointElement
euclid.AngleDivider.prototype = Object.create(euclid.PointElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.AngleDivider,
      writable: true
    }
  });
euclid.AngleDivider.prototype.update = function () {
 var A = this.A; var B = this.B; var C = this.C;
 var n = this.n; var AP = this.AP;
 var theta = A.angle(B,C,AP)/n;
 var cos = Math.cos(theta);
 var sin = Math.sin(theta);
 if (AP.isScreen) {
   this.x = A.x + cos*(B.x-A.x) - sin*(B.y-A.y);
   this.y = A.y + sin*(B.x-A.x) + cos*(B.y-A.y);
   this.z = 0.0;
 } else { // 3D case
   this.to(B).rotate(A,cos,sin,AP);
 }
 this.toIntersection(this,A,B,C,AP);
};