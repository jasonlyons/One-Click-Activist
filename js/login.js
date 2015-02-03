// JavaScript Document
var user = {
	firstname : '',
	lastname : '',
	password : '',
	address : '',
	city : '',
	state : '',
	zipcode : ''	
};

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

							
							if(result.status == 'success') {
								window.localStorage.setItem('email',$('#login-email').val());
								window.localStorage.setItem('login_key',result.login_key);
								
								user.firstname = result.firstname;
								user.lastname = result.lastname;
								user.email = result.email;
								user.address = result.address;
								user.city = result.city;
								user.state = result.state;
								user.zipcode = result.zipcode;
								
								$.mobile.changePage("#actions");                        
							} else {
								window.localStorage.clear();
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