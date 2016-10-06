/* GLOBAL VARIABLES
--------------------------------------------------------*/
var curSlide = '#intro'; var rightSlide = '#cookie'; var leftSlide = null; var upSlide = null; var downSlide = null;

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

/* INITIALIZATION CONTROL
--------------------------------------------------------*/
function initializeJQuery(){
	initTransitions();
}

function initTransitions(){

	/* LISTENING FOR SLIDE TRANSITIONS
	--------------------------------------------------------*/

	// key right
	$(document).on('keydown', function(event){
		if (rightSlide != null){
			if (event.which == 39){
				$(curSlide).animate({
					left:-10000
				}, 300)
				$(rightSlide).animate({
					left:0
				}, 300)
				event.preventDefault();
				configureSlides('right');
			}
		}
	});

	// key left
	$(document).on('keydown', function(event){
		if (leftSlide != null){
			if (event.which == 37){
				$(curSlide).animate({
					left:10000
				}, 300)
				$(leftSlide).animate({
					left:0
				}, 300)
				event.preventDefault();
				configureSlides('left');				
			}
		}
	});

	// key up
	$(document).on('keydown', function(event){
		if (upSlide != null){
			if (event.which == 38){
				$(curSlide).animate({
					top:10000
				}, 300)
				$(upSlide).animate({
					top:0
				}, 300)
				event.preventDefault();
				configureSlides('up');				
			}
		}
	});

	// key down
	$(document).on('keydown', function(event){
		if (downSlide != null){
			if (event.which == 40){
				$(curSlide).animate({
					top:-10000
				}, 300)
				$(upSlide).animate({
					top:0
				}, 300)
				event.preventDefault();
				configureSlides('down');				
			}
		}
	});

	//swipe left
	$(window).on('swipeleft', function(event){
		if (rightSlide != null){
				$(curSlide).animate({
				left:-10000
			}, 300)
			$(rightSlide).animate({
				left:0
			}, 300)
			event.preventDefault();
			configureSlides('right');
		}
	})

	//swipe right
	$(window).on('swiperight', function(event){
		if (leftSlide != null){
				$(curSlide).animate({
				left:10000
			}, 300)
			$(leftSlide).animate({
				left:0
			}, 300)
			event.preventDefault();
			configureSlides('left');

		}
	})
	
	//swipe up
	$(window).on('swipeup', function(event){
		if (downSlide != null){
			$(curSlide).animate({
				top:-10000
			}, 300)
			$(downSlide).animate({
				left:0
			}, 300)
			event.preventDefault();
			configureSlides('down');

		}
	})

	//swipe down
	$(window).on('swipeup', function(event){
		if (upSlide != null){
			$(curSlide).animate({
				top:10000
			}, 300)
			$(upSlide).animate({
				left:0
			}, 300)
			event.preventDefault();
			configureSlides('up');
		}
	})
}

/* SLIDE CONTROL
--------------------------------------------------------*/
function configureSlides(direct){
	leftSlide, rightSlide, upSlide, downSlide = null;

	//forgive me conditional gods
	if (curSlide == '#intro' && direct == 'right'){
		curSlide = '#cookie'; leftSlide = ''; rightSlide = '';
		$('.rightcaret').add('.leftcaret').animate({opacity:.3}, 300);
		$('.upcaret').add('.downcaret').animate({opacity:0}, 300);
		setTimeout(noshCookie, 1300);
	}
}

/* ANIMATION CONTROL
--------------------------------------------------------*/
function noshCookie(){
	$('#cookie>div:eq(0)').hide();
	$('#cookie>div:eq(1)').show();
	setTimeout(function(){
		$('#cookie>div:eq(2)').fadeIn(300);
		$('#cookie>div:eq(1)').animate({top:1000},200, function(){$(this).remove();});
	},500);
}

/* ONLOAD CONTROL
--------------------------------------------------------*/
window.onload = function(){
	initializeJQuery();
}