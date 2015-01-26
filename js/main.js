// JavaScript Document
document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
	app_log("onDeviceReady");
	dbShell = window.openDatabase("OneClick", 2, "OneClick", 1000000);
	//run transaction to create initial tables
	dbShell.transaction(setupTable,dbErrorHandler,isLoggedIn);	
}

function app_log(something) { 
	if (something instanceof Date) { 
	  something = something.toDateString(); 
	} 
	
	if (typeof something == 'object') { 
	  something = JSON.stringify(something); 
	} 
	console.log(something); 
}


	