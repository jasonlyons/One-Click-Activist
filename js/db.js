function dbErrorHandler(err) {
	app.showAlert("DB Error: " + err.message + "\nCode = " + err.code);
	app_log(err);
}

function isLoggedIn() {

	email = window.localStorage.getItem("email");
	login_key = window.localStorage.getItem("login_key");

	app_log("IsLoggedIn");

	 if (email != '' && login_key != '') {
		var url = 'http://oneclick.iwssites.com/check_login.php?e=' + email + '&k=' + login_key;   
		
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
				
				app_log("isLoggedIn -> check_login.php success");
				
				app_log(result);
				if( result.status == 'success') {
					user.firstname = result.firstname;
					user.lastname = result.lastname;
					user.email = result.email;
					user.address = result.address;
					user.city = result.city;
					user.state = result.state;
					user.zipcode = result.zipcode;
					
					$.mobile.changePage('#actions');
				} else {
					window.localStorage.clear();
					$.mobile.changePage('#login');
				}
			},
			error: function (request,error) {
				app_log(request);
				app_log(error);
				alert('Network error has occurred please try again!');
			}
		});
			 
	 } else {
		window.localStorage.clear();
		$.mobile.changePage('#login');	 
	 }
	

}
