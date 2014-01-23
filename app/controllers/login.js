exports.show = function() {
	$.loginWindow.open();
};

$.loginWindow.addEventListener('click', function(evt) {
	if (evt.source == $.loginWindow || evt.source == $.loginScroll) {
		$.loginWindow.close();
	}
});

$.confirmButton.addEventListener("click", function(){
	connection();
});

function connection() {
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			Ti.API.info("Received status: " + this.status);
			var toast = Titanium.UI.createNotification({
				duration: 700,
				message: "Connected"
			}).show();
			var monthController = Alloy.createController('month');
			monthController.show(this.responseText);
		},
		onerror : function(e) {
			Ti.API.info("Received text: " + this.responseText);
			Ti.API.info("Error: " + this.status);
			var toast = Titanium.UI.createNotification({
				duration: 700,
				message: "Connection error"
			}).show();
		},
		timeout : 5000
	});
	var params = {
		user_email: $.emailField.value,
		user_password: $.passwordField.value
	};
	client.open("GET", "http://sstimesheet.herokuapp.com/month.json");
	client.send(params);
}