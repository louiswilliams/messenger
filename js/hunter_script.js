var status = "null";

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
    var output = "<ul class='pipelines'> <li class='pipeline header'style='display: block; height: 30px; padding-bottom: 12px; '> <h1 style='text-align: center; font-size: 16px; font-weight: 500; padding-top: 5px;rgba(0, 0, 0, .40); '> Pipelines</h1> </li>"
                + getPipelines() + 
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
        $(".pipeline.entry.selected").css("background-color", "rgba(243, 243, 243, 1)");
        // code to swap pipeline sidebar here
    });
}

function getPipelines() {
    var pipelineCode = "";
    var pipelineName = ["Gaming", "Fundraising", "Recruiting", "Balling"];
    for (var x = 0; x < pipelineName.length; x ++) {
        pipelineCode += "<li class='pipeline entry' style='height: 71px; padding-left: 12px; border-top: 1px solid rgba(0, 0, 0, .10);'><div class='pipeline entry avatar' style='padding-top: 10px; float: left; padding-right: 9px; '> <img src='http://placehold.it/50x50' style='border-radius: 25px; '></img> </div> <div class='pipeline entry info' style='float: left; padding-top: 25px; '> <span style='display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: rgba(0, 0, 0, 1); font-size: 15px; font-weight: 400; line-height: 1.4; '>" + pipelineName[x] + "</span> </div></li>";
    }
    return pipelineCode;
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
    var text = $('textarea#multi_message').val();
    grabContactsAndSend(text);
});
	

function grabContactsAndSend(message) {
	// var message = $("._54-z").children(0).children(0).children(0).children(0).text();

	$("._58-2.clearfix").children("span").each( function() {
		if ($(this).hasClass("_5vn4")) {
			// console.log($(this));
			unformatted = $(this).attr("data-reactid");
			var id = unformatted.match(/\d{4,45}/)[0];
			var name = $(this).text();
			sendMessage(id, message, name);
		}
		status = "null";
		location.reload();
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