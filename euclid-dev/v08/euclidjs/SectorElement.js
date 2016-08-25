euclid.SectorElement = function(slate,Oval,Aval,Bval,Pval)  {
/* Two constructors, one is empty
  Oval,Aval,Bval are PointElements
  Pval is PlaneElement
*/
 euclid.Element.call(this,slate); // Similar to super()
 this.Center = Oval;
 this.A = Aval; 
 this.B = Bval; 
 this.P = Pval;
 this.dimension = 2;
 this.elementClassName = "SectorElement";
 this.parentClassName = "Element";
 //console.log("euclid.SectorElement constructor:",this.Center,this.A,this.B,this.P);
};
// SectorElement extends Element
euclid.SectorElement.prototype = Object.create(euclid.Element.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.SectorElement,
      writable: true
    }
  });
euclid.SectorElement.prototype.toString = function () {
 return "[" + this.name + ": Center=" + this.Center + " A=" + this.A + " B=" + this.B + "]";
};
euclid.SectorElement.prototype.radius = function () {
 return this.Center.distance(this.A);
};
euclid.SectorElement.prototype.radius2 = function () {
 return this.Center.distance2(this.A);
};
euclid.SectorElement.prototype.update = function () {
 this.P.update();
};
euclid.SectorElement.prototype.drawName = function (d) {
 // d is a Dimension
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
 /* drawName for LineElement
  var ix = Math.round((this.A.x+this.B.x)/2.0);
  var iy = Math.round((this.A.y+this.B.y)/2.0);
  this.drawString(ix,iy, d);
 */
 /* drawName in SectorElement.java
      g.setColor(nameColor);
      FontMetrics fm = g.getFontMetrics();
      int w = fm.stringWidth(name);
      int h = fm.getHeight();
      g.drawString(name, (int)Center.x - w/2,
			 (int)Center.y - h/2 + fm.getAscent());
 */
 }
};
euclid.SectorElement.prototype.defined = function () {
 return true;
 // return Center.defined() && A.defined() && B.defined();
};
euclid.SectorElement.prototype.drawEdge = function () {
 var dbg=false;
 if (dbg) {
  console.log('SectorElement.drawEdge: this=\n',this);
 }
 var ok = ((this.edgeColor != null) && (this.defined()));
 if (! ok) {return;}
 var r = this.radius();
 var d = Math.round(2*r); // diameter
 // unpack instance variables for more readable formulas
 var A = this.A; var B = this.B; var P = this.P; var Center = this.Center;
 var p = this.slate.p; // Processingjs
 /* Here is the Java call for drawing an arc:
      int startAngle = - (int)Math.round(Math.atan2(A.y-Center.y,A.x-Center.x)*180.0/Math.PI);
      int arcAngle = -(int)Math.round(Center.angle(A,B,P)*180.0/Math.PI);
      if (arcAngle < 0)
	arcAngle += 360;
      g.drawArc((int)Math.round(Center.x-r),(int)Math.round(Center.y-r),
		 d,d, startAngle, arcAngle);
      g.drawArc(x,y,w,h,startAngle, arcAngle);
      The center of the arc is the center of the rectangle whose 'origin' 
      is (x,y) (upper left corner) and whose size is given by the w,h args.
      Angles are interpreted such that 0 degrees is at the 3 o'clock position. 
      A positive value indicates a counter-clockwise rotation while a negative value 
      indicates a clockwise rotation.

      In processing, the 'arc' method is similar, EXCEPT that
       positive angles indicate a CLOCKWISE rotation.  The interpretation
       of the x,y Center depends on EllispMode (default is center of ellipse).
     Java awt angles are in degrees.  Processing angles are in radians.
     The last parameter is the endAngle (rather than the incremental arcAngle).
     Also, to get the same arc as the Java code, we must draw the arc
     from endAngle to startAngle, rather than from startAngle to endAngle.
 */
 var ix,iy,startAngle,endAngle;
 ix = Math.round(Center.x);
 iy = Math.round(Center.y);
 startAngle =  (Math.atan2(A.y-Center.y,A.x-Center.x));
 dbg=false;
 var endAngle = (Math.atan2(B.y-Center.y,B.x-Center.x));
 if (dbg && (Center.name == 'E')) {
  var startdeg,enddeg;
  startdeg = startAngle*180.0/Math.PI;
  venddeg = endAngle*180.0/Math.PI;
  console.log('SectorElement.drawEdge - arc parms=',ix,iy,r,r,startdeg,enddeg);
  console.log(" Center =",Center.toString(), ", A = ",A.toString(), ", B = ",B.toString());
 }
 p.noFill();
 p.stroke(this.edgeColor);
 p.arc(ix,iy,d,d, endAngle, startAngle);
 
};
euclid.SectorElement.prototype.drawFace = function () {
 // same as drawEdge, except for use of p.fill(faceColor)
 var faceColor = this.faceColor;
 var ok = (faceColor!=null  && this.defined());
 if (! ok) {return;}
 // unpack instance variables for more readable formulas
 var r = this.radius();
 var d = Math.round(2*r); // diameter
 // unpack instance variables for more readable formulas
 var A = this.A; var B = this.B; var P = this.P; var Center = this.Center;
 var p = this.slate.p; // Processingjs
 var ix,iy,startAngle,endAngle;
 ix = Math.round(Center.x);
 iy = Math.round(Center.y);
 startAngle =  (Math.atan2(A.y-Center.y,A.x-Center.x));
 dbg=false;
 var endAngle = (Math.atan2(B.y-Center.y,B.x-Center.x));
 if (dbg && (Center.name == 'E')) {
  var startdeg,enddeg;
  startdeg = startAngle*180.0/Math.PI;
  venddeg = endAngle*180.0/Math.PI;
  console.log('SectorElement.drawEdge - arc parms=',ix,iy,r,r,startdeg,enddeg);
  console.log(" Center =",Center.toString(), ", A = ",A.toString(), ", B = ",B.toString());
 }
 p.fill(faceColor);
 //p.stroke(this.edgeColor);
 p.arc(ix,iy,d,d, endAngle, startAngle);
};
/*
euclid.SectorElement.prototype. = function () {
};
*/