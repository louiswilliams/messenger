var status = "null";
var accessToken = "6b34fe24ac2ff8103f6fce1f0da2ef57";
var url = "https://messenger.louiswilliams.org/user/" + accessToken;
var activePipeline;

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
    getStates: function(pipelineId, callback) {
        $.get(url + "/pipeline/" + pipelineId + "/states", callback);
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
    $("._2y8z._4bl7").empty();
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
    $("._2y8z._4bl7").html("<span id='back_btn' style='border-radius: 44px; color: rgb(8, 136, 255); font-size: 14px;   padding: 5px 10px 4px 10px; margin-right: 1em; border: solid rgb(8, 136, 255) 2px; text-decoration: none;'>Cancel</span>" + "To:");
    $("#back_btn").hover(
      function() {
        $(this).css({
          "background-color": "rgb(8, 136, 255)",
            "color": "#ffffff",
            "cursor": "pointer"
        });
      }, function() {
        $(this).css({
          "background-color": "#ffffff",
            "color": "rgb(8, 136, 255)"
        });
      }
    );
    $("#back_btn").click(function() {
        location.reload();
    });
}




function injectInitialView() {
    $("a[aria-label='New Message']").before("<a id='new_message' style='float: left;'><img src='https://raw.githubusercontent.com/encharm/Font-Awesome-SVG-PNG/master/black/png/32/paper-plane.png'></img></a>");
	//$("._36ic._5vn4.clearfix").prepend("<div><a id='new_message' style='float: left;'><img src='http://placehold.it/32x32'></img></a></div>");

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

        $(".pipeline.entry.container").click(function() {    
            if (typeof(activePipeline) == "undefined" || activePipeline != $(this).data("index")) {
                $(".pipeline.entry.container").removeClass("selected");
                $(this).addClass("selected");
                $(".pipeline.entry.container").next(".pipeline-dropdown").slideUp(250);

                $(this).next(".pipeline-dropdown").slideDown(250);

                activePipeline = $(this).data("index");
            } else {
                $(this).removeClass("selected");
                $(this).next(".pipeline-dropdown").slideUp(250);

                activePipeline = undefined;

            }
            $(".pipeline.entry.container").css("background-color", "#ffffff");
            $(".pipeline.entry.container.selected").css("background-color", "rgba(243, 243, 243, 1)");

            // code to swap pipeline sidebar here
        });
	})

}
function getPipelines(callback) {
	var pipelineCode = "";
	api.getPipelines(function (pipelines) {
		for (var x = 0; x < pipelines.length; x ++) {

            console.log(pipelines[x]);
            var stateHtml = "<ul class='state-list'>";
            for (var s = 0; s < pipelines[x].states.length; s++) {
                stateHtml += "<li style='text-align: center; font-size: 16px; font-weight: 500; padding-top: 5px; background-color: hsl(" + ((s * 50) % 360) + ", 100%, 90%);'>" + pipelines[x].states[s].name+ generateStateEntries();
                     + "</li>";
                 }
            stateHtml += "</ul>";

            pipelineCode += "<li class='pipeline entry container' data-index='"
                + x + "' style='height: 71px; padding-left: 12px; border-top: 1px solid rgba(0, 0, 0, .10);'><div class='pipeline entry avatar' style='padding-top: 10px; float: left; padding-right: 9px; '> <img src='http://placehold.it/50x50' style='border-radius: 25px; '></img> </div> <div class='pipeline entry info' style='float: left; padding-top: 25px; '> <span style='display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: rgba(0, 0, 0, 1); font-size: 15px; font-weight: 400; line-height: 1.4; '>" + pipelines[x].name + "</span> </div></li>";
            pipelineCode += "<div class='pipeline-dropdown' style='display:none'>" + stateHtml + "</div>";
		}

        callback(pipelineCode);

	});
}

function generateStateEntries() {
    var entries = "<ul class='states'>";
    for (var i=0;i<3;i++) {
        entries += "<li class='state entry container' data-index='"+ i + "' style='height: 48px; padding-left: 72px; border-top: 1px solid rgba(0, 0, 0, .10); background-color: #ffffff;'><div class='state entry avatar' style='padding-top: 8px; float: left; padding-right: 8px; '> <img src='http://placehold.it/32x32' style='border-radius: 16px; '></img> </div> <div class='states entry info' style='float: left; padding-top: 14px; '> <span style='display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: rgba(0, 0, 0, 1); font-size: 14px; font-weight: 400; line-height: 1.4; '>" + "state test" + i + "</span> </div></li>";
    }
    entries += "</ul>";
    return entries;
}

$(document).on("click", "#new_message", function() {
	// click the actual /new button
	if (status != "multi") {
		$(".img.sp_614YwBM1qJY.sx_a55cec").click();
		var checkExist = setInterval(function() {
			if ($('._2y8y.clearfix').length) {
		    	loadMultiMessageView();
                status = "multi";
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