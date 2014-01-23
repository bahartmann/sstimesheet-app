exports.show = function() {
	$.signUpWindow.open();
};

$.confirmButton.addEventListener("click", function(){
	userSignUp();
});

function userSignUp() {
	alert("Not yet implemented.");
}
 
$.signUpWindow.addEventListener('click', function(evt) {
	if (evt.source == $.signUpWindow || evt.source == $.signUpScroll) {
		$.signUpWindow.close();
	}
});