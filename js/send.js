$(document).ready(function() {
	var thisUrl = window.location.href;
	var uri_dec = decodeURIComponent(thisUrl);
	var message = uri_dec.split(/\.*\?message=/)[1];
	sendMessage(message);
});

function sendMessage(message) {
	$("textarea").first().val(message); //fill message
	$("#u_0_s").click(); //send
	window.close();
}
