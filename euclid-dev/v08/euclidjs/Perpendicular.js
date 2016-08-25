euclid.Perpendicular = function(slate,Cval,Dval,Pval,Eval,Fval) {
  // Cval, Dval,Eval and Fval are PointElements
  // Pval is PlaneElement
  // draw perpendicular to CD in the plane P.  A is the proj of 
  // C onto P, while AB is perpendicular to CD and equals EF.
  euclid.LineElement.call(this,slate,null,null);
  var dbg=false;
  if(dbg) {
   console.log('euclid.Perpendicular constructor. arguments = ',arguments);
  }
  var A0 = new euclid.PointElement(slate,null,null,null,Pval);
  var B0 = new euclid.PointElement(slate,null,null,null,Pval);
  //console.log("Perpendicular chk0:\nA0=",A0.x,A0.y,A0.z,"\nB0=",B0.x,B0.y,B0.z);

  //console.log("Perpendicular chk1:\nA=",this.A,"\nB=",this.B);
  //this.A = new euclid.PointElement(slate,null,null,null,Pval);
  //this.B = new euclid.PointElement(slate,null,null,null,Pval);
  this.A = A0;
  this.B = B0;
  var A1 = this.A;
  var B1 = this.B;
  //console.log("Perpendicular chk2:\nA1=",A1.x,A1.y,A1.z,"\nB1=",B1.x,B1.y,B1.z);
  //console.log("Perpendicular chk0a:\nA0=",A0.x,A0.y,A0.z,"\nB0=",B0.x,B0.y,B0.z);
  // Note: I'm not sure about this.
  // The end result should be that this.A = A, this.B = B
  //euclid.LineElement.call(this,slate,A,B) // Similar to super()

  this.dimension = 1; // duplicative of LineElement
  this.P = Pval;
  this.C = Cval;
  this.D = Dval;
  this.E = Eval;
  this.F = Fval;
  //console.log("Fval=",Fval);
  this.elementClassName = "Perpendicular";
  this.parentClassName = "LineElement";
  //console.log("Perpendicular constructor:A=",this.A,"\nB=",this.B);
};
// Perpendicular extends LineElement
euclid.Perpendicular.prototype = Object.create(euclid.LineElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.Perpendicular,
      writable: true
    }
});
euclid.Perpendicular.prototype.translate = function(dx,dy) {
 // dx, dy are double
 this.A.translate(dx,dy);
 this.B.translate(dx,dy);
};
euclid.Perpendicular.prototype.rotate = function(pivot,ac,as) {
 // pivot is PointElement
 // ac, as are double
 this.A.rotate(pivot,ac,as);
 this.B.rotate(pivot,ac,as);
};
euclid.Perpendicular.prototype.update = function() {
 // predefine local variables to instance variables.
 // This is so the translation from Java to JS is easier.
 var dbg=false;
 var A = this.A; var C = this.C;
 var P = this.P; var B = this.B;
 var D = this.D; var E = this.E;
 var F = this.F;
 if (dbg) {
  console.log('Perpendicular.update enter: C=',C.toString(),', D=',D.toString());
  var Estr,Fstr;
  if (E) {Estr = E.toString();} else {Estr = E;}
  if (F) {Fstr = F.toString();} else {Fstr = F;}
  console.log('Perpendicular.update enter: E=',Estr,', F=',Fstr);
  console.log('   P=',P.toString());
  console.log("   A=",A.x,A.y,A.z,", B=",B.x,B.y,B.z);
 }
    A.to(C).toPlane(P);
    B.to(D).minus(A);
 if (dbg) {
  console.log(' chk1',"   A=",A.x,A.y,A.z,", B=",B.x,B.y,B.z);
  console.log(' P.S, P.T=',P.S.x,P.S.y,P.S.z, P.T.x,P.T.y,P.T.z);
 }
    var Bs = euclid.PointElement.dot(B,P.S);
    var Bt = euclid.PointElement.dot(B,P.T);
    var factor = Math.sqrt(E.distance2(F)/(Bs*Bs+Bt*Bt));
    Bs = -Bs/factor;
    Bt /= factor;
    //console.log(" chk1:",Bs,Bt,factor);
    B.x = Bt*P.S.x + Bs*P.T.x + A.x;
    B.y = Bt*P.S.y + Bs*P.T.y + A.y;
    B.z = Bt*P.S.z + Bs*P.T.z + A.z; 
  //console.log('Perpendicular.update done: A=',A.x,A.y,A.z,'\nB=',B.x,B.y,B.z);

};

