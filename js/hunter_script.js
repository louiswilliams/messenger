var status = "null";

$(document).ready(function() {
	injectInitialView();
});

function injectInitialView() {
	$("._36ic._5vn4.clearfix").prepend("<div><a id='new_message' style='float: left;'>Fuck It</a></div>");
}
function injectNewMessageView() {
	$("._4_j4.clearfix").css("background","rgb(240, 158, 158)");
	$("._2y8y.clearfix").attr("style", "margin-left: 40px;");
	$("._1q5-").prepend("<div><a id='send_message' style='float: left; padding-top: 20px;'>Ship It</a></div>");
	console.log($("._4bl9 ._4bl9 > :first-child").html());

	//$("._4_j4.clearfix ._4bl9 div:first-child").prepend("<span class='pipeline coach-marks'><h1>You are about to send a group message to [name1], [name2], and 2 others.</h1><p>Tip: you can use these <strong>handlebars</strong> to inject personalized content to each person. For example...</p><ul><li>{{first_name}}: The user's first name</li><li>{{employer}}: The user's listed workplace</li><li>{{custom_greeting}}: Use a greeting that you preset for each user</li><li><a href=''>Learn more about handlebars</a></li></ul></span>");
}


$(document).on("click", "#new_message", function() {
	// click the actual /new button
	if (status != "new") {
		status = "new";
		$(".img.sp_614YwBM1qJY.sx_a55cec").click();
			var checkExist = setInterval(function() {
			if ($('._2y8y.clearfix').length) {
		    	injectNewMessageView();
		    	clearInterval(checkExist);
		   }
		}, 100); // check every 100ms for page to update
	}
});

$(document).on("click", "#send_message", function() {
	grabContactsAndSend();
});

function grabContactsAndSend() {
	var message = $("._54-z").children(0).children(0).children(0).children(0).text();
	$("._58-2.clearfix").children("span").each( function() {
		if ($(this).hasClass("_5vn4")) {
			// console.log($(this));
			unformatted = $(this).attr("data-reactid");
			var id = unformatted.match(/\d{4,45}/)[0];
			var name = $(this).text();
			sendMessage(id, message, name);
		}
		status = "null";
		// location.reload();
	});

}

function sendMessage(id, message, fullName) {
	console.log("sending " + message + " to " + fullName);
	$("._4_j4.clearfix ._4bl9").css("position", "relative");
	$(".pipeline.coach-marks").css({
		"position": "absolute",
		"bottom": "0",
		"margin-left": "12px",
		"margin-bottom": "1em"
	});
	$("._4_j4.clearfix ._4bl9 div[style^='height']").html("<span class='pipeline coach-marks'><h1>You are about to send a group message to [name1], [name2], and 2 others.</h1><p>Tip: you can use these <strong>handlebars</strong> to inject personalized content to each person. For example...</p><ul><li>{{first_name}}: The user's first name</li><li>{{employer}}: The user's listed workplace</li><li>{{custom_greeting}}: Use a greeting that you preset for each user</li><li><a href=''>Learn more about handlebars</a></li></ul></span>")
}

// $('html').on('DOMSubtreeModified', "._1q5-", function(event) {
// 	var inTree = $("._58-2.clearfix");
// 	if (inTree) {
// 		console.log("just entered new");
// 	}
// });

// $(window).on('change', function(e){
// 	console.log("yo");
//  //    var inTree = $("._58-2.clearfix");
// 	// if (inTree) {
// 	// 	console.log("just entered new yp");
// 	// }
// });


// var elementExists = $("find-me");
// $('html').on('DOMSubtreeModified', '._58-2.clearfix', function(event) {
//   // console.log(result);
//   var result = event.currentTarget;
//   if (result != undefined && result.childNodes != undefined) result = result.childNodes[0];
//   if (result != undefined && result.classList != undefined && result.classList.length == 3) result = result.classList[2];
//   if (result == "_5vn4");
//   console.log("yes");
// });