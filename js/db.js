// JavaScript Document
function setupTable(tx) {
	app_log("setupTable");
	tx.executeSql("CREATE TABLE IF NOT EXISTS login(id INTEGER PRIMARY KEY,username,login_key)");
}

function dbErrorHandler(err) {
	alert("DB Error: " + err.message + "\nCode = " + err.code);
	app_log(err);
}

function isLoggedIn() {
	app_log("success");
	
	dbShell.transaction(function(tx) {
tx.executeSql("SELECT * FROM login",[],isLoggedInQuerySuccess,dbErrorHandler);}, dbErrorHandler);

}

function isLoggedInQuerySuccess(tx,results) {
	if (results.rows.length == 0) {
		alert("there is no login record");	
	} else {
		alert(results.rows.item(0).login_key);	
	}
}