var request = {
	method: 'GET',
	url: 'http://sstimesheet.herokuapp.com/month.json',
	params: {},	
	connect: function() {
		var client = createClient();		
		client.open(request.method, request.url);
		client.send(request.params);
	}
};

exports.request = request;

function createClient(){
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
	return client;
};