exports.show = function() {
	$.loginWindow.open();
};

$.confirmButton.addEventListener("click", function(){
	userLogin();
});

function userLogin() {
	if ($.emailField.value == "teste" && $.passwordField.value == "teste"){
		var monthController = Alloy.createController('month');
		monthController.show();
	} else {
		alert("Invalid email or password.");
	}
}
 
$.loginWindow.addEventListener('click', function(evt) {
	if (evt.source == $.loginWindow || evt.source == $.loginScroll) {
		$.loginWindow.close();
	}
});
