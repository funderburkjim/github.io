euclid.Foot = function(slate,Aval,Bval,Cval)  {
/* Point that is foot of perpendicular from point A to line BC
*/
 euclid.PointElement.call(this,slate); // Similar to super()
 this.dimension=0;
 this.A = Aval;
 this.B = Bval;
 this.C = Cval;
 if (this.B.AP == this.C.AP) {
  this.AP = this.B.AP;
 }
 this.elementClassName = "Foot";
 this.parentClassName = "PointElement";
};
// Foot extends PointElement
euclid.Foot.prototype = Object.create(euclid.PointElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.Foot,
      writable: true
    }
  });
euclid.Foot.prototype.update = function () {
 this.to(this.A).toLine(this.B,this.C,false);
};