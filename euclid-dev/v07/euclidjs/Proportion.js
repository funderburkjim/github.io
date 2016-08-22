euclid.Proportion = function(slate,S0,S1,T0,T1,U0,U1,V0,V1)  {
/*
  // Given lines S,T,U,V, cut off from V a fourth proportional V' so that
  // S:T=U:V'
*/
 euclid.PointElement.call(this,slate); // Similar to super()
 this.S0=S0;
 this.S1=S1;
 this.T0=T0;
 this.T1=T1;
 this.U0=U0;
 this.U1=U1;
 this.V0=V0;
 this.V1=V1;
 if (V0.AP == V1.AP) {
  this.AP = V0.AP;
 }
 this.elementClassName = "Proportion";
 this.parentClassName = "PointElement";
};
// Proportion extends PointElement
euclid.Proportion.prototype = Object.create(euclid.PointElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.Proportion,
      writable: true
    }
  });
euclid.Proportion.prototype.update = function () {
 var S0=this.S0;
 var S1=this.S1;
 var T0=this.T0;
 var T1=this.T1;
 var U0=this.U0;
 var U1=this.U1;
 var V0=this.V0;
 var V1=this.V1;
 var factor = T0.distance2(T1) * U0.distance2(U1) / (S0.distance2(S1) * V0.distance2(V1));
 factor = Math.sqrt(factor);
 this.to(V1).minus(V0);
 this.times(factor).plus(V0);

};