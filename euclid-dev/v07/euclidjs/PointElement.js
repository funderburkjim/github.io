euclid.PointElement = function(slate)  {
/* The instance variables are x,y,z,AP
   Java has 3 constructors with
   0 parameters
   1 parameter (AP)
   3 parameters (x,y,z)
*/
 euclid.Element.call(this,slate); // Similar to super()
 /* The Java default value for a double is 0.0
  and xVal,yVal, zVal are double in Java.
  In Javascript, when the constructor is called with only 'slate' as parm,
  the default values of xVal, yVal, zVal are 'undefined'
 */
 var nargs = arguments.length;
 if (nargs == 1) {
  this.x = 0.0;
  this.y = 0.0;
  this.z = 0.0;
  this.AP = null;
 }else if (nargs == 2) {
  this.x = 0.0;
  this.y = 0.0;
  this.z = 0.0;
  this.AP = arguments[1];
 }else { // assume nargs == 4
  this.x = arguments[1];
  this.y = arguments[2];
  this.z = arguments[3];
  this.AP = arguments[4];
 }
 /* old, incorrect constructor
 if ((xVal === null) || (xVal === undefined)) {
  xVal = 0.0; yVal = 0.0; zVal = 0.0; APval = null;
 }
 this.x = xVal; this.y = yVal; this.z = zVal; // coords of the point
 this.AP = APval;
 */
 this.elementClassName = "PointElement";
 this.parentClassName = "Element";
};
// PointElement extends Element
euclid.PointElement.prototype = Object.create(euclid.Element.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.PointElement,
      writable: true
    }
  });
euclid.PointElement.prototype.defined = function() {
 return !Number.isNaN(this.x) && !Number.isNaN(this.y) && !Number.isNaN(this.z);
};
euclid.PointElement.prototype.toString = function() {
 return "[" + this.name + "=(" +this.x+ "," +this.y+ "," +this.z+ ")]";
};
euclid.PointElement.prototype.to = function(B) {
 this.x = B.x; this.y = B.y; this.z = B.z; 
 return this;
};
euclid.PointElement.prototype.plus = function(B) {
 this.x += B.x; this.y += B.y; this.z += B.z; 
 return this; 
};
euclid.PointElement.prototype.minus = function(B) {
 this.x -= B.x; this.y -= B.y; this.z -= B.z; 
 return this; 
};
euclid.PointElement.prototype.times = function(a) {
 this.x *= a; this.y *= a; this.z *= a; 
 return this; 
};
euclid.PointElement.prototype.sum = function(A,B) { 
 return new euclid.PointElement(this.slate,A.x + B.x, A.y + B.y, A.z + B.z);
};
euclid.PointElement.prototype.difference = function(A,B) { 
 return new euclid.PointElement(this.slate,A.x - B.x, A.y - B.y, A.z - B.z);
};
euclid.PointElement.prototype.product = function(a,B) {
 return new euclid.PointElement(this.slate,a*B.x, a*B.y, a*B.z);
};
euclid.PointElement.dot = function(A,B) { //static
 return (A.x *B.x) + (A.y *B.y) + (A.z *B.z)
};
euclid.PointElement.prototype.length2 = function() {
 return this.x*this.x + this.y*this.y + this.z*this.z;
};
euclid.PointElement.prototype.length = function() {
 // = Math.sqrt(this.length2())
 return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
};
euclid.PointElement.prototype.distance2 = function(B) {
 return (this.x-B.x)*(this.x-B.x) + (this.y-B.y)*(this.y-B.y) + (this.z-B.z)*(this.z-B.z);
};
euclid.PointElement.prototype.distance = function(B) {
 return Math.sqrt ((this.x-B.x)*(this.x-B.x) + (this.y-B.y)*(this.y-B.y) + (this.z-B.z)*(this.z-B.z));
};
euclid.PointElement.prototype.toCross = function(A,B) {
    // set to the cross product of A and B
    this.x = A.y*B.z - A.z*B.y;
    this.y = A.z*B.x - A.x*B.z;
    this.z = A.x*B.y - A.y*B.x;
    return this;
};
euclid.PointElement.prototype.cross = function(A,B) { 
    // return the cross product of A and B
    return new euclid.PointElement(this.slate,A.y*B.z - A.z*B.y, A.z*B.x - A.x*B.z, A.x*B.y - A.y*B.x);
};
euclid.PointElement.prototype.triple = function(A,B,C) { // static
    // return the triple product of A, B, and C
    return A.x*(B.y*C.z - B.z*C.y)
         + B.x*(C.y*A.z - C.z*A.y)
         + C.x*(A.y*B.z - A.z*B.y);
};
euclid.PointElement.prototype.drawName = function(d) { // d is a Dimension
    if (/*nameColor!=null && */ this.name!=null && this.defined())  {
      this.drawString(Math.round(this.x),Math.round(this.y), d);
    }
};
euclid.PointElement.prototype.drawVertex = function(c) {
  // In Java, there are two signatures, with 0 or 1 arguments
  var dbg=false;
  if (! c) {
   c = this.vertexColor;
  }
  if (dbg) {
   var ctemp;
   if (c) {ctemp=c.levels;} else {ctemp=c;}
 console.log("PointElement.drawVertex. name=",this.name,"Using color c=",ctemp);
 }

    if (this.defined() && ( c != null)) { // 
     this.p.noStroke();
     this.p.fill(c);
     this.p.ellipseMode(this.CENTER);
     this.p.ellipse(this.x,this.y,4.0,4.0);
    }
  
};
euclid.PointElement.prototype.toLine = function(A,B,segment) {
 // A, B are PointElements. segment is a boolean value
 /*---------------------------------------------------------------------+
 |  Project this point to the foot of the perpendicular from it to the  |
 |  line determined by the points A and B. If A were the origin, then   |
 |  the foot would be at ((this dot B)/B^2) B.  When segment is true |
 |  and the foot is beyond A or B, then move the point to the closer |
 |  of A and B.     |
 +---------------------------------------------------------------------*/
 var V = this.difference(B,A);
 this.minus(A);
 var factor = euclid.PointElement.dot(V,this)/V.length2();
 if (segment) {
   if (factor < 0.0) {factor = 0.0;}
   else if (factor > 1.0) {factor = 1.0;}
 }
 V.times(factor);
 return this.to(V).plus(A);
};

euclid.PointElement.prototype.toPlane = function(P) { 
 // P is a PlaneElement
 /*---------------------------------------------------------------------+
 |  Project this point to the foot of the perpendicular from it to the  |
 |  plane P.         |
 +---------------------------------------------------------------------*/
 if (P.isScreen){
   this.z = 0.0;
 }else {
   this.minus(P.A);
   var s = euclid.PointElement.dot(this,P.S);
   var t = euclid.PointElement.dot(this,P.T);
   this.to(P.S).times(s).plus(product(t,P.T)).plus(P.A);
 }
 return this;
 };

euclid.PointElement.prototype.uptoPlane = function(P) {
 // P is a PlaneElement
 /*---------------------------------------------------------------------+
 |  Project this point to the point on the plane P where the vertical   |
 |  line through this meets P.|
 +---------------------------------------------------------------------*/
 if (P.isScreen) {
   this.z = 0.0;
 }else {
   this.minus(P.A);
   var den = P.S.x*P.T.y - P.S.y*P.T.x;
   var s = (x*P.T.y - y*P.T.x)/den;
   var t = (y*P.S.x - x*P.S.y)/den;
   this.to(P.S).times(s).plus(product(t,P.T)).plus(P.A);
 }
 return this;
};
euclid.PointElement.prototype.toCircumcenter = function(A,B,C) {
 /*---------------------------------------------------------------------+
 | Move this point to the center of the circle passing through the   |
 | points A, B, and C.              |
 +---------------------------------------------------------------------*/
 if (A.z == 0.0 && B.z == 0.0 && C.z == 0.0) {
   var u = ((A.x-B.x)*(A.x+B.x) + (A.y-B.y)*(A.y+B.y)) / 2.0;
   var v = ((B.x-C.x)*(B.x+C.x) + (B.y-C.y)*(B.y+C.y)) / 2.0;
   var den = (A.x-B.x)*(B.y-C.y) - (B.x-C.x)*(A.y-B.y);
   this.x = (u * (B.y-C.y) - v*(A.y-B.y)) / den;
   this.y = (v * (A.x-B.x) - u*(B.x-C.x)) / den;
   this.z = 0.0;
 } else {
   var BmA = this.difference(B,A); var CmA = this.difference(C,A);
   var BC = euclid.PointElement.dot(BmA,CmA);
   var B2 = BmA.length2(); var C2 = CmA.length2();
   var BC2 = BC*BC;    
   var den = 2.0*(B2*C2-BC*BC);
   var s = C2*(B2-BC)/den;
   var t = B2*(C2-BC)/den;
   this.to(A).plus(BmA.times(s)).plus(CmA.times(t));
 }
 return this;
};

euclid.PointElement.prototype.toCircle = function(C) {
 /*---------------------------------------------------------------------+
 | Move this point to the nearest point on the circle C.    |
 +---------------------------------------------------------------------*/
 if (C.AP.isScreen) {
   var factor = C.radius() / this.distance(C.Center);
   this.x = C.Center.x + factor*(this.x - C.Center.x);
   this.y = C.Center.y + factor*(this.y - C.Center.y);
   this.z = 0.0;
 } else { // 3d case: project to plane of circle then move to sphere of circle
   this.toPlane(C.AP);
   this.toSphere(C.Center,C.radius());
 }
 return this;
};
euclid.PointElement.prototype.toSphere = function(Center,radius) {
 /*---------------------------------------------------------------------+
 | Move this point to the nearest point on the sphere    |
  with given Center and radius
 +---------------------------------------------------------------------*/
 var factor = radius / this.distance(Center);
 this.x = Center.x + factor*(this.x - Center.x);
 this.y = Center.y + factor*(this.y - Center.y);
 this.z = Center.z + factor*(this.z - Center.z);
 return this;
};
euclid.PointElement.prototype.area = function(A,B,C) {
 // Is almost static.  But, not quite, as difference is not static.
 // return the area of the triangle ABC
 var U = this.difference(B,A);
 var V = this.difference(C,A);
 return this.cross(U,V).length()/2.0;
};

euclid.PointElement.prototype.angle = function(B,C,P) {
 // Determine the angle BAC in the plane P where this is A.
 // The angle lies between -pi and pi (-180 degrees and 180 degrees)
 var Bx = B.x - this.x; var Cx = C.x - this.x;
 var By = B.y - this.y; var Cy = C.y - this.y;
 if (P.isScreen) {
   return Math.atan2 (Bx*Cy - By*Cx, Bx*Cx + By*Cy);
 }else { // 3d case.  First get P-coordinates for B and C
   var Bz = B.z - this.z; var Cz = C.z - this.z;
   var Bs = Bx*P.S.x + By*P.S.y + Bz*P.S.z ;
   var Bt = Bx*P.T.x + By*P.T.y + Bz*P.T.z ;
   var Cs = Cx*P.S.x + Cy*P.S.y + Cz*P.S.z ;
   var Ct = Cx*P.T.x + Cy*P.T.y + Cz*P.T.z ;
   return Math.atan2 (Bs*Ct - Bt*Cs, Bs*Cs + Bt*Ct);
 }
};
euclid.PointElement.prototype.translate = function(dx,dy) {
 // translate by (dx,dy) in the x-y plane
 this.x += dx; this.y += dy;
};

euclid.PointElement.prototype.toIntersection = function(A,B,C,D,P) {
 // A,B,C,D are points. P is a plane
 var dbg=false;
 if (P.isScreen) {
   // move this point to where the two lines AB and CD meet
   var d0 = A.x*B.y - A.y*B.x;
   var d1 = C.x*D.y - C.y*D.x;
   var den = (B.y-A.y)*(C.x-D.x) - (A.x-B.x)*(D.y-C.y);
   this.x = (d0*(C.x-D.x) - d1*(A.x-B.x)) / den;
   this.y = (d1*(B.y-A.y) - d0*(D.y-C.y)) / den;
 } else { // 3d case
   // AmA .. DmA are PointElements
   var AmA = this.difference(A,P.A); var BmA = this.difference(B,P.A);
   var CmA = this.difference(C,P.A); var DmA = this.difference(D,P.A);
   var Ax = euclid.PointElement.dot(AmA,P.S); var Ay = euclid.PointElement.dot(AmA,P.T);
   var Bx = euclid.PointElement.dot(BmA,P.S); var By = euclid.PointElement.dot(BmA,P.T);
   var Cx = euclid.PointElement.dot(CmA,P.S); var Cy = euclid.PointElement.dot(CmA,P.T);
   var Dx = euclid.PointElement.dot(DmA,P.S); var Dy = euclid.PointElement.dot(DmA,P.T);
   var d0 = Ax*By - Ay*Bx;
   var d1 = Cx*Dy - Cy*Dx;
   var den = (By-Ay)*(Cx-Dx) - (Ax-Bx)*(Dy-Cy);
   var s = (d0*(Cx-Dx) - d1*(Ax-Bx)) / den;
   var t = (d1*(By-Ay) - d0*(Dy-Cy)) / den;
   this.to(P.S).times(s).plus(product(t,P.T)).plus(P.A);
 }
 if (dbg) {
  console.log("PointElement.toIntersection:",A,B,C,D,P);
  console.log("   => this=",this);
 }
 return this;
};
euclid.PointElement.prototype.toIntersectionPL = function(P,D,E) {
 // move this point to where the plane P meets the line DE
 this.to(E).minus(D); 
 var DmA = this.difference(D,P.A);
 var u = -triple(P.S,P.T,DmA)/triple(P.S,P.T,this);
 return this.times(u).plus(D);
};
euclid.PointElement.prototype.toInvertPoint = function(A,C) {
 // move this point to the inversion of the point A in the circle C
 var factor = C.radius2() / A.distance2(C.Center);
 return this.to(A).minus(C.Center).times(factor).plus(C.Center);
};
euclid.PointElement.prototype.toSimilar = function(A,B,P, D,E,F, Q) {
 // move this point to the location C so that triangle ABC is similar
 // to triangle DEF.
 var theta = D.angle(E,F,Q);
 var co = Math.cos(theta); 
 var si = Math.sin(theta);
 var factor = D.distance(F) / D.distance(E);
 if (P.isScreen) {
   this.x = B.x; 
   this.y = B.y;
   this.rotate(A,co,si,P);
   this.x = A.x + factor*(this.x - A.x);
   this.y = A.y + factor*(this.y - A.y);
   this.z = 0.0;
 } else {
   var BmA = this.difference(B,A);
   var  s = euclid.PointElement.dot(BmA,P.S);
   var  t = euclid.PointElement.dot(BmA,P.T);
   var ss = factor*(co*s - si*t);
   var tt = factor*(si*s + co*t);
   this.x = ss*P.S.x + tt*P.T.x + A.x;
   this.y = ss*P.S.y + tt*P.T.y + A.y;
   this.z = ss*P.S.z + tt*P.T.z + A.z;
 }
 return this;
 };
euclid.PointElement.prototype.rotate = function(pivot,ac,as,plane) {
 /* Java has two signatures, where plane is present or absent.
  pivot is PointElement, ac and as are numbers (cos and sin of some angle).
  If plane is absent, then the plane of pivot is used.
 */
 if (plane == undefined) {
  plane = pivot.AP;
 }
   /*--------------------------------------------------------------------------+
    | Scale and rotate this point around the axis through the pivot and		|
    | perpendicular to the plane.  Scale by a factor of a, and rotate by the	|
    | angle theta where ac = a cos theta, and as = a sin theta.			|
    +--------------------------------------------------------------------------*/
 if (this == pivot) return;
 if (plane.isScreen) {
   var dx = this.x - pivot.x;
   var dy = this.y - pivot.y;
   this.x = pivot.x + ac*dx - as*dy;
   this.y = pivot.y + as*dx + ac*dy;
 } else {
   this.minus(pivot);
   var S = plane.S; // S,T,U are points defining 'plane' (think origin, unit x-vector, and unit y-vector)
   var T = plane.T;
   var U = plane.U;
   var s = euclid.PointElement.dot(this,S);
   var t = euclid.PointElement.dot(this,T);
   var z1 = euclid.PointElement.dot(this,U);
   var x1 = ac*s - as*t;
   var y1 = as*s + ac*t;
   this.x = pivot.x + x1*S.x + y1*T.x + z1*U.x;
   this.y = pivot.y + x1*S.y + y1*T.y + z1*U.y;
   this.z = pivot.z + x1*S.z + y1*T.z + z1*U.z;
 }
};

/*
euclid.PointElement.prototype. = function() {
};
*/

