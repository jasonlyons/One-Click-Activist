// JavaScript Document
$(document).on('pageinit', '#login', function(){ 
	$(document).on('click', '#login-submit', function() { // catch the form's submit event
		if($('#login-email').val().length > 0 && $('#login-password').val().length > 0){
			// Send data to server through the Ajax call
			// action is functionality we want to call and outputJSON is our data
				var url = 'http://oneclick.iwssites.com/login.php?e=' + $('#login-email').val() + '&p=' + $('#login-password').val();   
				
				app_log(url);
				
				try {
					$.ajax({
						url: url,
						dataType: "jsonp",
						async: true,
						beforeSend: function() {
							// This callback function will trigger before data is sent
							$.mobile.loading('show', {theme:"a", text:"Please wait...", textonly:false, textVisible: true}); // This will show ajax spinner
						},
						complete: function() {
							// This callback function will trigger on data sent/received complete
							$.mobile.loading('hide'); // This will hide ajax spinner
						},               
						success: function (result) {
							//app.showAlert(result);
							app_log(result);
							if(result.status == 'success') {
								try {
									dbShell.transaction(function(tx) {
										tx.executeSql("DELETE FROM login",[]);
										tx.executeSql("INSERT INTO login (email,login_key) values(?,?)",[$('#login-email').val(),result.login_key]);
									}, dbErrorHandler);
								} catch (e) {
									app_log(e);	
								}								
								
								$.mobile.changePage("#actions");                        
							} else {
								
								app.showAlert('Please Try again', 'Failure');
								$('#login-email').val('');
								$('#login-password').val('');
									
							}
						},
						error: function (request,error) {
							app_log(request);
							app_log(error);
							alert('Network error has occurred please try again!');
						}
					});


				} catch (e) {
					app_log(e);	
				}
		} else {
			alert('Please fill all necessary fields');
		}          
		return false; // cancel original event to prevent form submitting
	});   
});