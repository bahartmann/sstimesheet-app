$.indexWindow.orientationModes = [Titanium.UI.PORTRAIT];
$.indexWindow.open();

function userLogin() {
	var loginController = Alloy.createController('login');
	loginController.show();
}
 
function userSignUp() {
	var signUpController = Alloy.createController('signUp');
	signUpController.show();
}
 
$.loginButton.addEventListener("click", function(){
	userLogin();
});

$.signUpButton.addEventListener("click", function(){
	userSignUp();
});



