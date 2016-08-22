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
 // Aug 21, 2016. Microsoft Edge doesn't like this 
 //[h,s,b] = parts.map(function(x) {return parseInt(x);});
 parts = parts.map(function(x) {return parseInt(x);});
 h = parts[0];
 s = parts[1];
 b = parts[2];
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
*/