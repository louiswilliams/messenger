console.log("boobies");

$( "._4bl8._4bl7" ).click(function() {
	alert( "We nabbed the new message click." );
	
	// $("._2ei6._14-8._5vn4").bind("DOMSubtreeModified", function() {
	//     alert("tree changed");
	// });
	//_2ei6 _14-8 _5vn4
});

$('html').on('DOMSubtreeModified', '._58-2.clearfix', function(event) {
  // console.log(result);
  var result = event.currentTarget;
  if (result != undefined && result.childNodes != undefined) result = result.childNodes[0];
  if (result != undefined && result.classList != undefined && result.classList.length == 3) result = result.classList[2];
  if (result == "_5vn4");
  console.log("yes");
});

// function nodeInsertedCallback(event) {
//     console.log(event);
// };
// document.addEventListener('DOMNodeInserted', nodeInsertedCallback);