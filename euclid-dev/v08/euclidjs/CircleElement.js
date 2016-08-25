euclid.CircleElement = function(slate,Parm1,Parm2,Parm3,Parm4) {
  /*--------------------------------------------------------------------+
  | The circle has center Center, and radius AB, and lies in plane AP.	|
  +--------------------------------------------------------------------*/

/* Various constructors, all have slate parameter.
  0. no other parameters.
  1. Oval,Aval,Bval are PointElements
     APval is PlaneElement
  2. Oval, Bval, APval
*/
 euclid.Element.call(this,slate); // Similar to super()
 this.dimension = 2;
 var nargs = arguments.length;
 var iopt = [1,5,4].indexOf(nargs);
 if ( iopt == -1) {
  console.log("euclid.CircleElement: constructor has wrong number of arguments",nargs);
  return;
 }
 this.Center = undefined;
 this.A = undefined;
 this.B = undefined;
 this.AP = undefined; // PlaneElement
 this.elementClassName = "CircleElement";
 this.parentClassName = "Element";
 if (iopt == 0) { // slate is only parameter
 }else if (iopt == 1) {
  this.Center = Parm1;
  this.A = Parm2;
  this.B = Parm3;
  this.AP = Parm4;
 }else if (iopt == 2) {
  this.Center = Parm1;
  this.A = Parm1;
  this.B = Parm2;
  this.AP = Parm3;
 }
};
// CircleElement extends Element
euclid.CircleElement.prototype = Object.create(euclid.Element.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.CircleElement,
      writable: true
    }
  });
euclid.CircleElement.prototype.toString = function () {
 return "[" + this.name + ": Center=" + this.Center + " A=" + this.A + " B=" + this.B + "AP="+AP +"]";
};
euclid.CircleElement.prototype.radius = function () {
 return this.A.distance(this.B); // why not this.Center.distance(this.B) ?
};
euclid.CircleElement.prototype.radius2 = function () {
 return this.A.distance2(this.B);
};
euclid.CircleElement.prototype.drawName = function (d) { 
 // d is a Dimension . This code the same as in LineElement
 if ((this.nameColor!=null) && (this.name!=null)) { //  && this.defined()) {
  // consult also drawString in Element.js
  var slate = this.slate;
  var p = slate.p; // Processingjs
  p.textSize(slate.slateFontsize);
  p.textFont(slate.slateFont);
  p.fill(this.nameColor);
  var name = this.name;
  var w = p.textWidth(name);
  var h = p.textAscent() + p.textDescent();
  var Center = this.Center;
  p.text(name,Center.x - (w/2), Center.y - (h/2) + p.textAscent());
 }
};
euclid.CircleElement.prototype.defined = function () {
 return true;
 // return Center.defined() && A.defined() && B.defined() &&AP.defined();
};
euclid.CircleElement.prototype.drawEdge = function () {
 var dbg=false;
 if (dbg) {
  console.log('CircleElement.drawEdge: this=\n',this);
 }
 var ok = ((this.edgeColor != null) && (this.defined()));
 if (! ok) {return;}
 var r2 = this.radius2();
 var r =  Math.sqrt(r2);
 // unpack instance variables for more readable formulas
 var A = this.A; var B = this.B; var AP = this.AP; var Center = this.Center;
 var p = this.slate.p; // Processingjs

 var amp2 = AP.S.z*AP.S.z + AP.T.z*AP.T.z;
 if (Math.abs(amp2) < 0.01) { // the circle is flat
  p.stroke(this.edgeColor);
  p.noFill();
  p.ellipse(Center.x,Center.y,2*r,2*r);
  return;
 }
 var h = r/Math.sqrt(amp2);
 // determine major and minor radius vectors
 var rcos = h*AP.T.z;
 var rsin = -h*AP.S.z;
 var majorx = rcos*AP.S.x + rsin*AP.T.x;
 var majory = rcos*AP.S.y + rsin*AP.T.y;
 var factor = (amp2 < 1.0)? Math.sqrt(1.0-amp2) : 0.0;
 var minorx = -factor*majory;
 var minory = factor*majorx;
 this.drawEllipse(Math.round(Center.x),Math.round(Center.y),
        majorx,majory,minorx,minory);
};
euclid.CircleElement.prototype.drawFace = function () {
 var faceColor = this.faceColor;
 var ok = (faceColor!=null  && this.defined());
 if (! ok) {return;}
 // unpack instance variables for more readable formulas
 var A = this.A; var B = this.B; var AP = this.AP; var Center = this.Center;
 var p = this.slate.p; // Processingjs
 var r2 = this.radius2();
 var r = Math.sqrt(r2);
 var amp2 = AP.S.z*AP.S.z + AP.T.z*AP.T.z;
 if (Math.abs(amp2) < 0.01) { // the circle is flat
  p.fill(faceColor);
  p.ellipse(Center.x,Center.y,2*r,2*r);
  return;
 }
 var h = r/Math.sqrt(amp2);
 // determine major and minor radius vectors
 var rcos = h*AP.T.z;
 var rsin = -h*AP.S.z;
 var majorx = rcos*AP.S.x + rsin*AP.T.x;
 var majory = rcos*AP.S.y + rsin*AP.T.y;
 var factor = (amp2 < 1.0)? Math.sqrt(1.0-amp2) : 0.0;
 var minorx = -factor*majory;
 var minory = factor*majorx;
 this.fillEllipse(Math.round(Center.x),Math.round(Center.y),
  majorx,majory,minorx,minory);
};
euclid.CircleElement.prototype.fillEllipse = function (Cx,Cy,a,b,c,d) {
  /*--------------------------------------------------------------------+
  | Fill an ellipse whose center is at (Cx,Cy), and perpendicular	|
  | radius  vectors are (a,b) and (c,d).  If the ellipse isn't tilted,	|
  | then fillOval still works.  Otherwise, the equation of the		|
  | origin-centered ellipse is found in the form x^2 - 2Bxy + Cy^2 = D	|
  | where B is (ab+cd)/(b^2+d^2), C is (a^2+c^2)/(b^2+d^2), and D is	|
  | (ad-bc)^2/(b^2+d^2).  The maximum and minimum y values on this	|
  | ellipse are +/- sqrt(D/(C-B^2)).  For a given y, the max and min	|
  | x values are By +/- sqrt((B^2-C)y^2+CD).				|
  +--------------------------------------------------------------------*/
 /* Processing note: There is probably an easier way to do this
    in Processing, by a transform
 */
 var p = this.slate.p; 
 var faceColor = this.faceColor;
 var ok = (faceColor!=null  && defined());
 if (! ok) {return;}
 p.fill(faceColor);
 if (Math.abs(a) < 0.5 && Math.abs(d)<0.5) {
   // axes are vert & horiz, so can still use ellipse
   b = Math.abs(b); c = Math.abs(c);
   p.ellipse(Cx,Cy,2*c,2*b);
   return;
 }
 if (Math.abs(b) < 0.5 && Math.abs(c)<0.5) {
   // axes are horiz & vert, so can still use fillOval
   a = Math.abs(a); d = Math.abs(d);
   p.ellipse(Cx,Cy,2*a,2*d);
   return;
 } 
 if (Math.abs(c) + Math.abs(d) < 0.5) {
   // ellipse is so thin it looks like a line
   p.line(Cx-a,Cy-b,Cx+a,Cy+b);
   return;
 } 
 if (Math.abs(a) + Math.abs(b) < 0.5) {
   // ellipse is so thin it looks like a line
   p.line(Cx-c,Cy-d,Cx+c,Cy+d);
   return;
 } 
// otherwise the ellipse is really tilted
 var b2d2 = b*b+d*d;
 var B = (a*b+c*d)/b2d2, B2 = B*B;
 var C = (a*a+c*c)/b2d2, B2mC= B2-C;
 var D = a*d-b*c;  D = D*D/b2d2;
 var maxy = Math.round(Math.sqrt(D/(C-B2)));
 for (var y=0; y<=maxy; ++y) {
   if (Cy+y < 0) break;
   var w = Math.sqrt(B2mC*(y*y)+D);
   var By = B*y;
   p.line((Cx+By+w),Cy+y,(Cx+By-w),Cy+y);
   p.line((Cx-By+w),Cy-y,(Cx-By-w),Cy-y);
 }
};
euclid.CircleElement.prototype.drawEllipse = function (Cx,Cy,a,b,c,d) {
  /*--------------------------------------------------------------------+
  | Similar to fillEllipse except only the circumference is drawn.	|
  +--------------------------------------------------------------------*/
 var p = this.slate.p; 
 p.noFill();
 if (Math.abs(a) < 0.5 && Math.abs(d)<0.5) {
   // axes are vert & horiz, so can still use drawOval
   b = Math.abs(b); c = Math.abs(c);
   p.ellipse(Cx,Cy,2*c,2*b);
   return;
 }
 if (Math.abs(b) < 0.5 && Math.abs(c)<0.5) {
   // axes are horiz & vert, so can still use drawOval
   a = Math.abs(a); d = Math.abs(d);
   p.ellipse(Cx,Cy,2*a,2*d);
   return;
 }
 if (Math.abs(c) + Math.abs(d) < 0.5) {
   // ellipse is so thin it looks like a line
   p.line(Cx-a,Cy-b,Cx+a,Cy+b);
   return;
 } 
 if (Math.abs(a) + Math.abs(b) < 0.5) {
   // ellipse is so thin it looks like a line
   p.line(Cx-c,Cy-d,Cx+c,Cy+d);
   return;
 } 
// otherwise the ellipse is really tilted
 var b2d2 = b*b+d*d;
 var B = (a*b+c*d)/b2d2, B2 = B*B;
 var C = (a*a+c*c)/b2d2, B2mC= B2-C;
 var D = a*d-b*c;  D = D*D/b2d2;
 var maxy = Math.floor(Math.sqrt(D/(C-B2)));
 var olduleft=0,olduright=0,oldlleft=0,oldlright=0;
 for (var y=0; y<=maxy; ++y) {
   var uy = Cy-y, ly = Cy+y;
   if (ly < 0) break;
   var w = Math.sqrt(B2mC*(y*y)+D);
   var By = B*y;
   var uleft = (Cx-By-w), uright = (Cx-By+w);
   var lleft = (Cx+By-w), lright = (Cx+By+w);
   if (y == 0) {
    p.line(uleft,uy,uleft,uy);
    p.line(uright,uy,uright,uy);
   } else {
    p.line(uleft,uy,olduleft,uy);
    p.line(olduright,uy,uright,uy);
    p.line(lleft,ly,oldlleft,ly);
    p.line(oldlright,ly,lright,ly);
   }
   olduleft = uleft; olduright = uright;
   oldlleft = lleft; oldlright = lright;
 }
 p.line(olduleft,Cy-maxy-1,olduright,Cy-maxy-1);
 p.line(oldlleft,Cy+maxy+1,oldlright,Cy+maxy+1);
};
/*
euclid.CircleElement.prototype. = function () {
};
*/