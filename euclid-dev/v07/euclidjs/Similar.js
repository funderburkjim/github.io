euclid.Similar = function(slate,Aval,Bval,APval, Dval,Eval,Fval,Qval)  {
  /*--------------------------------------------------------------------+
  |  Construct a triangle ABthis in the ambient plane AP similar to the |
  |  triangle DEF in the plane Q.					|
  +--------------------------------------------------------------------*/

 euclid.PointElement.call(this,slate); // Similar to super()
 this.dimension=0;
 this.A = Aval;
 this.B = Bval;
 this.AP = APval;
 this.D = Dval;
 this.E = Eval;
 this.F = Fval;
 this.Q = Qval;
 this.elementClassName = "Similar";
 this.parentClassName = "PointElement";
};
// Similar extends PointElement
euclid.Similar.prototype = Object.create(euclid.PointElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.Similar,
      writable: true
    }
  });
euclid.Similar.prototype.update = function () {
 var A = this.A; 
 var B = this.B;
 var AP = this.AP;
 var D = this.D;
 var E = this.E;
 var F = this.F;
 var Q = this.Q;
 this.toSimilar(A,B,AP,D,E,F,Q);
};