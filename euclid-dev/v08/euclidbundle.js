 /* So the 'euclid' variable is accessible to any of the files.
    euclid is defined
 */
  var euclid={};
// in euclid package
euclid.Dimension = function(w,h) {
 this.width=w;
 this.height=h;
};
euclid.Dimension.prototype.toString = function () {
 return "(" + this.width + "," + this.height + ")";
}// from npm stringbuffer. July 7, 2016
// Slightly modified to remove dependence on 'process'
StringBuffer = (function() {
/*
  StringBuffer.NEWLINE = (function() {
    switch (false) {
      case process.platform !== "win32":
        return "\r\n";
      default:
        return "\n";
    }
  })();
*/
  function StringBuffer(separator) {
    this.separator = separator != null ? separator : "";
    this.buffer = [];
    this.index = 0;
  }

  StringBuffer.prototype.append = function(string) {
    var s, _i, _len, _ref;
    if ("StringBuffer" === typeof string) {
      _ref = string.buffer;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        s = _ref[_i];
        this.append(s);
      }
    } else {
      this.buffer[this.index] = string;
      this.index++;
    }
    return this;
  };

  StringBuffer.prototype.toString = function(separator) {
    if (separator == null) {
      separator = this.separator;
    }
    return this.buffer.join(separator);
  };

  return StringBuffer;

})();
"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
var euclid;
(function (euclid) {
    var StringTokenizer = (function () {
        function StringTokenizer(str0, regex0) {
            this.inext = 0;
            this.str = str0;
            this.regex = regex0;
            this.inext = 0;
            this.tokens = this.str.split(this.regex);
        }
        StringTokenizer.prototype.hasMoreTokens = function () {
            return (this.inext < this.tokens.length);
        };
        StringTokenizer.prototype.nextToken = function () {
            if (this.hasMoreTokens()) {
                var next = this.tokens[this.inext];
                this.inext = this.inext + 1;
                return next;
            }
            else {
                return "";
            }
        };
        return StringTokenizer;
    }());
    euclid.StringTokenizer = StringTokenizer;
})(euclid || (euclid = {}));

euclid.Element = function(slate) {
 // p is p5js (processing js object)
 this.slate = slate;
 this.p = slate.p;
 this.name = null;
 this.nameColor = euclid.invisibleColor ;
 this.vertexColor = euclid.invisibleColor ;
 this.edgeColor = euclid.invisibleColor ;
 this.faceColor = euclid.invisibleColor ;
 this.dragable = false;
 this.dimension=0; // default Java value for an 'int'
 this.align = 0;// default Java value for an 'int'
};
// static constants relating to label position
euclid.Element.CENTRAL = 0; 
euclid.Element.LEFT = 1;
euclid.Element.RIGHT = 2;
euclid.Element.ABOVE = 3;
euclid.Element.BELOW = 4;
euclid.Element.prototype.inClass = function(className) {
 // className a string.
 // Might be better to use Javascript isinstanceof 
 //console.log('Element.inClass for name=',this.name,', elementClassName=',this.elementClassName,', parentClassName=',this.parentClassName,', className=',className);
 if (className == this.elementClassName) {return true;}
 if (className == this.parentClassName) {return true;}
 return false;
};
// Java code defines several empty methods, as Element is an abstract class
// in Java.
euclid.Element.prototype.defined = function () {return false};
euclid.Element.prototype.reset = function () {this.update()};
euclid.Element.prototype.update = function () {};
euclid.Element.prototype.translate = function (dx,dy) {};
euclid.Element.prototype.drag = function (tox,toy) {
    // drag returns true when the element is actually dragged
 return false;
};
euclid.Element.prototype.rotate = function (pivot,ac,as) {
 // pivot is a PointElement; ac and as are numbers
};
  // in drawName, drawFace, drawEdge, drawVertex, remove parameter
  // Graphics g :  This is understood in Processing, I think
euclid.Element.prototype.drawName = function (d) {
 // d is a Dimension
};
euclid.Element.prototype.drawFace = function () {};
euclid.Element.prototype.drawEdge = function () {};
euclid.Element.prototype.drawVertex = function () {};
euclid.Element.prototype.drawString = function (ix,iy,d) {
 // ix,iy are numbers. d is a Dimension
 var dbg=false;
 var slate = this.slate;
 var p = slate.p; // Processingjs
 p.textSize(slate.slateFontsize);
 p.textFont(slate.slateFont);
 if (dbg) {
  console.log("Element.drawString. Font info=",slate.slateFontsize,slate.slateFont);
  console.log("Element.drawString, name=",this.name,"nameColor=",this.nameColor);
 }
 if (dbg) {
  if (this.nameColor == euclid.invisibleColor) {
   console.log('Element.drawstring: nameColor = invisibleColor',this.name);
  }else {
   console.log('Element.drawstring: nameColor not= invisibleColor',this.name,this.nameColor,euclid.invisibleColor);
  }
 }
 if (this.nameColor == euclid.invisibleColor) {return;} // don't draw name
p.fill(this.nameColor);
var w = p.textWidth(this.name);
 var h = p.textAscent() + p.textDescent();
 var name = this.name;
 if (dbg) { console.log("Element.drawstring: w,h,align=",w,h,this.align);}
 switch (this.align) {
  case euclid.Element.LEFT:
    p.text(name, ix-w-6, iy+h/2-4);
    return;
  case euclid.Element.RIGHT:
    p.text(name, ix+2, iy+h/2-4);
    return;
  case euclid.Element.ABOVE:
    p.text(name, ix-w/2, iy-h/2+4);
    return;
  case euclid.Element.BELOW:
    p.text(name, ix-w/2, iy+h/2+6);
    return;
  }  
  // otherwise CENTRAL
  // compute (dx,dy) coordinates relative to center of canvas
  // and normalized
  var dx = (ix - d.width/2) * d.height;
  var dy = (iy - d.height/2) * d.width;
  if (dy > dx) {
   if (dy >= -dx) {
     // put name below
    p.text(name, ix-w/2, iy+h/2+6);
   }else {    
    // put name left
    p.text(name, ix-w-6, iy+h/2-4);
   }
  } else {
   if (dy >= -dx) {
    // put name right
    p.text(name, ix+2, iy+h/2-4);
   }else {    
    // put name above
    p.text(name, ix-w/2, iy-h/2+4);
   }
 }
};

/*
euclid.Element.prototype. = function () {};
euclid.Element.prototype. = function () {};
*/
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
*/euclid.Arc = function(slate,Aval, Mval, Bval, Pval)  {
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
*/euclid.CircleElement = function(slate,Parm1,Parm2,Parm3,Parm4) {
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
*/euclid.Circumcircle = function(slate,B,C,D,AP) {
  /*--------------------------------------------------------------------+
  | This is the circle passing through the three points B, C, and D.	|
  | It is assumed that all three points lie in the plane AP.		|
  +--------------------------------------------------------------------*/

 euclid.CircleElement.call(this,slate); // Similar to super()
 this.dimension = 2;
 this.B=B;
 this.C=C;
 this.D=D;
 this.AP = AP; // PlaneElement
 this.Center = new euclid.PointElement(slate,AP);
 this.A = this.Center;

 this.elementClassName = "Circumcircle";
 this.parentClassName = "CircleElement";
};
// Circumcircle extends CircleElement
euclid.Circumcircle.prototype = Object.create(euclid.CircleElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.Circumcircle,
      writable: true
    }
  });


euclid.Circumcircle.prototype.update = function () {
 this.Center.toCircumcenter(this.B,this.C,this.D);
};
euclid.Circumcircle.prototype.translate = function (dx,dy) {
 this.Center.translate(dx,dy)
};
euclid.Circumcircle.prototype.rotate = function (pivot,c,s) {
 // pivot is PointElement; c and s are double (cos and sin of some angle)
 this.Center.rotate(pivot,c,s);
};

/*
euclid.Circumcircle.prototype. = function () {
};
*/euclid.PolygonElement = function(slate) {
/* Various constructors, all have slate parameter.
   The rest of the parameters are PointElements.
   PolygonElement.java has constructors for 
   3 points (triangle), 4 points (quadrilateral), 
   5 points (pentagon), 6 points (hexagon), 8 points (octagon).
   The points are saved in the array V of vertices, and
   the integer n is the number of points.
   There is also a constructor with just 1 parameter,
    which is an integer indicating the number of vertices.  In this case, V
    is an array of (undefined) PointElements.
   
   It would be slightly more convenient to use the ...restArgs syntax of Ecmascript 6,
    (ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
   but this is not supported by Safari.
   Thus, the implementation uses the 'arguments' variable
*/
 euclid.Element.call(this,slate); // Similar to super()
 this.dimension = 2;
 var nargs = arguments.length;
 
 if ( ( nargs == 3) || (nargs == 1)){ //can't draw polygon with 2 vertices or no vertices
  console.log("euclid.PolygonElement: constructor has wrong number of arguments",nargs);
  return;
 }
 this.V = [] ; // the array of vertices
 var i;
 if (nargs == 2) {
  this.n = arguments[1];
  for (i=0;i<this.n;i++) {
   this.V[i] = null; // will be specified later by the caller
  }
 }else {
  this.n = nargs-1; // number of vertices
  for (i=0;i<this.n;i++) {
   this.V[i] = arguments[i+1];
  }
 }
 this.elementClassName = "PolygonElement";
 this.parentClassName = "Element";
 
};
// PolygonElement extends Element
euclid.PolygonElement.prototype = Object.create(euclid.Element.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.PolygonElement,
      writable: true
    }
  });
euclid.PolygonElement.prototype.toString = function () {
 return "[" + this.name + ": n=" + this.n + "]";
};
euclid.PolygonElement.prototype.defined = function () {
    for (var i=0; i<this.n; ++i) 
      if (!this.V[i].defined()) return false;
    return true;
};

euclid.PolygonElement.prototype.drawName = function (d) { 
 // d is a Dimension . This code the same as in LineElement
 if ((this.nameColor!=null) && (this.name!=null) && this.defined()) { 
  // consult also drawString in Element.js
  var slate = this.slate;
  var p = slate.p; // Processingjs
  p.textSize(slate.slateFontsize);
  p.textFont(slate.slateFont);
  p.fill(this.nameColor);
  var name = this.name;
  var w = p.textWidth(name);
  var h = p.textAscent() + p.textDescent();
  var x=0; // compute as average of x-coords of vertices
  var y=0; // compute as average of y-coords of vertices
  var i;
  var n = this.n;
  var V = this.V;
  for(i=0;i<n;i++) {
   x = x + V[i].x;
   y = y + V[i].y;
  }
  x = x / n;
  y = y / n;
  p.text(name,x - (w/2), y - (h/2) + p.textAscent());
 }
};
euclid.PolygonElement.prototype.drawVertex = function() {
 if ((this.vertexColor != null) && this.defined()) {
  var i;
  for (i=0;i<this.n;i++) { // Note: Java has i=1 .  I think this is a bug.
   this.V[i].drawVertex(this.vertexColor); 
  }
 }
}
euclid.PolygonElement.prototype.drawEdge = function () {
 var dbg=false;
 if (dbg) {
  console.log('PolygonElement.drawEdge: this=\n',this);
 }
 var ok = ((this.edgeColor != null) && (this.defined()));
 //console.log('PolygonElement.drawEdge: ok=',ok);
 if (! ok) {return;}
 var i;
 var n = this.n;
 var V = this.V;
 var p = this.slate.p;
 var p1,p2;
 var c = this.edgeColor;
 //console.log('PolygonElement.drawedge. edgeColor = ',c);
 for(i=0;i<n;i++) {
  p1 = V[i];
  p2 = V[(i+1)%n];
  // Java draws the line from p1 to p2 using LineElement.drawEdge
  // However, since we need the slate (in particular, slate.p) to draw this in processingJS
  // we need to do this here, 
  p.stroke(c);
  p.line(p1.x,p1.y,p2.x,p2.y);
  //console.log('PolygonElement.drawedge.line:',p1.x,p1.y,p2.x,p2.y,", c=",c);
 }
};
euclid.PolygonElement.prototype.drawFace = function (faceColor) {
 // Java code has two signatures, one where faceColor is absent. We detect this in the Javascript way
 if (faceColor == undefined) {
  faceColor = this.faceColor;
 }
 var ok = (faceColor!=null  && this.defined());
 if (! ok) {return;}
 // unpack instance variables for more readable formulas
 var n = this.n;
 var V = this.V;
 var p = this.slate.p; // Processingjs
 // Java uses an awt graphics functions 'fillPolygon'.
 // p5js does this with a Shape.  ref http://cmuems.com/2015b/drawing-in-p5/
 var i;
 p.fill(faceColor);
 p.beginShape();
 for(i=0;i<n;i++) {
  p.vertex(V[i].x,V[i].y);
 }
 p.endShape(p.CLOSE);
};

euclid.PolygonElement.prototype.area = function () {
 // compute the area of this polygon (assuming it's planar & convex)
 var sum=0.0;
 var i;
 var n=this.n; 
 var V=this.V;
 var tempQ = new euclid.PointElement(this.slate); // for computing area
 for(i=0;i<n-2;i++) {
  //sum = sum + euclid.PointElement.area(V[0],V[i+1],V[i+2]);
  sum = sum + tempQ.area(V[0],V[i+1],V[i+2]);
 }
return sum;
};
/*
euclid.PolygonElement.prototype. = function () {
};
*/euclid.RegularPolygon = function(slate,A,B,Pval,nVal,d) {
  /*--------------------------------------------------------------------+
  | The regular polygon has n vertices in the plane P, with two, A and	|
  | B, being given. The variables cos and sin are the cosine and sine	|
  | of an internal angle.  Regular star polygons are given by the	|
  | second constructor with density d, that is, edges connect every	|
  | d-th vertex.							|
  +--------------------------------------------------------------------*/


/* Two constructors, all have slate parameter.
   First constructor: PointElements A,B; PlaneELement Pval; integer nVal (# of vertices)
   Second constructor: additional parameter 'd'
   In addition to the slate,n,V instance variables from PolygonElement, there 
   are instance variables cos, sin (of the internal angle), and P (the PlaneElement)
*/
 // Similar to super().  This establishes instance variables n,V, dimension (=2)
 euclid.PolygonElement.call(this,slate,nVal); 
 //this.dimension = 2;
 this.P = Pval;
 var theta;
 // This is where 'd' (if present) comes into play
 if (d == undefined) {
  // first constructor. regular polygon
  // in effect, d = 1.0
  theta = Math.PI * (this.n-2.0)/this.n;
 } else {
  // second constructor, regular star polygon
  theta = Math.PI * d*(this.n-2.0)/this.n;
 }
 this.cos = Math.cos(theta);
 this.sin = Math.sin(theta);
 this.V[0] = A; this.V[1] = B;
 var i;
 for (i=2; i<this.n; ++i) {
  this.V[i] = new euclid.PointElement(slate,this.P);
 }
 this.elementClassName = "RegularPolygon";
 this.parentClassName = "PolygonElement";
 
};
// RegularPolygon extends PolygonElement
euclid.RegularPolygon.prototype = Object.create(euclid.PolygonElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.RegularPolygon,
      writable: true
    }
  });
euclid.RegularPolygon.prototype.translate = function (dx,dy) {
 // dx,dy double
 var i;
 var n = this.n;
 var V = this.V;
 for (i=2; i<n; ++i){
   V[i].translate(dx,dy);
 }
};
euclid.RegularPolygon.prototype.rotate = function (pivot,c,s) {
 // pivot is a PointElement
 // c and s are numbers 
 var i;
 var n = this.n;
 var V = this.V;
 var P = this.P;
 for (i=2; i<n; ++i) {
   V[i].rotate(pivot,c,s,P);
 }
};
euclid.RegularPolygon.prototype.update = function () {
 var i;
 var n = this.n;
 var V = this.V;
 var P = this.P;
 var cos = this.cos; var sin = this.sin;
 for (i=2; i<n; ++i) {
  // the 'rotate' method here is defined in PointElement
   V[i].to(V[i-2]).rotate(V[i-1],cos,sin,P);
 }
};

/*
euclid.RegularPolygon.prototype. = function () {
};
*/euclid.Application = function(slate,Pval,A,B,Cval) {
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
*/euclid.PointElement = function(slate)  {
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

euclid.FixedPoint = function(slate,xVal,yVal,zVal)  {
 euclid.PointElement.call(this,slate,xVal,yVal,zVal); // Similar to super()
 this.initx = xVal; this.inity = yVal; this.initz = zVal; // for reset
 this.elementClassName = "FixedPoint";
 this.parentClassName = "PointElement";
};
// FixedPoint extends PointElement
euclid.FixedPoint.prototype = Object.create(euclid.PointElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.FixedPoint,
      writable: true
    }
  });
euclid.FixedPoint.prototype.reset = function () {
 this.x = this.initx;
 this.y = this.inity;
 this.z = this.initz;
};euclid.Midpoint = function(slate,Aval,Bval)  {
 // A and B are PointElements
 // Underlying coordinates of the Point involved (x,y,z) are computed by update
 // This initializes this point to the origin.
 euclid.PointElement.call(this,slate,0.0,0.0,0.0); // Similar to super()
 this.A = Aval; this.B = Bval;
 
 this.elementClassName = "Midpoint";
 this.parentClassName = "PointElement";
};
// Midpoint extends PointElement
euclid.Midpoint.prototype = Object.create(euclid.PointElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.Midpoint,
      writable: true
    }
  });
euclid.Midpoint.prototype.update = function () {
 this.x = (this.A.x + this.B.x) / 2.0;
 this.y = (this.A.y + this.B.y) / 2.0;
 this.z = (this.A.z + this.B.z) / 2.0;
};euclid.Intersection = function(slate,Aval,Bval,Cval,Dval,APval)  {
 // this point is the intersection of lines AB and CD in the ambient plane AP
 // Underlying coordinates of the Point involved (x,y,z) are computed by update
 // This initializes this point to the origin.
 euclid.PointElement.call(this,slate,0.0,0.0,0.0); // Similar to super()
 this.A = Aval; this.B = Bval;
 this.C = Cval; this.D = Dval;
 this.AP = APval;
 this.elementClassName = "Intersection";
 this.parentClassName = "PointElement";
};
// Intersection extends PointElement
euclid.Intersection.prototype = Object.create(euclid.PointElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.Intersection,
      writable: true
    }
  });
euclid.Intersection.prototype.update = function () {
 this.toIntersection(this.A,this.B,this.C,this.D,this.AP);
};euclid.CircleSlider = function(slate,Cval,xVal,yVal,zVal) {
 // Cval is a CircleElement
 // xVal,yVal,zVal are double
 euclid.PointElement.call(this,slate,xVal,yVal,zVal); 
 this.initx = xVal; this.inity = yVal; this.initz = zVal; // for reset
 this.elementClassName = "CircleSlider";
 this.parentClassName = "PointElement";
 this.C = Cval;
 this.dimension = 0;
 this.dragable = true;
 this.newP = new euclid.PointElement(slate);
}
//CircleSlider extends PointElement
euclid.CircleSlider.prototype = Object.create(euclid.PointElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.CircleSlider,
      writable: true
    }
  });
euclid.CircleSlider.prototype.reset = function () {
 this.x = this.initx;
 this.y = this.inity;
 this.z = this.initz;
 this.toCircle(this.C);
};
euclid.CircleSlider.prototype.update = function () {
 this.toCircle(this.C);
};
euclid.CircleSlider.prototype.drag = function (tox,toy) {
 this.x = tox; 
 this.y = toy;
 if (!this.defined()) {this.z = initz;}
 var newP = this.newP; var C = this.C;
 newP.to(this).uptoPlane(C.AP);
 if (!newP.defined()) {	// vertical plane
   newP.to(this).toPlane(C.AP);
 }
 newP.toSphere(C.Center,C.radius());
 if ((newP.x-this.x)*(newP.x-this.x) + (newP.y-this.y)*(newP.y-this.y) < 0.5){
   return false;
 }
 this.to(newP);
 return true;
};
/*
euclid.CircleSlider.prototype. = function () {
};
*/
euclid.Layoff = function(slate,Aval,Cval,Dval,Eval,Fval) {
 // Lay off a line AB with endpoint A given, so that AB is parallel to CD
 // and equal to EF.  (this is B)

 // Cval is a CircleElement
 // xVal,yVal,zVal are double
 euclid.PointElement.call(this,slate); // 'B' == this point
 this.elementClassName = "Layoff";
 this.parentClassName = "PointElement";
 this.A = Aval;
 this.C = Cval;
 this.D = Dval;
 this.E = Eval;
 this.F = Fval;
 this.dimension = 0;
 if ((this.A.AP == this.C.AP) && (this.A.AP == this.D.AP)) {
  this.AP = this.A.AP;
 }
}
//Layoff extends PointElement
euclid.Layoff.prototype = Object.create(euclid.PointElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.Layoff,
      writable: true
    }
  });
euclid.Layoff.prototype.update = function () {
 var A = this.A; var C = this.C; var D = this.D;
 var E = this.E; var F = this.F;
 var factor = E.distance(F) / C.distance(D);
 this.to(D).minus(C);
 this.times(factor).plus(A);
};

/*
euclid.Layoff.prototype. = function () {
};
*/
euclid.AngleDivider = function(slate,Bval, Aval, Cval,APval,nVal)  { 
 /* n-sect angle BAC in the ambient plane AP .
  The ambient plane and coordinates of 'this' point are instance variables.
  The point coordinates are calculated via update method.
  The instance variables of AngleDivider and A,B,C and the number of variables.
  The ambient plane comes in via the constructor.
 */
 euclid.PointElement.call(this,slate); // Similar to super()
 this.B = Bval; this.A = Aval; this.C = Cval;
 this.AP = APval; this.n = nVal;
 this.dimension = 0;
 this.elementClassName = "AngleDivider";
 this.parentClassName = "PointElement";
};
// AngleDivider extends PointElement
euclid.AngleDivider.prototype = Object.create(euclid.PointElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.AngleDivider,
      writable: true
    }
  });
euclid.AngleDivider.prototype.update = function () {
 var A = this.A; var B = this.B; var C = this.C;
 var n = this.n; var AP = this.AP;
 var theta = A.angle(B,C,AP)/n;
 var cos = Math.cos(theta);
 var sin = Math.sin(theta);
 if (AP.isScreen) {
   this.x = A.x + cos*(B.x-A.x) - sin*(B.y-A.y);
   this.y = A.y + sin*(B.x-A.x) + cos*(B.y-A.y);
   this.z = 0.0;
 } else { // 3D case
   this.to(B).rotate(A,cos,sin,AP);
 }
 this.toIntersection(this,A,B,C,AP);
};euclid.Proportion = function(slate,S0,S1,T0,T1,U0,U1,V0,V1)  {
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

};euclid.Foot = function(slate,Aval,Bval,Cval)  {
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
};euclid.Similar = function(slate,Aval,Bval,APval, Dval,Eval,Fval,Qval)  {
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
};  /*--------------------------------------------------------------------+
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
 };euclid.PlaneSlider = function(slate,Qval,xVal,yVal,zVal) {
 euclid.PointElement.call(this,slate,xVal,yVal,zVal); // Similar to super()
 this.initx = xVal; this.inity = yVal; this.initz = zVal; // for reset
 this.AP = Qval;
 this.elementClassName = "PlaneSlider";
 this.parentClassName = "PointElement";
 this.dimension = 0;
 this.dragable=true;
 // In Clark, this variable is defined outside of constructor and outside
 // of all methods. 
 this.newP = new euclid.PointElement(slate);
}
//PlaneSlider extends PointElement
euclid.PlaneSlider.prototype = Object.create(euclid.PointElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.PlaneSlider,
      writable: true
    }
  });
euclid.PlaneSlider.prototype.update = function() {
 this.toPlane(this.AP);
};
euclid.PlaneSlider.prototype.reset = function() {
 this.x = this.initx;
 this.y = this.inity;
 this.z = this.initz;
 this.toPlane(this.AP);
};
euclid.PlaneSlider.prototype.drag = function(tox,toy) {
 // tox,toy are double
 this.x = tox; 
 this.y = toy;
 if (!this.defined()) this.z = this.initz;
 this.newP.to(this).uptoPlane(this.AP);
 if (this.newP.defined())
   this.to(this.newP);
 else 
   this.toPlane(this.AP);
 return true;
};
euclid.LineSlider = function(slate,Aval,Bval,xVal,yVal,zVal,segVal) {
 // segval is Boolean. Aval,Bval are PointElement
 euclid.PointElement.call(this,slate,xVal,yVal,zVal); 
 this.initx = xVal; this.inity = yVal; this.initz = zVal; // for reset
 this.elementClassName = "LineSlider";
 this.parentClassName = "PointElement";
 this.A = Aval;
 this.B = Bval;
 this.segment = segVal;
 this.dimension = 0;
 this.dragable = true;
 if (this.A.AP == this.B.AP) {
  this.AP = this.A.AP;
 }
}
//LineSlider extends PointElement
euclid.LineSlider.prototype = Object.create(euclid.PointElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.LineSlider,
      writable: true
    }
  });
euclid.LineSlider.prototype.reset = function () {
 this.x = this.initx;
 this.y = this.inity;
 this.z = this.initz;
 this.toLine(this.A,this.B,this.segment);
};
euclid.LineSlider.prototype.update = function () {
 this.toLine(this.A,this.B,this.segment);
};
euclid.LineSlider.prototype.drag = function (tox,toy) {
 // first move (tox,toy) under the shadow of the line
 tox -= this.A.x; toy -= this.A.y;
 var dx = this.B.x - this.A.x,  dy = this.B.y - this.A.y;
 var factor = (tox*dx + toy*dy)/(dx*dx + dy*dy);
 if (this.segment) {
   if (factor < 0.0) factor = 0.0;
   else if (factor > 1.0) factor = 1.0;
 }
 tox = this.A.x + dx*factor;  
 toy = this.A.y + dy*factor;
 if ((tox-this.x)*(tox-this.x) + (tox-this.y)*(tox-this.y) < 0.5) return false;
 // now drag this point
 this.x = tox; 
 this.y = toy;
 this.z = this.A.z + (this.B.z-this.A.z)*factor;
 return true;
};
/*
euclid.LineSlider.prototype. = function () {
};
*/
euclid.LineElement = function(slate,Aval,Bval)  {
/* Two constructors, one is empty
*/
 euclid.Element.call(this,slate); // Similar to super()
 this.A = Aval; 
 this.B = Bval; 
 this.dimension = 1;
 this.elementClassName = "LineElement";
 this.parentClassName = "Element";
};
// LineElement extends Element
euclid.LineElement.prototype = Object.create(euclid.Element.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.LineElement,
      writable: true
    }
  });
euclid.LineElement.prototype.toString = function () {
 return "[" + this.name + ": " + this.A + " " + this.B + "]";
};
euclid.LineElement.prototype.defined = function () {
 return this.A.defined() && this.B.defined();
};
euclid.LineElement.prototype.drawName = function (d) {
 // d is a Dimension
 if (/*nameColor!=null && */ this.name!=null && this.defined()) {
  var ix = Math.round((this.A.x+this.B.x)/2.0);
  var iy = Math.round((this.A.y+this.B.y)/2.0);
  this.drawString(ix,iy, d);
 }
};
euclid.LineElement.prototype.drawVertex = function () {
 if (/*vertexColor != null && */ this.defined()) { 
  this.A.drawVertex(this.vertexColor);
  this.B.drawVertex(this.vertexColor);
 }
};
euclid.LineElement.prototype.drawEdge = function (A,B,c) {
 // Java has two signatures, the second has no parms, and uses
 // instance variables for A,B,c
 // When Javascript is called with no parameters, the values of A,B,c 
 // in the parameter list here are undefined. 
 if (!A) {
  A = this.A;
  B = this.B;
  c = this.edgeColor;
 }
 var dbg=false; 
 if (dbg) {
  //console.log("LineElement.drawEdge: A=",A,"\nB=",B,"\nc=",c,"\nthis=",this);
 }
 if ((c != null) && A.defined() && B.defined()) {
  this.p.stroke(c);
  this.p.line(Math.round(A.x), Math.round(A.y),
             Math.round(B.x), Math.round(B.y));
  }
};
/*
euclid.LineElement.prototype. = function () {
};
*/euclid.Perpendicular = function(slate,Cval,Dval,Pval,Eval,Fval) {
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

euclid.Bichord = function(slate,Cval,Dval) {
  /*--------------------------------------------------------------------+
  | This line AB connects the two points where the two circles C and D	|
  | meet. It is assumed that the two circles lie in the same plane, the	|
  | plane of C.								|
  +--------------------------------------------------------------------*/
  // instance variables C,D (CircleElements)
  // A,B PointElements 
  euclid.LineElement.call(this,slate,null,null);
  this.dimension = 1;
  this.C = Cval;
  this.D = Dval;
  var Pval = Cval.AP;  // the ambient plane
  var dbg=false;
  this.A = new euclid.PointElement(slate,Pval);
  this.B = new euclid.PointElement(slate,Pval);
  this.elementClassName = "Bichord";
  this.parentClassName = "LineElement";
  //console.log("Bichord constructor:A=",this.A,"\nB=",this.B);
};
// Bichord extends LineElement
euclid.Bichord.prototype = Object.create(euclid.LineElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.Bichord,
      writable: true
    }
});
euclid.Bichord.prototype.translate = function(dx,dy) {
 // dx, dy are double
 this.A.translate(dx,dy);
 this.B.translate(dx,dy);
};
euclid.Bichord.prototype.rotate = function(pivot,ac,as) {
 // pivot is PointElement
 // ac, as are double
 this.A.rotate(pivot,ac,as);
 this.B.rotate(pivot,ac,as);
};
euclid.Bichord.prototype.update = function() {
 // predefine local variables to instance variables.
 // This is so the translation from Java to JS is easier.
 var dbg=false;
 var A = this.A; 
 var B = this.B;
 var C = this.C;
 var D = this.D; 
 var F = this.F;
 var r = C.radius();
 var s = D.radius();
 var d = C.Center.distance(D.Center);
 if (d > r + s) {
  // Not sure, but I think 0.0/0.0 yields NaN in both Java and Javascript
  // Also the syntax 'a=b=c' is acceptable with same semantics in both languages.
   A.x = A.y = B.x = B.y = A.z = B.z = 0.0/0.0;
   return;
 }
 var costheta = (d*d + r*r - s*s) / (2.0 * d * r);
 var sintheta = Math.sqrt(1.0-costheta*costheta);
 A.to(D.Center).toCircle(C);
 B.to(A);
 A.rotate(C.Center,costheta,sintheta,C.AP);
 B.rotate(C.Center,costheta,-sintheta,C.AP);
};

euclid.Chord = function(slate,Dval,Eval,Cval) {
  /*--------------------------------------------------------------------+
  | This line AB is the segment of the line DE (extended) that		|
  | interects the circle C.  It is assumed that DE and C lie in the	|
  | same plane, namely that of C.					|
  +--------------------------------------------------------------------*/
  // instance variables C (CircleElement)
  // D,E PointElements 
  // A,B PointELements (in LineElement parent)
  euclid.LineElement.call(this,slate,null,null);
  this.dimension = 1;
  this.C = Cval;
  this.D = Dval;
  this.E = Eval;
  var Pval = Cval.AP;  // the ambient plane
  var dbg=false;
  this.A = new euclid.PointElement(slate,Pval);
  this.B = new euclid.PointElement(slate,Pval);
  this.elementClassName = "Chord";
  this.parentClassName = "LineElement";
};
// Chord extends LineElement
euclid.Chord.prototype = Object.create(euclid.LineElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.Chord,
      writable: true
    }
});
euclid.Chord.prototype.translate = function(dx,dy) {
 // dx, dy are double
 this.A.translate(dx,dy);
 this.B.translate(dx,dy);
};
euclid.Chord.prototype.rotate = function(pivot,ac,as) {
 // pivot is PointElement
 // ac, as are double
 this.A.rotate(pivot,ac,as);
 this.B.rotate(pivot,ac,as);
};
euclid.Chord.prototype.update = function() {
 // predefine local variables to instance variables.
 // This is so the translation from Java to JS is easier.
 var dbg=false;
 var A = this.A; 
 var B = this.B;
 var C = this.C;
 var D = this.D; 
 var E = this.E; 
 var F = this.F;
 B.to(C.Center).toLine(D,E,false);
 var d2 = C.Center.distance2(B);
 var r2 = C.radius2();
 if (d2 > r2) {
   A.x = A.y = A.z = B.x = B.y = B.z = 0.0/0.0; // NaN
   return;
 }
 var s = Math.sqrt(r2 - d2);
 var factor = s/D.distance(B);
 if (factor < 1e10)
   A.to(D).minus(B).times(factor).plus(B);
 else {
   factor = s/E.distance(B);
   A.to(E).minus(B).times(factor).plus(B);
 }
 B.times(2.0).minus(A);
};

euclid.dbg={};
euclid.dbg.elements=null;
euclid.dbg.slate = null;
euclid.Slate = function(n,geometry) {
 this.geometry = geometry;
 this.p = geometry.p;  // The Processing js object
 if (n < 15) {n = 15;}
 this.n = n;
 // set some local instance variables for later use
 this.element = Array(this.n); // Array of n undefined values
 // for debugging 
 euclid.dbg.elements = this.element;
 euclid.dbg.slate = this;
 this.preexists = Array(this.n); // Ditto. if (undefined) is like if (false)
 this.picki = -1;
 this.pick = new euclid.PointElement(this); // this is a Slate instance
 this.screen = null; // PlaneElement
 this.slateFont = null; // a processing PFont object (?)
 this.slateFontname = null;
 this.slateFontsize = null;
 this.slateBackground = this.p.color(255,255,255); // Processing color white
 // Now, go through the constructor steps.
 // set up the screen plane
 this.element[0] = new euclid.FixedPoint(this,0.0,0.0,0.0);
 this.origin = this.element[0];
 this.element[0].name = "screenorigin";
 this.element[1] = new euclid.FixedPoint(this,1.0,0.0,0.0);
 this.element[1].name = "screenx";
 this.element[2] = new euclid.FixedPoint(this,0.0,1.0,0.0);
 this.element[2].name = "screeny";
 this.screen = new euclid.PlaneElement(this,this.element[0],this.element[1],this.element[2]);
 this.screen.name = "screen";
 this.screen.isScreen = true;
 this.element[3] = this.screen;
 this.eCount = 4;
}
euclid.Slate.prototype.setFont = function(fontname,italicetc,fontsize) {
    // This is done in Clark's work by a Canvas method , since Slate extends Canvas.
    // Here, we use a Processing method.
    // Not sure how to set middle parameter in Processing. it is constant Font.ITALIC in Clark.
    //console.log("Slate: setFont",fontname,fontsize);
    if (italicetc == null) {}  // so processing won't complain that variable is unused
    this.slateFontname = fontname;
    this.slateFontsize = fontsize;
    //console.log("Slate.setFont may be incomplete");
    /* start here: get a null pointer exception */
    //theFont = createFont(fontname,fontsize,true); // last parm sets anti-aliasing on, whatever that is.
};
euclid.Slate.prototype.setBackground = function(c) {
 this.slateBackground = c; 
 //console.log("Slate.setBackground=",c);
};
euclid.Slate.prototype.getBackground = function () {
 // called once in Geometry
 return this.slateBackground;
};
euclid.Slate.prototype.lookupElement = function (name) {
 for (var i=0;i<this.eCount;i++) {
  if (name == this.element[i].name) {
   return this.element[i]
  }
 }
 return null; // search failed
};
euclid.Slate.elementClassName = // static
 ["point", "line", "circle", "polygon", "sector", "plane", 
  "sphere", "polyhedron"];
euclid.Slate.prototype.lookupElementClass = function(s) {
    for (var i=0; i<euclid.Slate.elementClassName.length; ++i)
      if (euclid.Slate.elementClassName[i] == s) return i;
    return -1;
};
euclid.Slate.constructionName = // Static array
[ [ // constructions for points
   "free",      "midpoint",    "intersection",  
   "first",    "last",      "center",
   "lineSlider",    "circleSlider",    "circumcenter",
   "vertex",    "foot",      "cutoff",
   "extend",    "parallelogram",  "similar",
   "perpendicular",  "proportion",    "invert",
   "meanProportional",  "planeSlider",    "sphereSlider",
   "angleBisector",  "angleDivider",    "fixed",
   "lineSegmentSlider",  "harmonic"],
  [ // constructions for lines
   "connect",    "angleBisector",  "angleDivider",
   "foot",      "chord",    "bichord",
   "perpendicular",  "cutoff",    "extend",
   "parallel",    "similar",    "proportion",
   "meanProportional"],
  [ // constructions for circles
   "radius",    "circumcircle",    "invert",
   "intersection"],
  [ // constructions for polygons
   "square",     "triangle",     "quadrilateral",
   "pentagon",    "hexagon",    "equilateralTriangle",
   "parallelogram",  "regularPolygon",  "starPolygon",
   "similar",    "application",    "octagon",
   "face"],
  [ // constructions for sectors
   "sector",    "arc"],
  [ // constructions for planes
   "3points",    "perpendicular",  "parallel",
   "ambient"],
  [ // construction for spheres
   "radius"],
  [  // constructions for polyhedra
   "tetrahedron",    "parallelepiped",  "prism",
   "pyramid"]
];
euclid.Slate.prototype.lookupConstructionMethod = function(eClass,s) {
    for (var i=0; i<euclid.Slate.constructionName[eClass].length; ++i) {
      if (euclid.Slate.constructionName[eClass][i] == s) {return i;}
    }
    return -1; // no match
}
euclid.Slate.constructionDataType = // Static
[ [ // point constructions
  [ // 1. free point construction
    ["Integer","Integer"] ],  
  [ // 2. midpoint construction
    ["PointElement","PointElement"] ],
  [ // 3. intersection constructions
    ["PointElement","PointElement","PointElement","PointElement"],
    ["PointElement","PointElement","PointElement","PointElement",
     "PlaneElement"],
    ["PlaneElement","PointElement","PointElement"] ],
  [ // 4. first point of a line
    ["PointElement", "PointElement"] ],
  [ // 5. last point of a line
    ["PointElement", "PointElement"] ],
  [ // 6. center of a circle or sphere
    ["CircleElement"],  
    ["SphereElement"] ],  
  [ // 7. point sliding along a line
    ["PointElement","PointElement","Integer","Integer"],
    ["PointElement","PointElement","Integer","Integer","Integer"] ],
  [ // 8. point sliding along a circle
    ["CircleElement","Integer","Integer"],
    ["CircleElement","Integer","Integer","Integer"] ],
  [ // 9. circumcenter
    ["PointElement","PointElement","PointElement"],
    ["PointElement","PointElement","PointElement","PlaneElement"] ],
  [ // 10. vertex of a polygon
    ["PolygonElement","Integer"] ],
  [ // 11. foot constructions
    ["PointElement","PointElement","PointElement"],
    ["PointElement","PlaneElement"] ], // plane projection
  [ // 12. cutoff construction
    ["PointElement","PointElement","PointElement","PointElement"] ],
  [ // 13. extend construction
    ["PointElement","PointElement","PointElement","PointElement"] ],
  [ // 14. parallelogram construction
    ["PointElement","PointElement","PointElement"] ],
  [ // 15. similar triangle constructions
    ["PointElement","PointElement","PointElement",
    "PointElement","PointElement"],
    ["PointElement","PointElement","PlaneElement","PointElement",
    "PointElement","PointElement","PlaneElement"] ],
  [ // 16. perpendicular constructions
    ["PointElement","PointElement"],
    ["PointElement","PointElement","PlaneElement"],
    ["PointElement","PointElement","PointElement","PointElement"],
    ["PointElement","PointElement","PlaneElement","PointElement",
     "PlaneElement"],
    ["PointElement","PlaneElement","PointElement","PointElement"] ],
  [ // 17. proportion construction
    ["PointElement","PointElement","PointElement","PointElement",
     "PointElement","PointElement","PointElement","PointElement"] ],
  [ // 18. invert in a circle
    ["PointElement","CircleElement"] ],
  [ // 19. meanProportional construction
    ["PointElement","PointElement","PointElement","PointElement",
     "PointElement","PointElement"] ],
  [ // 20. point sliding along a plane
    ["PlaneElement","Integer","Integer","Integer"] ],
  [ // 21. point sliding on a sphere
    ["SphereElement","Integer","Integer","Integer"] ],
   [ // 22. angle bisector construction
    ["PointElement","PointElement","PointElement"],
    ["PointElement","PointElement","PointElement","PlaneElement"] ], 
  [ // 23. angle divider construction
    ["PointElement","PointElement","PointElement","Integer"],
    ["PointElement","PointElement","PointElement","PlaneElement",
     "Integer"] ], 
  [ // 24. fixed point  
    ["Integer","Integer"],
    ["Integer","Integer","Integer"] ],
  [ // 25. point sliding along a line segment
    ["PointElement","PointElement","Integer","Integer"],
    ["PointElement","PointElement","Integer","Integer","Integer"] ],
  [ // 26. fourth harmonic
    ["PointElement","PointElement","PointElement"] ],
     ],

      [ // line constructions
  [ // connect two points
    ["PointElement","PointElement"] ],  
   [ // angle bisector construction
    ["PointElement","PointElement","PointElement"],
    ["PointElement","PointElement","PointElement","PlaneElement"]], 
  [ // angle divider construction
    ["PointElement","PointElement","PointElement","Integer"],
    ["PointElement","PointElement","PointElement","PlaneElement",
     "Integer"] ], 
  [ // foot constructions
    ["PointElement","PointElement","PointElement"],
    ["PointElement","PlaneElement"] ], // plane projection
  [ // chord construction
    ["PointElement","PointElement","CircleElement"] ],
  [ // bichord construction
    ["CircleElement","CircleElement"] ],
  [ // perpendicular constructions
    ["PointElement","PointElement"],
    ["PointElement","PointElement","PlaneElement"],
    ["PointElement","PointElement","PointElement","PointElement"],
    ["PointElement","PointElement","PlaneElement","PointElement",
     "PlaneElement"],
    ["PointElement","PlaneElement","PointElement","PointElement"] ],
  [ // cutoff construction
    ["PointElement","PointElement","PointElement","PointElement"] ],
  [ // extend construction
    ["PointElement","PointElement","PointElement","PointElement"] ],
  [ // parallel construction
    ["PointElement","PointElement","PointElement"] ],
  [ // similar triangle (angle) constructions
    ["PointElement","PointElement","PointElement",
    "PointElement","PointElement"],
    ["PointElement","PointElement","PlaneElement","PointElement",
    "PointElement","PointElement","PlaneElement"] ],
  [ // proportion construction
    ["PointElement","PointElement","PointElement","PointElement",
     "PointElement","PointElement","PointElement","PointElement"] ],
  [ // meanProportional construction
    ["PointElement","PointElement","PointElement","PointElement",
     "PointElement","PointElement"] ],
      ],

      [ // circle constructions
  [ // center and radius constructions
    ["PointElement","PointElement"],
    ["PointElement","PointElement","PointElement"],
    ["PointElement","PointElement","PlaneElement"],
    ["PointElement","PointElement","PointElement","PlaneElement"] ],
  [ // circumcircle construction
    ["PointElement","PointElement","PointElement"],
    ["PointElement","PointElement","PointElement","PlaneElement"] ],
  [ // invert in another circle
    ["CircleElement","CircleElement"] ],
  [ // intersection construction
    ["SphereElement","SphereElement"] ],
      ],

      [ // polygon constructions
  [ // square constructions
    ["PointElement","PointElement"],
    ["PointElement","PointElement","PlaneElement"] ],
  [ // triangle construction
    ["PointElement","PointElement","PointElement"] ],
  [ // quadrilateral construction
    ["PointElement","PointElement","PointElement","PointElement"] ],
  [ // pentagon construction
    ["PointElement","PointElement","PointElement",
     "PointElement","PointElement"] ],
  [ // hexagon construction
    ["PointElement","PointElement","PointElement",
     "PointElement","PointElement","PointElement"] ],
  [ // equilateral triangle constructions
    ["PointElement","PointElement"],
    ["PointElement","PointElement","PlaneElement"] ],
  [ // parallelogram construction
    ["PointElement","PointElement","PointElement"] ],
  [ // regular polygon constructions
    ["PointElement","PointElement","Integer"],
    ["PointElement","PointElement","PlaneElement","Integer"] ],
  [ // star polygon constructions
    ["PointElement","PointElement","Integer","Integer"],
    ["PointElement","PointElement","PlaneElement","Integer","Integer"] ],
  [ // similar triangle constructions
    ["PointElement","PointElement","PointElement",
    "PointElement","PointElement"],
    ["PointElement","PointElement","PlaneElement","PointElement",
    "PointElement","PointElement","PlaneElement"] ],
  [ // application
    ["PolygonElement","PointElement","PointElement","PointElement"] ],
  [ // octagon construction
    ["PointElement","PointElement","PointElement","PointElement",
     "PointElement","PointElement","PointElement","PointElement"] ],
  [ // face of a polyhedron
    ["PolyhedronElement","Integer"] ],
      ],

      [ // sector constructions
  [ // center and arc construction
    ["PointElement","PointElement","PointElement"],
           ["PointElement","PointElement","PointElement","PlaneElement"] ],
  [ // arc construction
    ["PointElement","PointElement","PointElement"],
    ["PointElement","PointElement","PointElement","PlaneElement"] ],
      ],
      
      [ // plane constructions
  [ // 3points construction
    ["PointElement","PointElement","PointElement"] ],
  [ // perpendicular construction
    ["PointElement","PointElement"] ],
  [ // parallel construction
    ["PlaneElement","PointElement"] ],
  [ // ambient planes
    ["PointElement"],
    ["CircleElement"] ],
      ],        

      [ // sphere constructions
  [ // radius constructions
    ["PointElement","PointElement"],
    ["PointElement","PointElement","PointElement"] ],
      ],        

      [ // polyhedron constructions
  [ // tetrahedorn construction
    ["PointElement","PointElement","PointElement","PointElement"] ],
  [ // parallelepiped construction
    ["PointElement","PointElement","PointElement","PointElement"] ],
  [ // prism construction
    ["PolygonElement","PointElement","PointElement"] ],
  [ // pyramid construction
    ["PolygonElement","PointElement"] ],
    ] 
];
euclid.Slate.prototype.selectDataChoice = function(data,datachoices,p,e,n,message) {
 // data is a string, datachoices is array of array of strings,
 // p is a PointElement array, e is an Element array, n is an int array,
 // message is a StringBuffer
 /* parse the data string to look for a type match among the
    various datachoices.  Store the resulting elements in the
     e array and the resulting integers in the n array.
 */
 var t = new euclid.StringTokenizer(data,",");
 var pcount=0; 
 var ecount = 0; // confusing use of 'ecount', when 'eCount' is instance var.
 var ncount = 0;
 while (t.hasMoreTokens()) {
  var next = t.nextToken();
  // Allow negative integers
  if (/^-?\d+$/.test(next)) { // test if 'next' is a string of digits
   n[ncount] = parseInt(next);
   ncount = ncount + 1;
  } else { // it should be an element
   var elt = this.lookupElement(next); 
   if (elt == null) { // selectDataChoice fails (returns -1)
    message.append("Data element "+next+" not found. ");
    return -1;
   }
   if (elt.inClass("PointElement")) {
    // Java, Javascript syntax. p[pcount++]=Z does two assignments, in effect.
    // p[pcount]=Z and pcount = pcount+1
    p[pcount++] = elt;
   }else if (elt.inClass("LineElement")) { // split into two points
    p[pcount++] = elt.A;
    p[pcount++] = elt.B;
   } else {
    e[ecount++] = elt;
    message.append("element named " + next + " is not a PointElement or a LineElement\n");
   }
  }
 }// while
 // now determine which choice is right
 var i,j;
 for (i=0;i<datachoices.length;++i) { // try the i'th choice
  if (datachoices[i].length != pcount+ncount+ecount) {continue;}
  var ps=0;
  var es=0;
  var ns=0;
  for (j=0; j<datachoices[i].length; ++j) {
   if (datachoices[i][j] == "Integer") {
    if (ns>= ncount) {break;}
    else {ns++;}
   } else if (datachoices[i][j] == "PointElement") {
    if (ps>= pcount) {break;}
    else {ps++;}
   } else {
    // it's some kind of Element
    if (es >= ecount) {break;}
    else if (! e[es].inClass(datachoices[i][j])) {break;}
    else {es++;}
   }
  } // end of j loop
  if (j == datachoices[i].length) {break;}
 } // end of i loop
 if (i == datachoices.length) {
  message.append("Data does not fit construction method. ");
  return -1;
 }else {
  return i;
 } 
};

euclid.Slate.prototype.createElement = function(c, m, choice, P, E, N) {
 // c,m, and choice are integers
 // P is a PointElement array, E is Element array, N is an integer array
 var dbg=false;
 if (dbg) {
  console.log("Slate.createElement. c=",c,", m=",m,", choice=",choice);
 }
 var errstring = "Slate.createElement(" + c + "," + m + "," + choice + /*"," + P + "," + E +*/ ") NOT IMPLEMENTED";
 // A huge double switch statment, on c, then on m
 switch (c){
  case 0:  // point constructions
   switch (m) {
    case 0:  // free point construction (slide on screen)
      this.element[this.eCount] = new euclid.PlaneSlider(this,this.screen,N[0],N[1],0.0);
      return;
    
    case 1:  // midpoint constructions
      this.element[this.eCount] = new euclid.Midpoint(this,P[0],P[1]);
      return;
    case 2:  // intersection constructions
      switch (choice) {
        case 0:
          this.element[this.eCount] = new euclid.Intersection(this,P[0],P[1],P[2],P[3],this.screen);
          break;
        case 1:
          this.element[this.eCount] = new euclid.Intersection(this,P[0],P[1],P[2],P[3],E[0]);
          break;
        case 2:
          this.element[this.eCount] = new euclid.IntersectionPL(this,E[0],P[0],P[1]);
          break;
      }
      return;
      
    case 3:  // first point of a line
      this.element[this.eCount] = P[0];
      //console.log('Slate: first point: = ',P[0]);
      this.preexists[this.eCount] = true;
      return;
    case 4:  // last point of a line
      this.element[this.eCount] = P[1];
      this.preexists[this.eCount] = true;
      return;
    
    case 5:  // center of a circle or sphere
      if (choice == 0) {
        // E[0] is CircleElement
        this.element[this.eCount] = (E[0]).Center;
      }else{
        // E[0] is SphereElement
        this.element[this.eCount] = (E[0]).Center;
      }
      this.preexists[this.eCount] = true;
      return;
    
    case 6:  // point sliding along a line
      if (choice == 0) {N[2] = 0;}
      this.element[this.eCount] = new euclid.LineSlider(this,P[0],P[1],N[0],N[1],N[2],false);
      return;
    
    case 7:  // point sliding along a circle
      if (choice == 0) {N[2] = 0;}
      // E[0] is CircleElement
      this.element[this.eCount] = new euclid.CircleSlider(this,E[0],N[0],N[1],N[2]);
      return;
    
    case 8:  // circumcenter given three points
      if (choice == 0) {E[0] = this.screen;}
      // E[0] is PlaneElement
      var circ = new euclid.Circumcircle(this,P[0],P[1],P[2],E[0]);
      this.element[this.eCount++] = circ;
      this.element[this.eCount] = circ.Center;
      this.preexists[this.eCount] = true;
      return;
    case 9:  // vertex of a polygon
      // E[0] is PolygonElement
      //console.log('Slate. vertex of polygon=',(E[0]).V[N[0]-1].toString());
      //console.log('Slate. vertex of polygon. E[0]=',E[0],"\n,N[0]=",N[0]);
      this.element[this.eCount] = (E[0]).V[N[0]-1];
      this.preexists[this.eCount] = true;
      return;
    case 10:  // foot constructions
      if (choice == 0){
        this.element[this.eCount] = new euclid.Foot(this,P[0],P[1],P[2]);
      }else{
      // E[0] is PlaneElement
        this.element[this.eCount] = new euclid.PlaneFoot(this,P[0],E[0]);
      }
      return;
    case 11:  // cutoff construction
      this.element[this.eCount] = new euclid.Layoff(this,P[0],P[0],P[1],P[2],P[3]);
      return;
    case 12:  // extend construction
      this.element[this.eCount] = new euclid.Layoff(this,P[1],P[0],P[1],P[2],P[3]);
      return;
    case 13:  // parallelogram construction
      this.element[this.eCount] = new euclid.Layoff(this,P[0],P[1],P[2],P[1],P[2]);
      return;
    case 14:  // similar triangle constructions
      if (choice == 0) {E[0] = this.screen; E[1] = this.screen;}
      this.element[this.eCount] = new euclid.Similar(this,P[0],P[1],E[0],P[2],P[3],P[4],E[1]);
      return;
    
    case 15:  // perpendicular constructions
      //console.log("Slate: case 15, choice=",choice);
      if (choice == 0){
        this.element[this.eCount] = new euclid.Perpendicular(this,P[0],P[1],this.screen,P[0],P[1]);
        //console.log('Slate: perpendicular element=',this.element[this.eCount], 'P[1]=',P[1]);
      }else if (choice == 1) {
        this.element[this.eCount] = new euclid.Perpendicular(this,P[0],P[1],E[0],P[0],P[1]);
      }else if (choice == 2) {
        this.element[this.eCount] = new euclid.Perpendicular(this,P[0],P[1],this.screen,P[2],P[3]);
      }else if (choice == 3){
        this.element[this.eCount] = new euclid.Perpendicular(this,P[0],P[1],E[0],P[2],P[3]);
      }else{
        this.element[this.eCount] = new PlanePerpendicular(this,P[0],E[0],P[1],P[2]);
      }
      this.element[this.eCount+1] = (this.element[this.eCount]).B;
      this.preexists[++this.eCount] = true;
      return;
    
    case 16:  // proportion construction
      this.element[this.eCount] = new euclid.Proportion(this,P[0],P[1],P[2],P[3],P[4],P[5],P[6],P[7]);
      return;
    case 17:  // invert in a circle
      this.element[this.eCount] = new euclid.InvertPoint(this,P[0],E[0]);
      return;
    case 18:  // meanProportional construction
      this.element[this.eCount] = new euclid.MeanProportional(this,P[0],P[1],P[2],P[3],P[4],P[5]);
      return;
    case 19:  // planeSlider construction
      this.element[this.eCount] = new euclid.PlaneSlider(this,E[0],N[0],N[1],N[2]);
      return;
    case 20:  // sphereSlider construction
      this.element[this.eCount] = new euclid.SphereSlider(this,E[0],N[0],N[1],N[2]);
      return;
    case 21:  // angle bisector construction
      if (choice == 0) {E[0] = this.screen;}
      this.element[this.eCount] = new euclid.AngleDivider(this,P[0],P[1],P[2],E[0],2);
      return;
    case 22:  // angle divider construction
      if (choice == 0) {E[0] = this.screen;}
      this.element[this.eCount] = new AngleDivider(P[0],P[1],P[2],E[0],N[0]);
      return;
      
    case 23:  // fixed point
      if (choice == 0) {N[2] = 0;}
      this.element[this.eCount] = new euclid.FixedPoint(this,N[0],N[1],N[2]);
      return;
    case 24:  // point sliding along a line segment
      if (choice == 0) {N[2] = 0;}
      this.element[this.eCount] = new euclid.LineSlider(this,P[0],P[1],N[0],N[1],N[2],true);
      return;
   
    case 25:  // fourth harmonic
      this.element[this.eCount] = new euclid.Harmonic(this,P[0],P[1],P[2]);
      return;
    
    default:
     throw new Error(errstring);
   }
 case 1:  // line constructions
  switch (m) {
    case 0:  // connect construction
      this.element[this.eCount] = new euclid.LineElement(this,P[0],P[1]); 
      return;
    
    case 1:  // angle bisector construction
      if (choice == 0) { E[0] = this.screen;}
      this.element[this.eCount] = new euclid.AngleDivider(this,P[0],P[1],P[2],E[0],2);
      this.element[++this.eCount] = new euclid.LineElement(this,P[1],this.element[this.eCount-1]);
      return;
    case 2:  // angle divider construction
      if (choice == 0) {E[0] = this.screen;}
      this.element[this.eCount] = new euclid.AngleDivider(this,P[0],P[1],P[2],E[0],N[0]);
      this.element[++this.eCount] = new euclid.LineElement(this,P[1],this.element[this.eCount-1]);
      return;
    case 3:  // foot constructions
      if (choice == 0) {
        this.element[this.eCount] = new euclid.Foot(this,P[0],P[1],P[2]);
      }else {
        // E is PlaneElement
        this.element[this.eCount] = new euclid.PlaneFoot(this,P[0],E[0]);
      }
      this.element[++this.eCount] = new euclid.LineElement(this,P[0],this.element[this.eCount-1]);
      return;
    case 4:  // chord construction
      this.element[this.eCount] = new euclid.Chord(this,P[0],P[1],E[0]);
      return;
    case 5:  // bichord construction
      this.element[this.eCount] = new euclid.Bichord(this,E[0],E[1]);
      return;
    case 6:  // perpendicular constructions
      if (choice == 0)
        this.element[this.eCount] = new euclid.Perpendicular(this,P[0],P[1],this.screen,P[0],P[1]);
      else if (choice == 1)
        this.element[this.eCount] = new euclid.Perpendicular(this,P[0],P[1],E[0],P[0],P[1]);
      else if (choice == 2)
        this.element[this.eCount] = new euclid.Perpendicular(this,P[0],P[1],this.screen,P[2],P[3]);
      else if (choice == 3)
        this.element[this.eCount] = new euclid.Perpendicular(this,P[0],P[1],E[0],P[2],P[3]);
      else
        this.element[this.eCount] = new euclid.PlanePerpendicular(this,P[0],E[0],P[1],P[2]);
      return;
    case 7:  // cutoff constructions
      this.element[this.eCount] = new euclid.Layoff(this,P[0],P[0],P[1],P[2],P[3]);
      this.element[++this.eCount] = new euclid.LineElement(this,P[0],this.element[this.eCount-1]);
      return;
    case 8:  // extend constructions
      this.element[this.eCount] = new euclid.Layoff(this,P[1],P[0],P[1],P[2],P[3]);
      this.element[++this.eCount] = new euclid.LineElement(this,P[1],this.element[this.eCount-1]);
      return;
    case 9:  // parallel constructions
      this.element[this.eCount] = new euclid.Layoff(this,P[0],P[1],P[2],P[1],P[2]);
      this.element[++this.eCount] = new euclid.LineElement(this,P[0],this.element[this.eCount-1]);
      return;
    case 10:  // similar triangle (angle) constructions
      if (choice == 0) E[0] = E[1] = this.screen;
      this.element[this.eCount] = new euclid.Similar(this,P[0],P[1],E[0],P[2],P[3],P[4],E[1]);
      this.element[this.eCount+1] = new euclid.LineElement(this,P[0],this.element[this.eCount]);
      this.preexists[++this.eCount] = true;
      return;
    case 11:  // proportion constructions
      this.element[this.eCount] = new euclid.Proportion(this,P[0],P[1],P[2],P[3],P[4],P[5],P[6],P[7]);
      this.element[++this.eCount] = new euclid.LineElement(this,P[6],this.element[this.eCount-1]);
      return;
    case 12:  // meanProportional constructions
      this.element[this.eCount] = new MeanProportional(this,P[0],P[1],P[2],P[3],P[4],P[5]);
      this.element[++this.eCount] = new euclid.LineElement(this,P[4],this.element[this.eCount-1]);
      return;
    
    default:
     throw new Error(errstring);
  }

 case 2:  // circle constructions
  switch (m) {
    case 0:  // radius construction
      switch (choice) {
        case 0:
          this.element[this.eCount] =  new euclid.CircleElement(this,P[0],P[1],this.screen);
          return;
        case 1:
          this.element[this.eCount] =  new euclid.CircleElement(this,P[0],P[1],P[2],this.screen);
          return;
        case 2:
          this.element[this.eCount] =  new euclid.CircleElement(this,P[0],P[1],E[0]);
          return;
        case 3:
          this.element[this.eCount] =  new euclid.CircleElement(this,P[0],P[1],P[2],E[0]);
          return;
      }
   
    case 1:  // circumcircle construction
      if (choice == 0) E[0] = this.screen;
      this.element[this.eCount] = new euclid.Circumcircle(this,P[0],P[1],P[2],E[0]);
      return;
    case 2:  // invert in another circle
      this.element[this.eCount] = new euclid.InvertCircle(this,E[0],E[1]);
      return;
    case 3:  // intersection construction
      // E[0], E[1] are SphereElement
      this.element[this.eCount] = new euclid.IntersectionSS(this,E[0],E[1]);
      return;
    
    default:
     throw new Error(errstring);
  }
 case 3:  // polygon constructions
  switch (m) {
   
    case 0:  // square construction
      if (choice == 0) {E[0] = this.screen;}
      this.element[this.eCount] =  new euclid.RegularPolygon(this,P[0],P[1],E[0],4);
      return;
    case 1:  // triangle construction
      this.element[this.eCount] = new euclid.PolygonElement(this,P[0],P[1],P[2]);
      //console.log("Polygond triangle",this.element[this.eCount]);
      return;
    case 2:  // quadrilateral construction
      this.element[this.eCount] = new euclid.PolygonElement(this,P[0],P[1],P[2],P[3]);
      return;
    case 3:  // pentagon construction
      this.element[this.eCount] = new euclid.PolygonElement(this,P[0],P[1],P[2],P[3],P[4]);
      return;
    case 4:  // hexagon construction
      this.element[this.eCount] = new euclid.PolygonElement(this,P[0],P[1],P[2],P[3],P[4],P[5]);
      return;
    case 5:  // equilateral triangle constructions
      if (choice == 0) {E[0] = this.screen;}
      this.element[this.eCount] =  new euclid.RegularPolygon(this,P[0],P[1],E[0],3);
      return;
    case 6:  // parallelogram construction
      var fourth;
      fourth = new euclid.Layoff(this,P[0],P[1],P[2],P[1],P[2]);
      this.element[this.eCount] = fourth;
      this.element[++this.eCount] = new euclid.PolygonElement(this,P[0],P[1],P[2],fourth);
      return;
    case 7:  // regular polygon constructions
      if (choice == 0) {E[0] = this.screen;}
      this.element[this.eCount] =  new euclid.RegularPolygon(this,P[0],P[1],E[0],N[0]);
      return;
    case 8:  // star polygon constructions
      if (choice == 0) {E[0] = this.screen;}
      this.element[this.eCount] =  new euclid.RegularPolygon(this,P[0],P[1],E[0],N[0],N[1]);
      return;
    case 9:  // similar triangle constructions
      if (choice == 0) {E[0] = this.screen; E[1] = this.screen;}
      this.element[this.eCount] = new euclid.Similar(this,P[0],P[1],E[0],P[2],P[3],P[4],E[1]);
      this.element[this.eCount+1] = new euclid.PolygonElement(this,P[0],P[1],this.element[this.eCount]);
      this.preexists[++this.eCount] = true;
      return;
    case 10:  // application construction
      // E[0] (PolygonElement)
      this.element[this.eCount] = new euclid.Application(this,E[0],P[0],P[1],P[2]);
      return;
    case 11:  // octagon construction
      this.element[this.eCount] = new euclid.PolygonElement(this,P[0],P[1],P[2],P[3],P[4],P[5],P[6],P[7]);
      return;     
    case 12:  // face of a polyhedron
      // E[0] (PolyhedronElement)
      this.element[this.eCount] = (E[0]).P[N[0]-1];
      this.preexists[this.eCount] = true;
      return;
    
    default:
     throw new Error(errstring);
  }

 case 4:  // sector constructions
  switch (m) {
    case 0:  // sector construction
      if (choice == 0) {E[0] = this.screen;}
      this.element[this.eCount] =  new euclid.SectorElement(this,P[0],P[1],P[2],E[0]);
      return;
    case 1:  // arc construction
      if (choice == 0) {E[0] = this.screen;}
      this.element[this.eCount] =  new euclid.Arc(this,P[0],P[1],P[2],E[0]);
      return;
  }

 case 5:  // plane constructions
  switch (m) {
    case 0:  // 3points construction
      this.element[this.eCount] =  new euclid.PlaneElement(this,P[0],P[1],P[2]);
      return;
   
    case 1:  // plane perpendicular to line
      this.element[this.eCount] =  new euclid.PerpendicularPL(this,P[0], P[1]);
      return;
    case 2:  // parallel construction
      this.element[this.eCount] =  new euclid.ParallelP(this,E[0],P[0]);
      return;
    case 3:  // ambient planes
      if (choice == 0) {
        this.element[this.eCount] = P[0].AP;
      }else{
        this.element[this.eCount] = E[0].AP;
      }
      this.preexists[this.eCount] = true;
      return;
    
    default:
     throw new Error(errstring);
   }

 case 6:  // sphere constructions
  switch (m) {
   
    case 0:  // radius constructions
      if (choice == 0) {
        this.element[this.eCount] =  new euclid.SphereElement(this,P[0],P[0],P[1]);
      }else {
        this.element[this.eCount] =  new euclid.SphereElement(this,P[0],P[1],P[2]);
      }
      return;
    
    default:
     throw new Error(errstring);
  }
 case 7:  // polyhedron constructions
   var Pol;

  switch (m) {
    case 0:  // tetrahedron construction
      var Pol =  new euclid.PolygonElement(this,P[0],P[1],P[2]);
      this.element[this.eCount++] = Pol;
      this.element[this.eCount] = new euclid.Pyramid(this,Pol,P[3]);
      return;
    case 1:  // parallelepiped construction
      var fourth = new euclid.Layoff(this,P[1],P[0],P[2],P[0],P[2]);
      this.element[this.eCount++] = fourth;
      var Pol = new euclid.PolygonElement(this,P[1],P[0],P[2],fourth);
      this.element[this.eCount++] = Pol;
      this.element[this.eCount] =  new euclid.Prism(this,Pol,P[0],P[3]);
      return;
    case 2:  // prism construction
      // E[0] is (PolygonElement)
      this.element[this.eCount] =  new euclid.Prism(this,E[0],P[0],P[1]);
      return;
    case 3:  // pyramid construction
      this.element[this.eCount] =  new euclid.Pyramid(this,E[0],P[0]);
      return;
    }  
    
    default:
     throw new Error(errstring);
 } // end of switch (c)
 return;  // should never reach here, but the compiler complains
};
euclid.Slate.prototype.constructElement = function(name,elementClass,constructionMethod,data,message) {
 // all parms are strings, except message, which is a StringBuffer
 if (this.lookupElement(name) != null) {
    message.append("An element with the name " + name 
       + " has already been created.");
    return null;
 }
 var c = this.lookupElementClass (elementClass);
 if (c == -1) {
   message.append("Element class " + elementClass + " is not known.");
   return null;
 }
 var m = this.lookupConstructionMethod (c, constructionMethod);
 if (m == -1) {
   message.append("ConstructionMethod " + constructionMethod 
 + " is not known for " + " element class " + elementClass + ".");
   return null;
 } 
 var P = new Array(8);  // just for points
 var E = new Array(4);  // for any other kind of elements
 var N = new Array(3);    // just for integers
 var choice = this.selectDataChoice (data, euclid.Slate.constructionDataType[c][m], 
        P, E, N, message);
 if (choice == -1) {
   message.append("Construction method " + constructionMethod 
 + " for " + " element class " + elementClass 
 + " with data " + data
 + " requires different data.");
   return null;
 }
 if (this.element.length < (this.eCount+2)) {
   this.extendArrays();
 }
 //console.log("Slate.constructElement: name:",name,"elementClass:",elementClass,"constructionMethod:",constructionMethod,"data:",data);
 this.createElement (c, m, choice, P, E, N);
 this.element[this.eCount].name = name;
 var e = this.element[this.eCount];
 this.eCount = this.eCount+1;
 return e;
 //return this.element[this.eCount++];'
 
};
euclid.Slate.prototype.extendArrays = function() {
 var len = this.element.length;
 var newelement = new Array(2*len);
 var newpreexists = new Array(2*len);
 for (var i=0;i<len;i++) {
  newelement[i] = this.element[i];
  newpreexists[i] = this.preexists[i];
 }
 this.element = newelement;
 this.preexists = newpreexists;
}

euclid.Slate.prototype.setPivot = function(param) {
 var t = new euclid.StringTokenizer(param,",");
 var name = t.nextToken();
 var e = this.lookupElement(name);
 if (e == null || !e.inClass("PointElement")) {return;}
 if (!t.hasMoreTokens()) {
   e.AP = this.screen;
   this.screen.pivot = e;
   return;
 }
 name = t.nextToken();
 var p = this.lookupElement(name);
 if (p == null || !p.inClass("PlaneElement")) {return;}
 p.pivot = e;
};
euclid.Slate.prototype.updateCoordinates = function(i) {
 // update coordinates starting with element[i+1]
 for (++i; i<this.eCount; ++i) {
   if (!this.element[i].defined()) { 
     this.element[i].reset();
   }
   this.element[i].update();
  }
};
euclid.Slate.prototype.update = function() {
 this.drawElements();
};
euclid.Slate.prototype.reset = function() {
 var i;
 for (i=0; i<this.eCount; ++i) {
  this.element[i].reset();
 };
};
euclid.Slate.prototype.drawElements = function() {
 var c = this.getBackground();
 //println("slate.drawElements. background = ",c);
 this.p.background(c);
 /*
 g.setColor(getBackground());
 Dimension d = size();
 g.fillRect(0, 0, d.width, d.height);
 */
 var i;
 for (i=0; i<this.eCount; ++i) 
   this.element[i].drawFace();
 for (i=0; i<this.eCount; ++i) 
   this.element[i].drawEdge();
 for (i=0; i<this.eCount; ++i) 
   this.element[i].drawVertex();
 for (i=0; i<this.eCount; ++i) 
   this.element[i].drawName(new euclid.Dimension(this.p.width,this.p.height));
};
euclid.Slate.prototype.rotateCoordinates = function(c,d) {
 // c,d are integers
 // rotate space according to how pick goes around pivot in the plane
 // make a dummy PointElement to use for computations that are 
 //console.log("pick=",this.pick);
 var piv = this.pick.AP.pivot;
 // compute old and new pick's 3D coordinates relative to the pivot
 var oldP = this.origin.difference(this.pick,piv);
 var newx = c-piv.x;
 var newy = d-piv.y;    //(newz is irrelevant)
 // find their 2D coordinates on the plane
 var S = this.pick.AP.S;
 var T = this.pick.AP.T;
 var olds = euclid.PointElement.dot(oldP,S);
 var oldt = euclid.PointElement.dot(oldP,T);
 var den  = S.x * T.y - S.y * T.x;
 var news = (newx*T.y - newy*T.x)/den;
 var newt = (newy*S.x - newx*S.y)/den;
 // compute the scale&rotation factors
 den = olds*olds + oldt*oldt;
 var ac = (news*olds + newt*oldt)/den;
 var as = (newt*olds - news*oldt)/den;
 // rotate all the elements  
 for (i=0; i<this.eCount; ++i)
   if (!this.preexists[i])
     this.element[i].rotate(piv,ac,as);
};
euclid.Slate.prototype.translateCoordinates = function(dx,dy) {
 //dx,dy are double
 // translate space by (dx,dy,0)
 var i;
 for (i=0; i<this.eCount; ++i)
   if (!this.preexists[i])
     this.element[i].translate(dx,dy);
};
euclid.Slate.prototype.movePick = function(c,d) {
 // c,d are int
 var i;
 if (this.pick == null) {      // select a nearby visible point
   this.picki = -1;
   var bestdist2 = Number.POSITIVE_INFINITY;
   for (i=0; i<this.eCount; ++i)
  if (this.element[i].inClass("PointElement") && this.element[i].vertexColor!=euclid.invisibleColor) {
 
 var x = (this.element[i]).x;
 var y = (this.element[i]).y;
 var dist2 = (x-c)*(x-c) + (y-d)*(y-d);
       if (dist2 < 100.0 && dist2 < bestdist2) {
   this.picki = i;
   bestdist2 = dist2;
 }   } }
   
 if (this.picki == -1) return;
 this.pick =  this.element[this.picki];
 // adjust c and d to be on the image so pick doesn't get lost
 var thesize= this.geometry.size();
 var w = thesize.width;
 if (c < 0) c = 0;
 else if (c > w) c = w;
 var h = thesize.height;
 if (d < 0) d = 0;
 else if (d > h) d = h;
 if (Math.abs(c-this.pick.x) + Math.abs(d-this.pick.y) < 1.0)
   return;        // no motion
 // now actually change the slate
 if (this.pick.dragable) {    // drag the point
   if (this.pick.drag(c,d)) 
     this.updateCoordinates(this.picki);
   else return;
 } else if (this.pick.AP != null && this.pick.AP.pivot != null 
              && this.pick.AP.pivot != this.pick) // rotate around the pivot
   this.rotateCoordinates(c,d);
 else {    // translate all coordinates
   var dx = c - this.pick.x;
   var dy = d - this.pick.y;
   this.translateCoordinates(dx,dy);
 }    
 this.repaint();
};
euclid.Slate.prototype.keyDown = function(key) {
 // typing r or space resets the diagram
 // 'key' is a string containing the ASCII key typed
 // Not sure what the 'return' value (true/false) signifies, if anything,
 // in the Javascript version. 
 if (key=='r' || key=='R' || key==' ') {
   this.reset();
   this.repaint();
   return true;
 } else return false;

};
euclid.Slate.prototype.mouseDown = function(c,d) {
 // c,d are int
 // determine which ball is closest to location (c,d).
 this.pick = null;
 this.movePick (c,d);
 return true;
};
euclid.Slate.prototype.mouseDrag = function(c,d) {
 // c,d are int
 this.movePick (c,d);
 return true;
};
euclid.Slate.prototype.mouseUp = function(c,d) {
 // c,d are int
 if (this.pick == null) return true;
 this.movePick(c,d);
 this.pick = null;
 return true;
};
euclid.Slate.prototype.repaint = function() {
 this.drawElements();  // may not be needed, as this is a Java Canvas method
};
/*
euclid.Slate.prototype. = function() {
 console.log(" Slate. is incomplete");
};
*/
// in euclid package
euclid.Geometry = function(p) {
 this.p = p;  // The processingJS object
 this.debug=null;
 this.title=null;
 this.background = this.colorByName("white");
 this.orange = this.colorByName("orange");
 this.slate=null;
 this.message = new StringBuffer();
 this.parCount = 0;
 this.nparam=0; // was variable init in Java. But init is a method here.
 this.stage=0;
 this.defaultAlign=0;
 this.floating=false;
 this.floater = null; // a ClientFrame
 this.closeButton=null; // a Button
 this.resetButton=null;
 this.returnButton=null;
 this.baseSize=null; // a Dimension
 this.font=null; // a String
 this.fontsize=0;

};
euclid.Geometry.prototype.getParameterInfo = function() {
 return [
  ["background",  "Color",    "background color"],
  ["e[i]",   "element",     "element information"],
  ["pivot",  "String",    "name of pivot point, if any"],
  ["debug",  "boolean",    "output debugging info"],
  ["init",  "int",      "initial stage"],
  ["title",  "String",    "title"],
  ["font",  "String",    "font name"],
  ["fontsize",  "int",      "font size"],
  ["align",  "String",    "label alignment"]
    ];
};
euclid.Geometry.prototype.randomColor = function() {
  var p = this.p;
  p.colorMode(p.HSB,360,100,100); // 
  var hue = p.random(0,360);
  var saturation = p.random(0,100);
  var brightness = 255;
  var c = p.color(hue,saturation,brightness);
  p.colorMode(p.RGB,255,255,255);
  return c; 
};
euclid.Geometry.prototype.colorName = 
  ["black", "blue", "cyan", "darkGray", "gray", "green","lightGray", 
  "magenta", "orange", "pink", "red", "white", "yellow"];
euclid.Geometry.prototype.constColorFcn_old = function() {
 return [this.p.color(0,0,0), this.p.color(0,0,255), this.p.color(0,255,255), this.p.color(169,169,169),
   this.p.color(128,128,128),this.p.color(0,128,0),
   this.p.color(192,192,192), //this.p.color(211,211,211), lightGray according to java awt is 192,..
   this.p.color(255,0,255), this.p.color(255,165,0), this.p.color(255,192,203), this.p.color(255,0,0),
   this.p.color(255,255,255),this.p.color(255,255,0)];
};
euclid.Geometry.prototype.constColorFcn_unused = function() {
 var a = [];
 var i,c,rgb,r,g,b;
 var rgbs = [[0,0,0], [0,0,255], [0,255,255], [169,169,169],
   [128,128,128],[0,128,0],
   [192,192,192], //[211,211,211], lightGray according to java awt is 192,..
   [255,0,255], [255,165,0], [255,192,203], [255,0,0],
   [255,255,255],[255,255,0]];
 this.p.colorMode(this.p.RGB,255,255,255);
 for(i=0;i<rgbs.length;i++) {
  rgb = rgbs[i];
  r = rgbs[0]; g = rgbs[1]; b = rgbs[2];
  c = this.p.color(r,g,b);
  a[i] = c;
 }
 console.log('constColorFcn returns a, and a[1]=',a[1].levels);
 return a;
};
euclid.Geometry.prototype.colorByName = function(str,exact) {
  var j=-1;
 var i,c,rgb,r,g,b;
 var rgbs = [[0,0,0], [0,0,255], [0,255,255], [169,169,169],
   [128,128,128],[0,128,0],
   [192,192,192], //[211,211,211], lightGray according to java awt is 192,..
   [255,0,255], [255,165,0], [255,192,203], [255,0,0],
   [255,255,255],[255,255,0]];
 
 for (i=0; i<this.colorName.length; ++i) {
  if (this.colorName[i] == str) {j = i; break;}
 }
 if (j == -1) {
  if (exact) {
   // return null if colorName not known
   return null;
  }else {
   j = 12; 
  } // white
 }
this.p.colorMode(this.p.RGB,255,255,255);
  rgb = rgbs[j];
  r = rgb[0]; g = rgb[1]; b = rgb[2];
  c = this.p.color(r,g,b);
 //console.log('colorByName: str=',str,', j=',j,', rgb=',r,g,b,', c=',c.levels);
  //console.log("Geometry.colorByName",str,j,c);
  return c;
};
/*  The Java.awt Color object has 'darker' and 'brighter' methods.
    It is not clear how to implement these in Processing.
*/
euclid.Geometry.arraysEqual = function(a,b) {
if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
euclid.Geometry.prototype.darker = function(c) {
 // c is a color.  
 // This is made ad-hoc to fit the Java color for background of bookI/propI2.html
 var c1;
 var dbg=true;
 
 if (euclid.Geometry.arraysEqual(c.levels,[255,235,207,255])) {
  //console.log("darker matches expected");
  // from hsbcolor(35,19,100)
  c1 = this.hsbcolor(35,19,60);
 }else {
  console.log("Geometry.darker: Algorithm missing for c =",c);
  c1 = c;
 }
 
 return c1;
};
euclid.Geometry.prototype.brighter = function(c) {
 // c is a color.  
 var c1;
if (euclid.Geometry.arraysEqual(c.levels,[255,235,207,255])) {
  //console.log("darker matches expected");
  // from hsbcolor(35,19,100)
  c1 = this.hsbcolor(0,0,100); // white
 }else {
  console.log("Geometry.darker: Algorithm missing for c =",c);
  c1 = c;
 }
 return c1;
};
euclid.Geometry.prototype.hsbcolor = function(h,s,b) {
 this.p.colorMode(this.p.HSB,360,100,100);
 var c = this.p.color(h,s,b);
 //console.log("Geometry.parseColor. str=",str," AND hsb=",h,s,b,"c=",c);
 // reset colorMode to default
 this.p.colorMode(this.p.RGB,255,255,255);
 return c;
};

euclid.Geometry.prototype.parseColor = function(str) {
 //console.log('Geometry.parseColor: str=',str);
 if (str == null) {return null;} 
 if (str == "none") {return null;} 
 if (str == "0") {return null;} 
 if (str == "random") {
   var c = this.randomColor();
   //console.log('Geometry.parseColor: randomColor =',c);
   return c;
 }
 if (str == "background") {return this.background};
 if (str == "brighter") {return this.brighter(this.background)}; // background.brighter();
 if (str == "darker") {return this.darker(this.background)}; // background.darker();
 //console.log('Geometry.parseColor: chk1');
 c = this.colorByName(str,true);
 if (c != null) {
  return c;
 }
/*
 for (var i=0; i<this.colorName.length; ++i) {
      if (this.colorName[i] == str) {
         var ctemp = this.constColor[i];
         console.log("Geometry.parseColor: ",str,i,ctemp);
         return ctemp;
      }
*/
 //console.log('Geometry.parseColor: chk2');
 var i;
 if (/^\d+$/.test(str)){ // test if 'next' is a string of digits
   i = parseInt(str,16); // maybe str is a number coded in hex. NaN otherwise
   return this.p.color(i); 
 }
 //console.log('Geometry.parseColor: chk3');
 // maybe str is a sequence of three numbers, separated by commas
 // next assumes HSB, and that the numbers are in range 360 (degrees), 100%,100%
 var h,s,b,parts;
 parts = str.split(',');  // str = "20,40,60"
 //console.log('Geometry.parseColor: chk4. parts=',parts);
 //[h,s,b] = parts.map(function(x) {return parseInt(x);});
 // Aug 25, 2016
 parts = parts.map(function(x) {return parseInt(x);});
    h=parts[0]; s=parts[1]; b=parts[2];
 // no check for bad numbers, e.g., str="20,40"
 var c =this.hsbcolor(h,s,b);
 /*
 if ((h==0) && (s==0) && (b==0)) {
  c = this.colorByName("black");
  console.log("parseColor: changing to black");
 }
 */
 return c;
};
euclid.Geometry.prototype.alignName = [
 "central", "left", "right", "above", "below"];
euclid.Geometry.prototype.constAlign = [
  euclid.Element.CENTRAL, euclid.Element.LEFT, 
  euclid.Element.RIGHT, euclid.Element.ABOVE,euclid.Element.BELOW];
euclid.Geometry.prototype.parseAlign = function(param) {
 var i;
 var alignName = this.alignName;
 var constAlign = this.constAlign;
 var j=null;
 for(i=0;i<alignName.length;++i) {
  if (alignName[i] == param) {j = i;break;}
 }
 if (j) {
  return constAlign[j];
 } else {
  return 0;
 }
};
euclid.Geometry.prototype.parseElement = function(param,message) {
 // message is a StringBuffer
 var dbg=false; //true;
 var t = new euclid.StringTokenizer(param,";");
 if (!t.hasMoreTokens()) {
   message.append("Parameter is empty.");
   return null;
 }
 var name = t.nextToken();
 if (!t.hasMoreTokens()) {
   message.append("Parameter "+param+" missing an element class.");
   return null;
 }
 var elementClass = t.nextToken();
 if (!t.hasMoreTokens()) {
   message.append("Parameter "+param+" missing a construction.");
   return null;
 }
 var construction = t.nextToken();
 if (!t.hasMoreTokens()) {
   message.append("Parameter "+param+" missing construction data.");
   return null;
 }
 var data = t.nextToken();
 /*
 if (dbg && (name == "E'")) {
  console.log('Geometry.parseElement: calling slate.constructElement with name=',name,'data=',data);
 }
*/
/* From defI20, there is a space after the construction name. Thus, we 
   trim that space. Aug 24, 2016
*/
 construction = construction.trim();
 var e = this.slate.constructElement(name,elementClass,construction,data,message);
 /*
 if (dbg && (name == "E'")) {
  console.log('Geometry.parseElement: name=',name,'\ne=',e);
 }
 */
if (e == null) return null;
 if (t.hasMoreTokens())
   e.nameColor = this.parseColor(t.nextToken());
 else if (e.inClass("PointElement")) //(e instanceof PointElement) 
   e.nameColor = this.parseColor("black");
 else { // make color invisible (so it won't be printed)
   // alpha = 0 means completely transparent == invisible
   // However, can't use color(0,0,0,0), this shows as black.
   e.nameColor = euclid.invisibleColor; //this.p.color(255,255,255,0);  
 }
 e.align = this.defaultAlign;
 var ivertex = -1; // for debugging
 if (t.hasMoreTokens()) {
   e.vertexColor = this.parseColor(t.nextToken());
   ivertex=0;
   //if (e.name == 'F') {console.log("Geometry. ",e.name," has vertexColor = ",e.vertexColor.levels);}
 } else if (e.dimension == 0) {
   ivertex=1
  if (e.dragable) {
   if (e.inClass("PlaneSlider")) {
    e.vertexColor = this.colorByName("red");
   } else {
    e.vertexColor = this.colorByName("orange");
   }
  }else {
   e.vertexColor = this.colorByName("black");
   ivertex=2;
   //console.log('Geometry. vertexColor for',e.name,'is ',e.vertexColor.levels);
  }
 }
   //console.log('Geometry. vertexColor for',e.name,'is ',e.vertexColor,'\n dragable=',e.dragable,'in PlaneSlider',e.inClass("PlaneSlider"),", ivertex=",ivertex,", dimension=",e.dimension);

 if (t.hasMoreTokens()) {
   var tok=t.nextToken();
   e.edgeColor = this.parseColor(tok);
 }else if (e.dimension > 0) {
   e.edgeColor = this.parseColor("black");
 }
 
 if (t.hasMoreTokens()) {
   e.faceColor = this.parseColor(t.nextToken());
 }else if (e.dimension == 2) {
   e.faceColor = this.brighter(this.background); //background.brighter();
 }
 return e;
 if (dbg) {console.log("Geometry.parseElement is unfinished");}
};
euclid.Geometry.prototype.size = function() {
 return new euclid.Dimension(this.p.width,this.p.height);
};
euclid.Geometry.prototype.init = function(loadData) {
 this.baseSize = this.size();
 var dbg=false; //true;
 if (dbg) {console.log("Geometry.init baseSize = ",this.baseSize);}
 this.parCount = 0;
 var param = loadData.getParameter("debug");
 this.debug=false;
 if (param && (param.toLowerCase() == "yes")) {this.debug=true;}
 this.nparam = loadData.nparam;
 if (dbg) {console.log("nparam=",this.nparam);}
 this.slate = new euclid.Slate(100,this);
 this.title = loadData.getParameter("title");
 if (this.title == null) {this.title = "Geometry";}
 this.font = loadData.getParameter("font");
 if (this.font == null) {this.font = "TimesRoman";}
 param = loadData.getParameter("fontsize");
 if (param == null) {
  this.fontsize = 18;
 }else {
  this.fontsize = parseInt(param);
 }
 this.slate.setFont(this.font,"ITALIC",this.fontsize);
 param = loadData.getParameter("align");
 this.defaultAlign = this.parseAlign(param);
 param = loadData.getParameter("background");
 if (param != null) {
  this.background = this.parseColor(param);
 }
 if (dbg) {
 console.log("Geometry.init: background, param = ",param,", background=",this.background);
 //console.log("setting background color in dbg mode");
 //this.p.background(this.background);
 }
 this.slate.setBackground(this.background);
 /*
    setLayout(new BorderLayout());
    add("Center",slate);
 */
 this.stage = this.nparam;
 while ((this.parCount != -1) && (this.parCount < this.stage)) {
  var param_name = "e["+(this.parCount+1)+"]";
  param = loadData.getParameter(param_name);
  if (this.debug) {
   console.log("Parsing parameter ",param_name,"=",param);
  }
  if (param == null) {
   this.parCount = -1; // to break while loop
  }else {
   var e = this.parseElement(param,this.message);
   if (e == null) {
    console.log("Paramater ",param_name,"=",param," not parsed. ",this.message.toString());
    this.parCount = -1; // break loop
   }else {
   this.parCount = this.parCount  + 1;
   }
  }
 }
 param = loadData.getParameter("pivot");
 if (param != null) {
  this.slate.setPivot(param);
 }
 this.slate.updateCoordinates(0);
 if (dbg) {console.log("Geometry.init is finished");}
};
//console.log("Geometry: euclid.Geometry=",euclid.Geometry);
/*
euclid.Geometry.prototype. = function() {
};
*/euclid.LoadData = function(filename,callback) {
 // July 21, 2016. This constructor now does nothing
 // LoadData constructor
/*
 this.filename = filename;
 jQuery.ajax({
  url: filename,
  //data: ,
  success: callback, //this.loadXML,
  error: function(jqXHR,textStatus,errorThrown) {
   console.log("textStatus =",textStatus);
  },
  dataType: "xml"
 });
*/
};
euclid.LoadData.prototype.loadXML = function(data) {
 var dbg=true;
 var xml = data; //jQuery(data);
 //console.log("xml=",xml);
 this.divid = xml.attr("id");
 console.log("euclid.LoadData.loadXML. div id=",this.divid);
/*  'applet' element changed to 'object' in the html. Aug 21, 2016
 this.theheight = xml.find('applet').attr('height');
 this.thewidth = xml.find('applet').attr('width');
*/
 this.theheight = xml.find('object').attr('height');
 this.thewidth = xml.find('object').attr('width');
 this.theheight = parseInt(this.theheight);
 this.thewidth = parseInt(this.thewidth);
 if (dbg) {console.log("height=",this.theheight,"width=",this.thewidth);}
 var children = xml.find('param');
 gchildren = children;
 this.nparam = children.length;
 if (dbg) {console.log("nparam=",this.nparam);}
 this.param_names = [];
 this.param_values = [];
 for(var i=0;i<this.nparam;i++) {
  var name = jQuery(children[i]).attr('name');
  var value = jQuery(children[i]).attr('value');
  this.param_names.push(name);
  this.param_values.push(value);
 }
 for(var i=0;i<this.nparam;i++) {
  if (dbg) {console.log("param",i,", name=",this.param_names[i],", value=",this.param_values[i]);}
 }
 // Aug 21, 2016. Now, make the '<object> element invisible'
 xml.find('object').attr('height',0);
 xml.find('object').attr('width',0);
};
euclid.LoadData.prototype.getParameter = function(name) {
    var value = null;
 for (var i=0;i<this.nparam;i++) {
  if (name == this.param_names[i]) {
   value = this.param_values[i];
   break;
  }
 }
 return value;
};
// July 15, 2016. Discovered that Safari in MacOSX does not supprt 'let'
// So, changed all 'let' to 'var'
//euclid = {}; // namespace for classes (in index.html)
euclid.Applet = function (myapplet_object,div) {
 this.applet_object = myapplet_object;
 //console.log("applet_object=",myapplet_object);
//euclid.applet_object = "applet_rev.xml";
//globalp = null;
 var applet_object=myapplet_object;
 var sketch= function(p) {
  var loadData; // local variable in sketch
  var geometry;
  p.setup= function() {
   // Since ajax loads asynchronously, we must finish up
   // the setup 
   console.log("p.setup: applet_object=",applet_object);
   //euclid.invisibleColor = p.color(255,255,255,0); 
   euclid.invisibleColor = null;
   loadData = new euclid.LoadData();
   loadData.loadXML(applet_object);
   //console.log("callback: width=",loadData.thewidth,loadData.theheight);
   var canvas = p.createCanvas(loadData.thewidth,loadData.theheight);
   //canvas.parent(div);
   p.background(240); // just to show that canvas was created.
   //console.log("p5.width,height=",p.width,p.height);
   geometry = new euclid.Geometry(p); // p is the sketch parameter
   geometry.init(loadData);
   setupFont();
   // Make a global on the euclid object
   //console.log("Hello");
  };
  var setupFont = function() {
   var slate = geometry.slate;
   var fontname = slate.slateFontname;
   var fontsize = slate.slateFontsize;
   //console.log("cannot do euclid.js, setupFont:",fontname,fontsize);
   if ((fontname!=null) && (fontsize!= 0)) {
    //console.log("euclid.js, setupFont:",fontname,fontsize);
    //var f = p.createFont(fontname,fontsize,true);
    // ref https://p5js.org/reference/#/p5/textFont
    var f = fontname; // createFont not part of p5js
    slate.slateFont = f; // probably should use a setter
   }
   slate.update();
  };
  p.draw = function() {
   /* for testing only
   p.fill(0,255,0);
   p.ellipse(200,200,80,80);
   */
  };
  p.mousePressed = function () {
   geometry.slate.mouseDown(p.mouseX,p.mouseY);
  };
  p.mouseReleased = function () {
   geometry.slate.mouseUp(p.mouseX,p.mouseY);
  };
  p.mouseDragged = function () {
   geometry.slate.mouseDrag(p.mouseX,p.mouseY);
  };
  p.keyTyped = function () {
   // check that mouseX and mouseY are within the bounds of this sketch
   if ((0<=p.mouseX) && (p.mouseX <= p.width) && 
       (0<=p.mouseY) && (p.mouseY <= p.height)) {
    geometry.slate.keyDown(p.key);
   } 
  };
 };
 //console.log("instantiating myp5");
 var myp5 = new p5(sketch,div);
 //console.log("back from instantiating");
};
/*
new euclid.Applet("applet_rev.xml","sketch1");
new euclid.Applet("applet_rev2.xml","sketch2");
*/// euclidFinish.js
// Finally, start things
$( document ).ready(function() {
 console.log( "ready!" );
 var fapplet = function(index) {
  var div = $(this);
  console.log("div = ",div);
  var divid = div.attr("id");
  console.log("divid=",divid);
  new euclid.Applet(div,divid);
 };
 $("div[id^='ap']").each(fapplet);
});
