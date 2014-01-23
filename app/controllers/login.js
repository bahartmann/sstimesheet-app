exports.show = function() {
	$.loginWindow.open();
};

$.loginWindow.addEventListener('click', function(evt) {
	if (evt.source == $.loginWindow || evt.source == $.loginScroll) {
		$.loginWindow.close();
	}
});

$.confirmButton.addEventListener("click", function(){
	var request = require('request').request;
	request.url = 'http://sstimesheet.herokuapp.com/month.json';
	request.params = {
		user_email: $.emailField.value,
		user_password: $.passwordField.value
	};
	request.success = function(e) {
		var monthController = Alloy.createController('month');
		monthController.show();
	};
	request.connect();
});