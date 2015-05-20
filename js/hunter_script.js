var status = "null";
var accessToken = "6b34fe24ac2ff8103f6fce1f0da2ef57";
var url = "https://messenger.louiswilliams.org/user/" + accessToken;
var activePipeline;
var lastId;
var myUserId;
// commented out code references pipeline process that is being removed now
// but not permanently


function getRandomToken() {
    // E.g. 8 * 32 = 256 bits token
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
    return hex;
}

chrome.storage.sync.get('userid', function(items) {
    var userid = items.userid;
    if (userid) {
        useToken(userid);
    } else {
        userid = getRandomToken();
        chrome.storage.sync.set({userid: userid}, function() {
            useToken(userid);
        });
    }
    function useToken(userid) {
        console.log("shimmy running for : " + userid);
        myUserId = userid;
    }
});



// var api = {
// 	getPipelines: function(callback) {
// 		$.get(url + "/pipelines", callback);
// 	},
// 	createPipeline: function(pipeline, callback) {
// 		$.post(url + "/pipeline", pipeline, callback)
// 	},
// 	getPipeline: function(pipelineId, callback) {
// 		$.get(url + "/pipeline/" + pipelineId, callback);
// 	},
//     getStates: function(pipelineId, callback) {
//         $.get(url + "/pipeline/" + pipelineId + "/states", callback);
//     },
// 	getState: function(stateId, callback) {
// 		$.get(url + "/state/" + stateId, callback);
// 	},
// 	getConversation: function(conversationId, callback) {
// 		$.get(url + "/conversation/" + conversationId, callback);
// 	}
// }

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
		removeInputsFromNames();
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
    $("._4_j4.clearfix").children("._4bl9").append("<div id='multi_message_text_holder' style='bottom: 25; width: 100%;'><textarea id='multi_message' style='width: 100%; height: 140px; bottom: 5em; position: absolute; font-size: 14px; padding-left: 12px; padding-top: 24px; padding-bottom: 24px;' placeholder='Type your group message here...'></textarea></div>"); $("#multi_message").css("font-family", "Helvetica Neue");
    $("._4_j4.clearfix").children("._4bl9").append("<a id='send_message'><div style='bottom: 0; height: 25px; position: fixed; border-radius: 22px; color: #ffffff; background: rgb(8, 136, 255); padding: 13px 15px 6px 15px; text-decoration: none; bottom: 13px; margin-left: 13px;}'>Ship It</div></a>"); $("._4rv3").css("display", "none"); $("._4_j4.clearfix").css("background","rgb(235, 246, 255)"); //$("._4bl9").replaceWith("<div id='tricks' stlye='background-color:red;'>Hello</div>");
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
    addInputsToNames();
}




function injectInitialView() {
    $("a[aria-label='New Message']").before("<a id='new_message' style='float: left;'><img src='https://raw.githubusercontent.com/encharm/Font-Awesome-SVG-PNG/master/black/png/32/paper-plane.png'></img></a>");
	//$("._36ic._5vn4.clearfix").prepend("<div><a id='new_message' style='float: left;'><img src='http://placehold.it/32x32'></img></a></div>");

    // ***THIS CODE IS FOR PIPELINE***$("ul:first").before(
    //     "<ul class='pipelines'>" +
    //         "<li class='pipeline header' style='display: block; height: 30px; padding-bottom: 12px; '>" +
    //             "<h1 style='text-align: center; font-size: 16px; font-weight: 500; padding-top: 5px;rgba(0, 0, 0, .40); '> Pipelines</h1>" +
    //         "</li>" +
    //         "<li class='pipeline header' style='display: block; height: 30px; padding-bottom: 12px; '>" +
    //             "<h1 style='text-align: center; font-size: 16px; font-weight: 500; padding-top: 5px;rgba(0, 0, 0, .40); '>Other Conversations</h1>" +
    //         "</li>" +
    //     "</ul>"
    // );
	// ***THIS CODE IS FOR PIPELINE***getPipelines(function (html) {
	// 	$("ul.pipelines li.pipeline.header:last").before(html);
    	
 //    });

    // ***THIS CODE IS FOR PIPELINE***$(".pipeline.entry:first").css("border-top", "0px");
    //pipelines hover/click functions
    // ***THIS CODE IS FOR PIPELINE***$(".pipelines").on({
    //     mouseenter: function() {
    //         $(this).children(".pipeline.entry.container").css({
    //           "cursor": "pointer"
    //         });
    //     },
    //     mouseleave: function() {
    //         $(this).children(".pipeline.entry.container").css({
    //             "cursor": "default"
    //         });
    //     },
    // });

    // ***THIS CODE IS FOR PIPELINE***$(".pipelines").on("click", ".pipeline.entry.container", function() {    
    //     if (typeof(activePipeline) == "undefined" || activePipeline != $(this).data("index")) {
    //         $(".pipeline.entry.container").removeClass("selected");
    //         $(this).addClass("selected");
    //         $(".pipeline.entry.container").next(".pipeline-dropdown").slideUp(250);

    //         $(this).next(".pipeline-dropdown").slideDown(250);

    //         activePipeline = $(this).data("index");
    //     } else {
    //         $(this).removeClass("selected");
    //         $(this).next(".pipeline-dropdown").slideUp(250);

    //         activePipeline = undefined;

    //     }
    //     $(".pipeline.entry.container").css("background-color", "#ffffff");
    //     $(".pipeline.entry.container.selected").css("background-color", "rgba(243, 243, 243, 1)");

    //     // code to swap pipeline sidebar here
    // });

}
// ***THIS CODE IS FOR PIPELINE***function getPipelines(callback) {
// 	api.getPipelines(function (pipelines) {

// 		for (var x = 0; x < pipelines.length; x ++) {


//             (function (x) {
//                 var pipeline = pipelines[x];
//                 var pipelineCode = "";

//                 api.getStates(pipeline._id, function (states) {
//                     console.log("states", states);

//                     var stateHtml = "<ul class='state-list'>";
                    
//                     for (var s = 0; s < states.length; s++) {
//                         stateHtml += "<li style='text-align: center; font-size: 16px; font-weight: 500; padding-top: 5px; background-color: hsl(" + ((s * 50) % 360) + ", 100%, 90%);'>" + states[s].name+ generateStateEntries(states[s].conversations);
//                              + "</li>";
//                          }
//                     stateHtml += "</ul>";

//                     pipelineCode +=
//                     "<li class='pipeline entry container' data-index='" + x + "' style='height: 71px; padding-left: 12px; border-top: 1px solid rgba(0, 0, 0, .10);'>" +
//                         "<div class='pipeline entry avatar' style='padding-top: 10px; float: left; padding-right: 9px; '>" +
//                             "<img src='" + pipeline.image + "' style='height: 50px; width: 50px;'></img>" +
//                         "</div>" + 
//                         "<div class='pipeline entry info' style='float: left; padding-top: 25px; '>" +
//                             "<span style='display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: rgba(0, 0, 0, 1); font-size: 15px; font-weight: 400; line-height: 1.4; '>" + pipelines[x].name + "</span>" + 
//                         "</div>" +
//                     "</li>" + 
//                     "<div class='pipeline-dropdown' style='display:none'>" + stateHtml + "</div>";

//                     callback(pipelineCode);

//                 });
//             })(x);



// 		}


// 	});
// }

// ***THIS CODE IS FOR PIPELINE***function generateStateEntries(conversations) {
//     var entries = "<ul class='states'>";
//     for (var i=0; i < conversations.length; i++) {
//         entries += "<li class='state entry container' data-index='"+ i + "' style='height: 48px; padding-left: 72px; border-top: 1px solid rgba(0, 0, 0, .10); background-color: #ffffff;'><div class='state entry avatar' style='padding-top: 8px; float: left; padding-right: 8px; '> <img src='" + conversations[i].image + "' style='border-radius: 16px; height: 32px; width: 32px'></img> </div> <div class='states entry info' style='float: left; padding-top: 14px; '> <a style='display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: rgba(0, 0, 0, 1); font-size: 14px; font-weight: 400; line-height: 1.4; ' href='/t/" + conversations[i].facebookId + "'>" + conversations[i].name + "</a> </div></li>";
//     }
//     entries += "</ul>";
//     return entries;
// }

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
	// send3TestMessages();
	// var inputName = "#prefNameFor" + lastId;
	// var prefName = $(inputName).val();
	// console.log("inputName: " + inputName + " prefName: " + prefName);

	// uncomment next code in production
    if (status = "multi") {
    	var text = $('textarea#multi_message').val();
    }
    grabContactsAndSend(text);
    status = "null";
});
	

function grabContactsAndSend(message) {
	// var message = $("._54-z").children(0).children(0).children(0).children(0).text();
	var urlArray = [];
	var updatedPrefNames = [];
	$("._58-2.clearfix").children("span").each( function() {
		if ($(this).hasClass("_5vn4")) {
			// console.log($(this));
			unformatted = $(this).attr("data-reactid");
			var id = unformatted.match(/\d{4,45}/)[0];
			var name = $(this).text();
			var prefName = $("#prefNameFor" + id).val();
			urlArray.push(getMessageUrl(id, message, name, prefName));
			updatedPrefNames.push({ "userId" : myUserId,
										  "nameId" : id,
										  "preferredName" : prefName});
		}
	});


	// $.post("http://localhost:3003/names/find", {names : JSON.stringify(updatedPrefNames)}, function() {
	// 	console.log("sent");
	// })
	// .done(function(data) {
 //    	console.log("recieved results : " + data);
	// })
	// .fail(function() {
	//     alert( "error" );
	// });

	for (key in updatedPrefNames) {
		var updateInfo = updatedPrefNames[key];

        chrome.storage.sync.get(updateInfo.nameId, function(items) {
        	newKeyValuePair = {};
        	newKeyValuePair[updateInfo.nameId] = updateInfo.preferredName;
        	console.log(newKeyValuePair);
	        chrome.storage.sync.set(newKeyValuePair, function() {
	            console.log("maybe adding ");
	        });
		});
   	}


	// console.log(JSON.stringify(updatedPrefNames));
	// chrome.runtime.sendMessage({
	//     method: 'POST',
	//     url: 'http://localhost:3003/names/set',
	//     data: JSON.stringify(updatedPrefNames)
	// }, function(response) {
	// 	console.log(response);
	// });

	var next = function(i) {
	    var win = window.open(urlArray[i]);
	    var timer = setInterval(function() {
	        if (win.closed) {
	            clearInterval(timer);
	            if (i + 1 < urlArray.length ) {
		            next(i+1);	            	
	            } else {
	            	location.reload();
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

function getMessageUrl(id, message, fullName, prefName) {
	var nameArray = fullName.split(" ");
	var mapping = {firstName : nameArray[0], lastName : nameArray[nameArray.length - 1], fullName : fullName, nickName : prefName};
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
var numSendees = 0;

// var elementExists = $("find-me");
$('html').on('DOMSubtreeModified', '._58-2.clearfix', function(event) {
	// console.log(result);
	if (status != "multi") return false;
	if (this != undefined && this.childNodes != undefined) {
		var nameCount = $(this).children('span').length - 2;
		if (nameCount == numSendees) return false;
		else if (nameCount < numSendees) {
			numSendees = nameCount;
			return false;
		}
		// if the code continues then there has been a name added to the 
		// number of names in send thing
		addInputsToNames();
		// a change was made, update
		// this current way to update will fuck up changes made to preferred names
	}
});

function addInputsToNames() {
	// iterating names in headers
	$("._58-2.clearfix").children("span").each( function() {
		if ($(this).hasClass("_5vn4")) {
			// console.log($(this));

			if (! $(this).has("input").length) {
				unformatted = $(this).attr("data-reactid");
				var id = unformatted.match(/\d{4,45}/)[0];
				var name = $(this).text();
				var htmlForInput = '<span class="_14-9" style="color: #2F2F2F;"> {{nickName}}: </span><input id="prefNameFor' + id + '" aria-autocomplete="list" aria-owns="js_w" role="combobox" placeholder="" autocomplete="off" autocorrect="off" value="" type="text" class="_14-9._58al" data-reactid=".0.1" style="width: 70px;color: #2F2F2F;   font-size: 14px;border: 0;background: transparent;">';
				$(this).append(htmlForInput);

				// database lookup here

				// $.post("http://localhost:3003/names/find", {userId : myUserId, nameId : id}, function() {
				// 	console.log("sent");
				// })
				// .done(function(data) {
			 //    	console.log("recieved results : " + data);
				// })
				// .fail(function() {
				//     alert( "error" );
				// });

				console.log("checking for " + id);
				chrome.storage.sync.get(id, function(items) {
				    var nickName = items[id];
				    console.log(nickName);
				    if (nickName && nickName !== undefined) {
				        $("#prefNameFor" + id).val(nickName);
				    } else {
				        var nameArray = name.split(" ");
						$("#prefNameFor" + id).val(nameArray[0]);
				    }
				});

				// chrome.runtime.sendMessage({
				//     method: 'POST',
				//     action: 'xhttp',
				//     url: 'http://localhost:3003/names/find',
				//     data: JSON.stringify({'userId' : myUserId, 'nameId' : id})
				// }, function(response) {
				// 	if (response.preferredName) {
				// 		$("#prefNameFor" + id).val(response.preferredName);
				// 	} else {
						
				// 	}
				// 	lastId = id;
				// });
				// chrome.runtime.sendMessage({
				//     method: 'POST',
				//     url: 'http://localhost:3003/names/find',
				//     data: {'userId' : myUserId, 'nameId' : id}
				// }, function(responseText) {
				//     console.log(responseText);
				// });



				
			}
		}
	});
}

function removeInputsFromNames() {
	$("._58-2.clearfix").children("span").each( function() {
		if ($(this).hasClass("_5vn4")) {
			// console.log($(this));
			if ($(this).has("input").length) {
				$(this).children("input").remove();
			}
		}
	});
}
 

