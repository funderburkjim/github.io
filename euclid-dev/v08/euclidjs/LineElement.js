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
*/