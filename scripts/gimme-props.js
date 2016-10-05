/* VARIABLES
--------------------------------------------------------*/
var curSlide = '#intro'; var nxtSlide = '#cookie';

/* COOKIE CONTROL
--------------------------------------------------------*/
function createCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function grabCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function initializeJQuery(){

	/* LISTENING FOR SLIDE TRANSITIONS
	--------------------------------------------------------*/
	$(document).on('keydown', function(event){
		if (event.which == 39){
			$(curSlide).animate({
				left:-10000
			}, 300)
			$(nxtSlide).animate({
				left:0
			}, 300)
			event.preventDefault();
		}
	})

	$(window).on('swipeleft', function(event){
		$(curSlide).animate({
			left:-10000
		}, 300)
		$(nxtSlide).animate({
			left:0
		}, 300)
		event.preventDefault();
	})

}

window.onload = function(){
	initializeJQuery();
}