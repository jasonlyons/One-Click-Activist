// JavaScript Document
if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
	document.addEventListener("deviceready",onDeviceReady,false);
} else {
	$(document).ready(function() {
		onDeviceReady();
	});
}

function onDeviceReady() {
	if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
		initPushwoosh();
	}
	
	user = {};
	
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


function initPushwoosh() {
    var pushNotification = window.plugins.pushNotification;
 
    //set push notification callback before we initialize the plugin
    document.addEventListener('push-notification', function(event) {
                                var notification = event.notification;
								 app_log(notification);
								 app_log(notification.u.action_id);		 
								 
								app_log("push-notification INSIDE of deviceready"); 
								 
								 //app.showAlert(notification.aps.alert,"Alert!");
								 pushNotification.setApplicationIconBadgeNumber(0);
								 
								active_action_id = notification.u.action_id;
											
								$('#action-detail .ui-content').html("description here");
								$('#action-detail .take-action').html("action btn text");
								
								$.mobile.changePage('#action-detail');
                            });
 
    //initialize the plugin
    pushNotification.onDeviceReady({pw_appid:"A4717-E85B7"});
     
    //register for pushes
    pushNotification.registerDevice(
        function(status) {
            var deviceToken = status['deviceToken'];
            console.warn('registerDevice: ' + deviceToken);
        },
        function(status) {
            console.warn('failed to register : ' + JSON.stringify(status));
            alert(JSON.stringify(['failed to register ', status]));
        }
    );
     
    //reset badges on app start
    pushNotification.setApplicationIconBadgeNumber(0);
}
	
document.addEventListener('push-notification', function(event) {
             var notification = event.notification;
             app_log(notification);
			 app_log(notification.u.action_id);		 
			 
			app_log("push-notification outside of deviceready"); 
			 
			 //app.showAlert(notification.aps.alert,"Alert!");
             pushNotification.setApplicationIconBadgeNumber(0);
			 
			active_action_id = notification.u.action_id;
						
			$('#action-detail .ui-content').html("description here");
			$('#action-detail .take-action').html("action btn text");
			
			$.mobile.changePage('#action-detail');
			
			 
});	

$(document).on('click', '#logout', function() { 
	window.localStorage.clear();
});