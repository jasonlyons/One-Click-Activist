// JavaScript Document
function setupTable(tx) {
	app_log("setupTable");
	tx.executeSql("DROP TABLE IF EXISTS login");
	tx.executeSql("CREATE TABLE IF NOT EXISTS login(id INTEGER PRIMARY KEY,email,login_key)");
	tx.executeSql("INSERT INTO login (email,login_key) values(?,?)",['jason@workwithiws.com','123mykey']);
}

function dbErrorHandler(err) {
	app.showAlert("DB Error: " + err.message + "\nCode = " + err.code);
	app_log(err);
}

function isLoggedIn() {
	app_log("success");
	
	dbShell.transaction(function(tx) {
tx.executeSql("SELECT * FROM login",[],isLoggedInQuerySuccess,dbErrorHandler);}, dbErrorHandler);

}

function isLoggedInQuerySuccess(tx,results) {
	if (results.rows.length == 0) {
		app.showAlert("there is no login record");	
	} else {
		//app.showAlert(results.rows.item(0).login_key);	
		var url = 'http://oneclick.iwssites.com/check_login.php?e=' + results.rows.item(0).email + '&k=' + results.rows.item(0).login_key;   
		
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
				app.showAlert(result);
			},
			error: function (request,error) {
				console.log(request);
				console.log(error);
				alert('Network error has occurred please try again!');
			}
		});
		
		
	}
}