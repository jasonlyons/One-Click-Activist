// JavaScript Document
$(document).on('pageinit', '#create-account', function(){ 
	$(document).on('click', '#create-account-submit', function() { // catch the form's submit event
		if($('#create-account-email').val().length > 0 && $('#create-account-password').val().length > 0){
			// Send data to server through the Ajax call
			// action is functionality we want to call and outputJSON is our data
				var url = 'http://oneclick.iwssites.com/create_account.php';   
				
				var str = $('#create-account-form').serialize();
				
				app_log(str);
				
				try {
					$.ajax({
						url: url,
						type: 'POST',
						dataType: "jsonp",
						data: str,
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
							app_log("key");
							app_log(result);
							
							/*
							try {
								dbShell = window.openDatabase("OneClick", 2, "OneClick", 1000000);
							} catch (e) {
								app_log(e);	
							}
							*/
							alert(result.login_key);
											
							
							try {
								dbShell.transaction(function(tx) {
										tx.executeSql("DELETE FROM login",[]);
										tx.executeSql("INSERT INTO login (email,login_key) values(?,?)",[$('#create-account-email').val(),result.login_key]);
									}, dbErrorHandler);
							} catch (e) {
								app_log(e);	
							}
													
								
							$.mobile.changePage("#actions");                        

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