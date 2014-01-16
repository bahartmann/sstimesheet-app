$.indexWindow.open();

function userLogin() {
	var loginController = Alloy.createController('login');
	loginController.show();
 }
 

$.loginButton.addEventListener("click", function(){
	userLogin();
});

$.signUpButton.addEventListener("click", function(){
	userSignUp();
});



