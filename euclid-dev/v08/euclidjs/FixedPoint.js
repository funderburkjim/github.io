euclid.FixedPoint = function(slate,xVal,yVal,zVal)  {
 euclid.PointElement.call(this,slate,xVal,yVal,zVal); // Similar to super()
 this.initx = xVal; this.inity = yVal; this.initz = zVal; // for reset
 this.elementClassName = "FixedPoint";
 this.parentClassName = "PointElement";
};
// FixedPoint extends PointElement
euclid.FixedPoint.prototype = Object.create(euclid.PointElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.FixedPoint,
      writable: true
    }
  });
euclid.FixedPoint.prototype.reset = function () {
 this.x = this.initx;
 this.y = this.inity;
 this.z = this.initz;
};