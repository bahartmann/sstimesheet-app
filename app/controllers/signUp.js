exports.show = function() {
	$.signUpWindow.open();
};

$.confirmButton.addEventListener("click", function(){
	userSignUp();
});

function userSignUp() {
	if ($.passwordField.value == $.passwordConfirmationField.value){
		var monthController = Alloy.createController('month');
		monthController.show();
	} else {
		alert("Passwords don't match.");
	}
}
 
$.signUpWindow.addEventListener('click', function(evt) {
	if (evt.source == $.signUpWindow || evt.source == $.signUpScroll) {
		$.signUpWindow.close();
	}
});