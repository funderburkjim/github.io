euclid.LoadData = function(filename,callback) {
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
 this.theheight = xml.find('applet').attr('height');
 this.thewidth = xml.find('applet').attr('width');
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
