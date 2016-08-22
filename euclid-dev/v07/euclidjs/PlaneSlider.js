euclid.PlaneSlider = function(slate,Qval,xVal,yVal,zVal) {
 euclid.PointElement.call(this,slate,xVal,yVal,zVal); // Similar to super()
 this.initx = xVal; this.inity = yVal; this.initz = zVal; // for reset
 this.AP = Qval;
 this.elementClassName = "PlaneSlider";
 this.parentClassName = "PointElement";
 this.dimension = 0;
 this.dragable=true;
 // In Clark, this variable is defined outside of constructor and outside
 // of all methods. 
 this.newP = new euclid.PointElement(slate);
}
//PlaneSlider extends PointElement
euclid.PlaneSlider.prototype = Object.create(euclid.PointElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.PlaneSlider,
      writable: true
    }
  });
euclid.PlaneSlider.prototype.update = function() {
 this.toPlane(this.AP);
};
euclid.PlaneSlider.prototype.reset = function() {
 this.x = this.initx;
 this.y = this.inity;
 this.z = this.initz;
 this.toPlane(this.AP);
};
euclid.PlaneSlider.prototype.drag = function(tox,toy) {
 // tox,toy are double
 this.x = tox; 
 this.y = toy;
 if (!this.defined()) this.z = this.initz;
 this.newP.to(this).uptoPlane(this.AP);
 if (this.newP.defined())
   this.to(this.newP);
 else 
   this.toPlane(this.AP);
 return true;
};
