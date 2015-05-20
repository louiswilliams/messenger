/**
 * Possible parameters for request:
 *  action: "xhttp" for a cross-origin HTTP request
 *  method: Default "GET"
 *  url   : required, but not validated
 *  data  : data to send in a POST request
 *
 * The callback function is called upon completion of the request */
chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    if (request.method == 'POST') {
        console.log(request.data);
        $.ajax({
            type: "POST",
            method: "POST",
            url: request.url,
            data: request.data,
            dataType: "json",
            success: function(result) { 
                console.log("yo");
                console.log(result);
                callback(result);
            }
        });
        return true;
        // $.ajax({
        //     type: 'POST',
        //     url: request.url,
        //     crossDomain: true,
        //     data: request.data,
        //     dataType: 'json',
        //     success: function(responseData, textStatus, jqXHR) {
        //         callback(responseData);
        //     },
        //     error: function (responseData, textStatus, errorThrown) {
        //         console.log("error");
        //         callback("error");
        //     }
        // });
    }
    // if (request.action == "xhttp") {
    //     var xhttp = new XMLHttpRequest();
    //     var method = request.method ? request.method.toUpperCase() : 'GET';

    //     xhttp.onload = function() {
    //         callback(xhttp.responseText);
    //     };
    //     xhttp.onerror = function() {
    //         // Do whatever you want on error. Don't forget to invoke the
    //         // callback to clean up the communication port.
    //         console.log("shits didn't work")
    //         callback();
    //     };
    //     xhttp.open(method, request.url, true);
    //     if (method == 'POST') {
    //         xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //     }
    //     xhttp.send(request.data);
    //     return true; // prevents the callback from being called too early on return
    // }
});