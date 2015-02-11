// JavaScript Document
$(document).on('pagebeforeshow', '#settings', function(){ 
	app_log('settings pagebeforeshow');

	app_log(user);
	
	$('#settings-firstname').val(user.firstname);
	$('#settings-lastname').val(user.lastname);
	$('#settings-email').val(user.email);
	$('#settings-address').val(user.address);
	$('#settings-city').val(user.city);
	//alert(user.state);
	$('#settings-state').val(user.state);
	$('#settings-zipcode').val(user.zipcode);	
	$('#settings-state').selectmenu('refresh');
	
	//$('#settings').page();
	
	$(document).on('click', '#settings-submit', function() { // catch the form's submit event
		// Send data to server through the Ajax call
		// action is functionality we want to call and outputJSON is our data
		var url = 'http://oneclick.iwssites.com/update_profile.php?login_key=' + window.localStorage.getItem("login_key");   
		
		app_log(url);

		$.ajax({
			url: url,
			dataType: "jsonp",
			async: true,
			data: $('#settings-form').serialize(),
			beforeSend: function() {
				// This callback function will trigger before data is sent
				$.mobile.loading('show', {theme:"a", text:"Please wait...", textonly:false, textVisible: true}); // This will show ajax spinner
			},
			complete: function() {
				// This callback function will trigger on data sent/received complete
				$.mobile.loading('hide'); // This will hide ajax spinner
			},               
			success: function (result) {
				app_log(result);
				
				user.firstname = $('#settings-firstname').val();
				user.lastname = $('#settings-lastname').val();
				user.email = $('#settings-email').val();	
				user.address = $('#settings-address').val();
				user.city = $('#settings-city').val();
				user.state = $('#settings-state').val();
				user.zipcode = $('#settings-zipcode').val();

				$.mobile.changePage("#actions");                        

			},
			error: function (request,error) {
				app_log(request);
				app_log(error);
				alert('Network error has occurred please try again!');
			}
		});


	});  
	
	
	
});

