euclid.PolygonElement = function(slate) {
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
*/