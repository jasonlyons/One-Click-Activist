// JavaScript Document
var actions;

$(document).on('pageinit', '#actions', function(e, data){ 

	var url = 'http://oneclick.iwssites.com/actions.php';   
				
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
			app_log(result);
			actions = result;
			var markup,	numItems = result.length;
	
			markup = '<ul data-role="listview"id="actions-list">';
	
			// Generate a list item for each item in the category
			// and add it to our markup.
			for ( var i = 0; i < numItems; i++ ) {
				markup += "<li><a href='#action-detail' data-id='" + result[i].ID + "'>" + result[i].title + "</a></li>";
			}
			
			markup += "</ul>";
		
			
			$('#actions .ui-content').append(markup);
			$('#actions').page();
			$('#actions-list').listview();
			
			$.mobile.changePage('#actions');
		  },
		  error: function (request,error) {
			  app_log(request);
			  app_log(error);
			  alert('Network error has occurred please try again!');
		  }
	});	
	
	
	e.preventDefault();
	
});


$(document).on('click', '#actions-list a', function() { 
	var ID = $(this).attr('data-id'), description;

	for ( var i = 0; i < actions.length; i++ ) {
		if (actions[i].ID == ID) {
			description = actions[i].description;
			action_button = actions[i].action_button;
		}
	}
		
	$('#action-detail .ui-content').html(description);
	$('#action-detail .take-action').html(action_button);
	
});