// JavaScript Document
if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
	document.addEventListener("deviceready",onDeviceReady,false);
} else {
	$(document).ready(function() {
		onDeviceReady();
	});
}

function onDeviceReady() {
	app_log("onDeviceReady");
	isLoggedIn();
}

function app_log(something) { 
	if (something instanceof Date) { 
	  something = something.toDateString(); 
	} 
	
	if (typeof something == 'object') { 
	  something = JSON.stringify(something); 
	} 
	console.log(something); 
}

var app = {

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    }
}
	