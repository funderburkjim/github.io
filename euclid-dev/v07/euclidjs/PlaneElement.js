  /*--------------------------------------------------------------------+
  | The plane is represented by three points on it.  It's displayed as  |
  | a parallelogram with three vertices A, B, and C,projected onto the  |
  | xy-plane. S is a unit vector in the direction AB, T is a           |
  | perpendicular unit in the plane, and U is perpendicular to both.  |          |                |
  +--------------------------------------------------------------------*/

euclid.PlaneElement = function(slate,A,B,C) {
 euclid.Element.call(this,slate); // Similar to super()
 this.A=A; this.B=B; this.C=C;
 this.S= new euclid.PointElement(slate); 
 this.T= new euclid.PointElement(slate); 
 this.U= new euclid.PointElement(slate);
 this.isScreen = false; // set true only for initial screen plane
 this.pivot=null; // pivot point for the plane, if any
 this.dimension = 2;
 this.elementClassName = "PlaneElement";
 this.parentClassName = "Element";
 //console.log('PlaneElement. A=',A.toString(),'B=',B.toString(),'C=',C.toString());
};
// PlaneElement extends Element
euclid.PlaneElement.prototype = Object.create(euclid.Element.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.PlaneElement,
      writable: true
    }
  });
euclid.PlaneElement.prototype.toString = function () {
    return "[Plane " + this.name + ": " + this.A.toString() + 
            " " + this.B.toString()  + " " + this.C.toString()  + "]";
};
euclid.PlaneElement.prototype.update = function () {
 var A = this.A; var B = this.B; var C = this.C;
 var S = this.S; var T = this.T; var U = this.U;
    if (this.isScreen && (A.z!=0.0 || B.z!=0.0 || C.z!=0.0)) {
      isScreen = false;
    }
    //console.log("PlaneElement update chk0: A=",A.toString(),"B=",B.toString(),"C=",C.toString());
    // update the frame S,T,U
    S.to(B).minus(A);
    T.to(C).minus(A);
    S.times(1.0/S.length());
    //console.log("PlaneElement update chk1: S=",S.toString()," T=",T.toString());
    var st = euclid.PointElement.dot(T,S);
    //console.log("PlaneElement update chk2: st=",st);
    T.x -= st*S.x; 
    T.y -= st*S.y; 
    T.z -= st*S.z; 
    T.times(1.0/T.length());
    U.toCross(S,T);
 };