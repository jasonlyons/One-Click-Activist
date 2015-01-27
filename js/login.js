// JavaScript Document
$(document).on('pageinit', '#login', function(){ 
	$(document).on('click', '#login-submit', function() { // catch the form's submit event
		if($('#login-email').val().length > 0 && $('#login-password').val().length > 0){
			// Send data to server through the Ajax call
			// action is functionality we want to call and outputJSON is our data
				var url = 'http://oneclick.iwssites.com/login.php?e=' + $('#login-email').val() + '&p=' + $('#login-password').val();   
			
				$.ajax({url: url,
					data: {e : $('#login-email').val(), p : $('#login-password').val()},
					type: 'post',                  
					async: 'true',
					dataType: 'json',
					beforeSend: function() {
						// This callback function will trigger before data is sent
						$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
					},
					complete: function() {
						// This callback function will trigger on data sent/received complete
						$.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
					},
					success: function (result) {
						app_log(result);
						
						if(result.status == 'success') {
							$.mobile.changePage("#actions");                        
						}
						
						
						
					},
					error: function (request,error) {
						// This callback function will trigger on unsuccessful action               
						alert('Network error has occurred please try again!');
					}
				});                  
		} else {
			alert('Please fill all necessary fields');
		}          
		return false; // cancel original event to prevent form submitting
	});   
});