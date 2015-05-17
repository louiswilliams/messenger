$(document).ready(function() {
	var thisUrl = window.location.href;
	var uri_dec = decodeURIComponent(thisUrl);
	var message = uri_dec.split(/\.*\?message=/)[1];
	sendMessage(message);
});

function sendMessage(message) {
	$("textarea").first().val(message); //fill message
	// $("#u_0_10").click(); //send

	$("input[value='Reply']").click();
	setTimeout(	window.close, 500);

}
