
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
