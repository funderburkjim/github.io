euclid.Application = function(slate,Pval,A,B,Cval) {
  /*
  // Apply a polygon P to get a parallelogram
  // with a side AB in an angle CAB
  A and B are PointElements
Instance variables P (PolygonElement) and C (PointElement)
*/
 // Similar to super().  This establishes instance variables n=4,V, dimension (=2)
 euclid.PolygonElement.call(this,slate,4); 
 this.P = Pval;
 this.C = Cval;
 this.V[0] = A;
 this.V[1] = B;
 this.V[2] = new euclid.PointElement(slate);
 this.V[3] = new euclid.PointElement(slate);
 if ((A.AP == B.AP) && (A.AP == Cval.AP)) {
  this.V[2].AP = A.AP;
  this.V[3].AP = A.AP;
 }
 this.elementClassName = "Application";
 this.parentClassName = "PolygonElement";
 
};
// Application extends PolygonElement
euclid.Application.prototype = Object.create(euclid.PolygonElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.Application,
      writable: true
    }
  });
euclid.Application.prototype.translate = function (dx,dy) {
 // dx,dy double
 this.V[2].translate(dx,dy);
 this.V[3].translate(dx,dy);

};
euclid.Application.prototype.rotate = function (pivot,ac,as) {
 // pivot is a PointElement
 // ac and as are numbers 
 this.V[2].rotate(pivot,ac,as);
 this.V[3].rotate(pivot,ac,as);

};
euclid.Application.prototype.update = function () {
 var n = this.n;
 var V = this.V;
 var P = this.P;
 var C = this.C;
 var tempQ = new euclid.PointElement(this.slate); // for computing area
 var factor = P.area()/(2.0*tempQ.area(V[0],V[1],C));
 factor = Math.abs(factor);
 V[3].x = V[0].x + factor*(C.x-V[0].x);
 V[3].y = V[0].y + factor*(C.y-V[0].y);
 V[3].z = V[0].z + factor*(C.z-V[0].z);
 V[2].x = V[1].x + V[3].x - V[0].x;
 V[2].y = V[1].y + V[3].y - V[0].y;
 V[2].z = V[1].z + V[3].z - V[0].z;
};

/*
euclid.Application.prototype. = function () {
};
*/