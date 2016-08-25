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
*/