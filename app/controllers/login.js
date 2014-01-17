exports.show = function() {
	$.loginWindow.open();
};

$.confirmButton.addEventListener("click", function(){
	userLogin();
});

function userLogin() {
	if ($.usernameField.value == "teste" && $.passwordField.value == "teste"){
		alert("Aeeeee");
	} else {
		alert("Usuário ou senha incorretos.");
	}
}
 
$.loginWindow.addEventListener('click', function(evt) {
	Ti.API.info("evt.source: " + evt.source);
	if (evt.source == $.loginWindow || evt.source == $.loginScroll) {
		$.loginWindow.close();
	}
});
