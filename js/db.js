// JavaScript Document
function setupTable(tx) {
		//tx.executeSql("DROP TABLE IF EXISTS login");
		tx.executeSql("CREATE TABLE IF NOT EXISTS login(id INTEGER PRIMARY KEY,email,login_key)");
}

function dbErrorHandler(err) {
	app.showAlert("DB Error: " + err.message + "\nCode = " + err.code);
	app_log(err);
}

function isLoggedIn() {
	try {
	dbShell.transaction(function(tx) {
tx.executeSql("SELECT * FROM login",[],isLoggedInQuerySuccess,dbErrorHandler);}, dbErrorHandler);
	} catch (e) {
		app_log(e);	
	}

}

function isLoggedInQuerySuccess(tx,results) {
	app_log("isLoggedInQuerySuccess");
	app_log(results);
	app_log(results.rows.length);
	
	alert(results.rows.item(0).login_key);
	alert(results.rows.item(0).email);
	
	
	if (results.rows.length == 0) {
		app_log("there is no login record");
		app.showAlert("there is no login record");	
	} else {
		app_log("isLoggedInQuerySuccess > 1");
		//app.showAlert("isLoggedInQuerySuccess");
		

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
					//app.showAlert(result);
					app_log(result);
					if (result)
						$.mobile.changePage('#actions');
					else
						$.mobile.changePage('#login');
				},
				error: function (request,error) {
					app_log(request);
					app_log(error);
					alert('Network error has occurred please try again!');
				}
			});
		
		
		
	}
}