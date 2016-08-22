euclid.Circumcircle = function(slate,B,C,D,AP) {
  /*--------------------------------------------------------------------+
  | This is the circle passing through the three points B, C, and D.	|
  | It is assumed that all three points lie in the plane AP.		|
  +--------------------------------------------------------------------*/

 euclid.CircleElement.call(this,slate); // Similar to super()
 this.dimension = 2;
 this.B=B;
 this.C=C;
 this.D=D;
 this.AP = AP; // PlaneElement
 this.Center = new euclid.PointElement(slate,AP);
 this.A = this.Center;

 this.elementClassName = "Circumcircle";
 this.parentClassName = "CircleElement";
};
// Circumcircle extends CircleElement
euclid.Circumcircle.prototype = Object.create(euclid.CircleElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.Circumcircle,
      writable: true
    }
  });


euclid.Circumcircle.prototype.update = function () {
 this.Center.toCircumcenter(this.B,this.C,this.D);
};
euclid.Circumcircle.prototype.translate = function (dx,dy) {
 this.Center.translate(dx,dy)
};
euclid.Circumcircle.prototype.rotate = function (pivot,c,s) {
 // pivot is PointElement; c and s are double (cos and sin of some angle)
 this.Center.rotate(pivot,c,s);
};

/*
euclid.Circumcircle.prototype. = function () {
};
*/