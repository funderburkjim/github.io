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
