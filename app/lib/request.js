var request = {
	method: 'GET',
	url: 'http://sstimesheet.herokuapp.com/month.json',
	success: null,
	error: null,
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
			if(request.success) {
				request.success(this);
			}
		},
		onerror : function(e) {
			Ti.API.info("Received text: " + this.responseText);
			Ti.API.info("Error: " + this.status);
			var toast = Titanium.UI.createNotification({
				duration: 700,
				message: "Connection error"
			}).show();
			if(request.error) {
				request.error(this);
			}
		},
		timeout : 5000
	});
	return client;
};