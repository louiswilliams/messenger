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
	$("input[value='Send']").click();
	setTimeout(	window.close, 500);
	//  firstName : {{firstName}} lastName :  {{lastName}} fullName : {{fullName}} :  nickName : {{nickName}}
//https://www.facebook.com/messages/553235347?message=firstName%20:%20Louis%20lastName%20:%20%20%20fullName%20:%20Louis%20Williams%20Weirdo:%20%20:%20%20nickName%20:%20{{nickName}}
}
