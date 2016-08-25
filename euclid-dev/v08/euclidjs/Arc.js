euclid.Arc = function(slate,Aval, Mval, Bval, Pval)  {
/*
 construct an AMB arc of a circle 
 M is instance variable, in addition to the instance variables 
 A,B,Center and P(plane) of SectorElement
*/
 euclid.SectorElement.call(this,slate); // Similar to super()
 this.Center = new euclid.PointElement(slate)
 this.A = Aval; 
 this.B = Bval; 
 this.P = Pval;
 this.M = Mval;
 this.dimension = 2;
 this.elementClassName = "Arc";
 this.parentClassName = "SectorElement";
};
// Arc extends SectorElement
euclid.Arc.prototype = Object.create(euclid.SectorElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.Arc,
      writable: true
    }
  });
euclid.Arc.prototype.update = function () {
 this.P.update();
 this.Center.toCircumcenter(this.A,this.M,this.B);
};
euclid.Arc.prototype.translate = function (dx,dy) {
 this.Center.translate(dx,dy);
};
euclid.Arc.prototype.rotate = function (pivot,ac,as) {
 this.Center.rotate(pivot,ac,as);
};

/*
euclid.Arc.prototype. = function () {
};
*/