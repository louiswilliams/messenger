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
	$("._4_j4.clearfix").bind("DOMSubtreeModified", function() {
	    if (status == "multi") {
	    	$("._4rv3").css("display", "none");
	    }
	});
});

$(document).on("click", "._4bl8._4bl7", function() {
	if (status == "multi") {
		// this is for reversing from multi
		status = "single";
		loadSingleMessageView();
	}
});

function loadSingleMessageView() {
	// alert( "We nabbed the new message click." );
	$("._4rv3").css("display", "");
	$("._4_j4.clearfix").css("background","rgb(255, 255, 255)");
	$("#send_message").remove();
	$("#multi_message_text_holder").remove();
}

function loadMultiMessageView() {
	// below is the style of the last two buttons
	$("._4_j4.clearfix").children("._4bl9").append("<div id='multi_message_text_holder' style='bottom: 25; width: 100%;'><textarea id='multi_message' style='left: 0; right: 0; margin: 0px; width:100%; height: 3em;'></textarea></div>");
	$("._4_j4.clearfix").children("._4bl9").append("<a id='send_message''><div style='bottom: 0; width: 100%; height: 25px; position: fixed;'>Ship It</div></a>");
	$("._4rv3").css("display", "none");
	$("._4_j4.clearfix").css("background","rgb(203, 230, 254)");
	//$("._4bl9").replaceWith("<div id='tricks' stlye='background-color:red;'>Hello</div>");
}




function injectInitialView() {

	$("._36ic._5vn4.clearfix").prepend("<div><a id='new_message' style='float: left;'>Fuck It</a></div>");

	getPipelines(function (html) {
		var output = "<ul class='pipelines'> <li class='pipeline header'style='display: block; height: 30px; padding-bottom: 12px; '> <h1 style='text-align: center; font-size: 16px; font-weight: 500; padding-top: 5px;rgba(0, 0, 0, .40); '> Pipelines</h1> </li>"
			+ html + 
			"<li class='pipeline header' style='display: block; height: 30px; padding-bottom: 12px; '> <h1 style='text-align: center; font-size: 16px; font-weight: 500; padding-top: 5px;rgba(0, 0, 0, .40); '>Other Conversations</h1> </li> </ul>"; 
	
    	$("ul:first").before(output);
        $(".pipeline.entry:first").css("border-top", "0px");
        //pipelines hover/click functions
        $(".pipelines").children().hover(
          function() {
            $(this).css({
              "cursor": "pointer"
            });
          }, function() {
          }
        );
        $(".pipeline.entry").click(function() {
            $(".pipelines").children().css("background-color", "#ffffff");
            $(".pipelines").children().removeClass("selected");
            $(this).addClass("selected");
            $(".pipeline.entry.container.selected").css("background-color", "rgba(243, 243, 243, 1)");
            // code to swap pipeline sidebar here
        });
	})

}

function getPipelines(callback) {
	var pipelineCode = "";
	api.getPipelines(function (pipelines) {
		for (var x = 0; x < pipelines.length; x ++) {
			pipelineCode += "<li class='pipeline entry container' style='height: 71px; padding-left: 12px; border-top: 1px solid rgba(0, 0, 0, .10);'><div class='pipeline entry avatar' style='padding-top: 10px; float: left; padding-right: 9px; '> <img src='http://placehold.it/50x50' style='border-radius: 25px; '></img> </div> <div class='pipeline entry info' style='float: left; padding-top: 25px; '> <span style='display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: rgba(0, 0, 0, 1); font-size: 15px; font-weight: 400; line-height: 1.4; '>" + pipelines[x].name + "</span> </div></li>";
		}
		callback(pipelineCode);
	});
}




$(document).on("click", "#new_message", function() {
	// click the actual /new button
	if (status != "multi") {
		$(".img.sp_614YwBM1qJY.sx_a55cec").click();
		status = "multi";
		var checkExist = setInterval(function() {
			if ($('._2y8y.clearfix').length) {
		    	loadMultiMessageView();
		    	clearInterval(checkExist);
		    }
		}, 100); // check every 100ms for page to update
		// this code above could be useful
	}
});



$(document).on("click", '#send_message', function() {
	// send3TestMessages();

    if (status = "multi") {
    	var text = $('textarea#multi_message').val();
    }
    grabContactsAndSend(text);
    status = "null";
});
	

function grabContactsAndSend(message) {
	// var message = $("._54-z").children(0).children(0).children(0).children(0).text();
	var urlArray = [];
	$("._58-2.clearfix").children("span").each( function() {
		if ($(this).hasClass("_5vn4")) {
			console.log($(this));
			unformatted = $(this).attr("data-reactid");
			var id = unformatted.match(/\d{4,45}/)[0];
			var name = $(this).text();
			urlArray.push(getMessageUrl(id, message, name));
		}
	});

	var next = function(i) {
	    var win = window.open(urlArray[i]);
	    var timer = setInterval(function() {
	        if (win.closed) {
	            clearInterval(timer);
	            if (i + 1 < urlArray.length ) {
		            next(i+1);	            	
	            } else {
	            	return;
	            }

	        }
	    }, 500);    		
	}

	next(0);


}



function send3TestMessages() {
	var url1 = "https://www.facebook.com/messages/553235347?message=hey";
	var url2 = "https://www.facebook.com/messages/1508092452?message=what's up?";
	var url3 = "https://www.facebook.com/messages/679679450?message=yu chillin?";
    var urlArray = [];
    urlArray.push(url1);
    urlArray.push(url2);
    urlArray.push(url3);
    console.log(urlArray);

	var next = function(i) {
	    var win = window.open(urlArray[i]);
	    var timer = setInterval(function() {
	        if (win.closed) {
	            clearInterval(timer);
	            if (i + 1 < urlArray.length ) {
		            next(i+1);	            	
	            } else {
	            	return;
	            }

	        }
	    }, 500);    		
	}

	next(0);

}

function getMessageUrl(id, message, fullName) {
	var nameArray = fullName.split(" ");
	var mapping = {firstName : nameArray[0], lastName : nameArray[nameArray.length - 1], fullName : fullName};
	message = processMessage(message, mapping);
	sendUrl = baseFbUrl + id + "?message=" + message;
	return sendUrl
}


function sendMessage(id, message, fullName) {
	var nameArray = fullName.split(" ");
	var mapping = {firstName : nameArray[0], lastName : nameArray[nameArray.length - 1], fullName : fullName};
	message = processMessage(message, mapping);
	sendUrl = baseFbUrl + id + "?message=" + message;
	console.log("sending " + message + " to " + fullName);
	console.log(sendUrl);
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