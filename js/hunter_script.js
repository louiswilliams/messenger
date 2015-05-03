var status = "null";
var accessToken = "6b34fe24ac2ff8103f6fce1f0da2ef57";
var url = "https://messenger.louiswilliams.org/user/" + accessToken;

var api = {
	getPipelines: function(callback) {
		$.get(url + "/pipelines", callback);
	},
	createPipeline: function(pipeline, callback) {
		$.post(url + "/pipeline", pipeline, callback)
	},
	getPipeline: function(pipelineId, callback) {
		$.get(url + "/pipeline/" + pipelineId, callback);
	},
	getState: function(stateId, callback) {
		$.get(url + "/state/" + stateId, callback);
	},
	getConversation: function(conversationId, callback) {
		$.get(url + "/conversation/" + conversationId, callback);
	}
}

$(document).ready(function() {
	injectInitialView();
});

$( "._4bl8._4bl7" ).click(function() {
	if (status == "new") {
		alert( "We nabbed the new message click." );
		$("._4_j4.clearfix").css("background","rgb(240, 158, 158)");
		$("#send_message").remove();
	}
});

function injectInitialView() {

	$("._36ic._5vn4.clearfix").prepend("<div><a id='new_message' style='float: left;'>Fuck It</a></div>");
	getPipelines(function (html) {
		var output = "<ul class='pipelines'> <li class='pipeline header'style='display: block; height: 30px; padding-bottom: 12px; '> <h1 style='text-align: center; font-size: 16px; font-weight: 500; padding-top: 5px;rgba(0, 0, 0, .40); '> Pipelines</h1> </li>"
				+ html + 
				"<li class='pipeline header' style='display: block; height: 30px; padding-bottom: 12px; '> <h1 style='text-align: center; font-size: 16px; font-weight: 500; padding-top: 5px;rgba(0, 0, 0, .40); '>Other Conversations</h1> </li> </ul>"; 
		$("ul:first").before(output);
	})

}

function getPipelines(callback) {
	var pipelineCode = "";
	api.getPipelines(function (pipelines) {
		for (var x = 0; x < pipelines.length; x ++) {
			pipelineCode += "<li class='pipeline entry' style='height: 71px; padding-left: 12px; '> <div class='pipeline entry avatar' style='padding-top: 10px; float: left; padding-right: 9px; '> <img src='http://placehold.it/50x50' style='border-radius: 25px; '></img> </div> <div class='pipeline entry info' style='float: left; padding-top: 25px; '> <span style='display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: rgba(0, 0, 0, 1); font-size: 15px; font-weight: 400; line-height: 1.4; '>" + pipelines[x].name + "</span> </div> </li>";
		}
		callback(pipelineCode);
	});
}

function injectNewMessageView() {
	$("._4_j4.clearfix").css("background","rgb(255, 255, 255)");
	$("._2y8y.clearfix").attr("style", "margin-left: 40px;");
	$("._1q5-").prepend("<div><a id='send_message' style='float: left; padding-top: 20px;'>Ship It</a></div>");
	//$("._4bl9").replaceWith("<div id='tricks' stlye='background-color:red;'>Hello</div>");
}

$(document).on("click", "#new_message", function() {
	// click the actual /new button
	if (status != "new") {
		$(".img.sp_614YwBM1qJY.sx_a55cec").click();
		status = "new";
		var checkExist = setInterval(function() {
			if ($('._2y8y.clearfix').length) {
		    	injectNewMessageView();
		    	clearInterval(checkExist);
		    }}, 100); // check every 100ms for page to update
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
	var nameArray = fullName.split(" ");
	var mapping = {firstName : nameArray[0], lastName : nameArray[nameArray.length - 1], fullName : fullName};
	message = processMessage(message, mapping);
	sendUrl = baseFbUrl + id + "?message=" + message;
	openInNewTab(sendUrl);
}

function processMessage(message, mapping) {
	for (var key in mapping) {
    	var attrName = key;
        var attrValue = mapping[key];
        var attrName = "{{" + attrName + "}}";
        message = message.replace(attrName, attrValue);
    }
    return message;
}

var baseFbUrl = "https://www.facebook.com/messages/"

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  // win.focus();
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