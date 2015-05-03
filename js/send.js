$(document).ready(function() {
	var thisUrl = window.location.href;
	var uri_dec = decodeURIComponent(thisUrl);
	var message = uri_dec.split(/\.*\?message=/)[1];
	sendMessage(message);
});

/*
	Hunter fill this in to send the message
*/
function sendMessage(message) {
	console.log(message);
}
