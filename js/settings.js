// JavaScript Document
$(document).on('pageinit', '#settings', function(){ 
	$('#settings-firstname').val(user.firstname);
	$('#settings-lastname').val(user.lastname);
	$('#settings-email').val(user.email);
	$('#settings-address').val(user.address);
	$('#settings-city').val(user.city);
	$('#settings-state').val(user.state);
	$('#settings-zipcode').val(user.zipcode);
});