// JavaScript Document
function setupTable(tx) {
	app_log("setupTable");
	tx.executeSql("CREATE TABLE IF NOT EXISTS login(id INTEGER PRIMARY KEY,username,login_key)");
	tx.executeSql("INSERT INTO login (username,login_key) values(?,?)",['jclyo1','123mykey']);
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
		app.showAlert(results.rows.item(0).login_key);	
	}
}