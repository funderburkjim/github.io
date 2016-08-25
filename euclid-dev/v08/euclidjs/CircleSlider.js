euclid.CircleSlider = function(slate,Cval,xVal,yVal,zVal) {
 // Cval is a CircleElement
 // xVal,yVal,zVal are double
 euclid.PointElement.call(this,slate,xVal,yVal,zVal); 
 this.initx = xVal; this.inity = yVal; this.initz = zVal; // for reset
 this.elementClassName = "CircleSlider";
 this.parentClassName = "PointElement";
 this.C = Cval;
 this.dimension = 0;
 this.dragable = true;
 this.newP = new euclid.PointElement(slate);
}
//CircleSlider extends PointElement
euclid.CircleSlider.prototype = Object.create(euclid.PointElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.CircleSlider,
      writable: true
    }
  });
euclid.CircleSlider.prototype.reset = function () {
 this.x = this.initx;
 this.y = this.inity;
 this.z = this.initz;
 this.toCircle(this.C);
};
euclid.CircleSlider.prototype.update = function () {
 this.toCircle(this.C);
};
euclid.CircleSlider.prototype.drag = function (tox,toy) {
 this.x = tox; 
 this.y = toy;
 if (!this.defined()) {this.z = initz;}
 var newP = this.newP; var C = this.C;
 newP.to(this).uptoPlane(C.AP);
 if (!newP.defined()) {	// vertical plane
   newP.to(this).toPlane(C.AP);
 }
 newP.toSphere(C.Center,C.radius());
 if ((newP.x-this.x)*(newP.x-this.x) + (newP.y-this.y)*(newP.y-this.y) < 0.5){
   return false;
 }
 this.to(newP);
 return true;
};
/*
euclid.CircleSlider.prototype. = function () {
};
*/
