euclid.LineSlider = function(slate,Aval,Bval,xVal,yVal,zVal,segVal) {
 // segval is Boolean. Aval,Bval are PointElement
 euclid.PointElement.call(this,slate,xVal,yVal,zVal); 
 this.initx = xVal; this.inity = yVal; this.initz = zVal; // for reset
 this.elementClassName = "LineSlider";
 this.parentClassName = "PointElement";
 this.A = Aval;
 this.B = Bval;
 this.segment = segVal;
 this.dimension = 0;
 this.dragable = true;
 if (this.A.AP == this.B.AP) {
  this.AP = this.A.AP;
 }
}
//LineSlider extends PointElement
euclid.LineSlider.prototype = Object.create(euclid.PointElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.LineSlider,
      writable: true
    }
  });
euclid.LineSlider.prototype.reset = function () {
 this.x = this.initx;
 this.y = this.inity;
 this.z = this.initz;
 this.toLine(this.A,this.B,this.segment);
};
euclid.LineSlider.prototype.update = function () {
 this.toLine(this.A,this.B,this.segment);
};
euclid.LineSlider.prototype.drag = function (tox,toy) {
 // first move (tox,toy) under the shadow of the line
 tox -= this.A.x; toy -= this.A.y;
 var dx = this.B.x - this.A.x,  dy = this.B.y - this.A.y;
 var factor = (tox*dx + toy*dy)/(dx*dx + dy*dy);
 if (this.segment) {
   if (factor < 0.0) factor = 0.0;
   else if (factor > 1.0) factor = 1.0;
 }
 tox = this.A.x + dx*factor;  
 toy = this.A.y + dy*factor;
 if ((tox-this.x)*(tox-this.x) + (tox-this.y)*(tox-this.y) < 0.5) return false;
 // now drag this point
 this.x = tox; 
 this.y = toy;
 this.z = this.A.z + (this.B.z-this.A.z)*factor;
 return true;
};
/*
euclid.LineSlider.prototype. = function () {
};
*/
