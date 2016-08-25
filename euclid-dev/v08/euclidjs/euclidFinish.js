// euclidFinish.js
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
