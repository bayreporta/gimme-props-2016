/* GLOBAL VARIABLES
--------------------------------------------------------*/
var curSlide = '#intro', rightSlide = '#about', leftSlide = null, upSlide = null, downSlide = null, propSlide = null;
var propSelected = null, propID, tutorial = false, lockSlide = false, propMode = false, firstPropPass;
var propData = new Object, points;

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
	initJSON();
}

function initTransitions(){
	// key right
	$(document).on('keydown', function(event){
		if (rightSlide != null && lockSlide == false){
			if (event.which == 39){
				console.log(curSlide)
				console.log(rightSlide)
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
		if (leftSlide != null && lockSlide == false){
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
		if (upSlide != null && lockSlide == false){
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
		if (downSlide != null && lockSlide == false){
			if (event.which == 40){
				$(curSlide).animate({
					top:-10000
				}, 300)
				$(downSlide).animate({
					top:0
				}, 300)
				event.preventDefault();
				configureSlides('down');				
			}
		}
	});

	//swipe left
	$(window).on('swipeleft', function(event){
		if (rightSlide != null && lockSlide == false){
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
		if (leftSlide != null && lockSlide == false){
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
		if (downSlide != null && lockSlide == false){
			$(curSlide).animate({
				top:-10000
			}, 300)
			$(downSlide).animate({
				top:0
			}, 300)
			event.preventDefault();
			configureSlides('down');

		}
	})

	//swipe down
	$(window).on('swipedown', function(event){
		if (upSlide != null && lockSlide == false){
			$(curSlide).animate({
				top:10000
			}, 300)
			$(upSlide).animate({
				top:0
			}, 300)
			event.preventDefault();
			configureSlides('up');
		}
	})
}

function initJSON(){
	$.getJSON('scripts/json/prop59.json', function(data){
		propData['prop59'] = data.prop59;
	});
}

/* SLIDE CONTROL
--------------------------------------------------------*/
function configureSlides(direct){
	leftSlide = null; rightSlide = null; upSlide = null; downSlide = null;

	//forgive me conditional gods
	//PROPS ALL
	if (propMode == true){   

		//first pass with prop?
		if (firstPropPass == true){
			$('.rightcaret').animate({opacity:0}, 300);
			firstPropPass = false;
		}
		else {
			//grab slide ids for next ones - establishes new propID
			if (direct == 'left'){
				propID = parseInt(propData[propSelected][propID].leftid);	
			}
			else if (direct == 'right'){
				propID = parseInt(propData[propSelected][propID].rightid);
			}
		}

		//configure next slides
		curSlide = propData[propSelected][propID].slideid; leftSlide = propData[propSelected][propID].leftslide; rightSlide = propData[propSelected][propID].rightslide;


		/*get back on the path man
		if (propSlide == '#results'){
			//return to prop in list
			rightSlide == '#' + propSelected;
			propMode = false;
			//hide carets
			$('.rightcaret').animate({opacity:.3}, 300); $('.propcaretleft').add('propcaretright').fadeOut(300);

		}

		curSlide = '#proplist59'; upSlide = '#proplist'; rightSlide = '#tutorial'; propSelected = 'prop59';tutorial = true;
		$('.downcaret').add('.upcaret').add('.rightcaret').animate({opacity:.3}, 300); $('.leftcaret').animate({opacity:0}, 300);*/
	}
	//ABOUT
	else if (curSlide == '#intro' && direct == 'right' || curSlide == '#whoweare' && direct == 'up'){    
		curSlide = '#about'; rightSlide = '#cookie'; downSlide = '#whoweare';
		$('.rightcaret').add('.downcaret').animate({opacity:.3}, 300);$('.upcaret').add('.leftcaret').animate({opacity:0}, 300);
	}
	//WHO WE ARE
	else if (curSlide == '#about' && direct == 'down'){   
		curSlide = '#whoweare'; upSlide = '#about'; rightSlide = '#cookie';
		$('.rightcaret').add('.upcaret').animate({opacity:.3}, 300);$('.leftcaret').add('.downcaret').animate({opacity:0}, 300);
	}
	//COOKIE
	else if (curSlide == '#about' && direct == 'right' || curSlide == '#whoweare' && direct == 'right'){  
		curSlide = '#cookie'; leftSlide = '#yescookie'; rightSlide = '#nocookie';
		$('.rightcaret').add('.leftcaret').animate({opacity:.3}, 300);$('.upcaret').add('.downcaret').animate({opacity:0}, 300);
		$('html').css('background-color', '#fff');
		lockSlide = true;
		setTimeout(noshCookie, 1300);
	}	
	//YES COOKIE
	else if (curSlide == '#cookie' && direct == 'left'){   
		curSlide = '#yescookie'; leftSlide = '#proplist';
		$('.rightcaret').add('.leftcaret').add('.upcaret').add('.downcaret').animate({opacity:0}, 300);
		lockSlide = true;
		dropCookie('yes');
	}
	//NO COOKIE
	else if (curSlide == '#cookie' && direct == 'right'){   
		curSlide = '#nocookie'; rightSlide = '#proplist';
		$('.rightcaret').add('.leftcaret').add('.upcaret').add('.downcaret').animate({opacity:0}, 300);
		lockSlide = true;
		dropCookie('no');
	}
	//PROP LIST MAIN
	else if (curSlide == '#yescookie' && direct == 'left' || curSlide == '#nocookie' && direct == 'right' || curSlide == '#proplist59' && direct == 'up'){   
		clearAnimations(); curSlide = '#proplist'; downSlide = '#prop59'; tutorial = false;
		$('.downcaret').animate({opacity:.3}, 300); $('.rightcaret').add('.leftcaret').add('.upcaret').animate({opacity:0}, 300);
	}
	//TUTORIAL MASTER
	else if (tutorial == true && direct == 'right'){ 
		clearAnimations(); loadProp(propSelected); curSlide = '#tutorial'; tutorial = false;rightSlide = propSlide;
		$('.rightcaret').animate({opacity:.3}, 300); $('.leftcaret').add('.upcaret').add('.downcaret').animate({opacity:0}, 300);
	}
	//PROP LIST 59
	else if (curSlide == '#proplist' && direct == 'down'){   
		rainingCoins();
		curSlide = '#prop59'; upSlide = '#proplist'; rightSlide = '#tutorial'; propSelected = 'prop59';tutorial = true;
		$('.downcaret').add('.upcaret').add('.rightcaret').animate({opacity:.3}, 300); $('.leftcaret').animate({opacity:0}, 300);
	}	


	//configure next slides
	$(upSlide).css({left:0,top:-10000,'z-index':0});
	$(downSlide).css({left:0,top:10000,'z-index':0});
	$(leftSlide).css({left:-10000,top:0,'z-index':0});
	$(rightSlide).css({left:10000,top:0,'z-index':0});
}


function loadProp(p){
	var d = propData[p];
	points = 0;	propID = 0; propMode = true; firstPropPass = true;

	//build slides
	for (var i = 0 ; i < d.length ; i++){
		//check if obj exists
		if (!d[i].hasOwnProperty('lefttext')){d[i]['lefttext'] = '';}
		if (!d[i].hasOwnProperty('subtext')){d[i]['subtext'] = '';}
		if (!d[i].hasOwnProperty('righttext')){d[i]['righttext'] = '';}
		if (!d[i].hasOwnProperty('victoryslide')){d[i]['victoryslide'] = false;}

		//input template
		$('#container').append('<section id="'+ d[i].slideid +'" class="relative startpos '+ p +'"><div class="propprogress"><div><div></div></div></div><div class="propquestion"><h1>'+ d[i].maintext +'</h1></div><div class="propchoice"><h3>'+ d[i].lefttext +'</h3><h3>'+ d[i].subtext +'</h3><h3>'+ d[i].righttext +'</h3></div></section>');

		//add victory text template if applies
		if (d[i].victoryslide == true){
			$(d[i].slideid + '.propquestion').prepend('<h1></h1>');
		}
	}

	//define the rightSlide as first slide
	propSlide = d[0].slideid;

	//unbind slide transitions and reinitialize
	$(document).off('keydown');
	$(document).on('keydown', '.prop59', function(event){
		if (rightSlide != null && lockSlide == false){
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


}

/* ANIMATION CONTROL
--------------------------------------------------------*/
function clearAnimations(){
	destroyCoins();
}

function noshCookie(){
	$('#cookie>div:eq(0)').hide();
	$('#cookie>div:eq(1)').show();
	setTimeout(function(){		
		$('#cookie>div:eq(1)').animate({top:2000},200, function(){
			$('#cookie>div:eq(2)').fadeIn(1);
			lockSlide = false;
			$(this).remove();
		});
	},500);
}

function dropCookie(d){
	$('#yescookie .cookie').animate({top:2000}, 2000, function(){
		if (d == 'yes'){
			$('#yescookie').animate({left:10000}, 300);
			$('#proplist').animate({left:0},300);
			configureSlides('left');
		}
		else {
			$('#nocookie').animate({left:-10000}, 300);
			$('#proplist').animate({left:0},300);
			configureSlides('right');
		}
		lockSlide = false;
	});
}

function rainingCoins(){
	var coin = '<svg class="coins" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="5" y="5" width="90" height="90" fill="none"/><path d="M89.6 33.3c-2.2-5.1-5.3-9.7-9.2-13.7 -3.9-3.9-8.5-7-13.7-9.2C61.4 8.2 55.8 7.1 50 7.1s-11.4 1.1-16.7 3.4c-5.1 2.2-9.7 5.3-13.7 9.2 -3.9 3.9-7 8.5-9.2 13.7 -2.2 5.3-3.4 10.9-3.4 16.7 0 5.8 1.1 11.4 3.4 16.7 2.2 5.1 5.3 9.7 9.2 13.7 3.9 3.9 8.5 7 13.7 9.2 5.3 2.2 10.9 3.4 16.7 3.4s11.4-1.1 16.7-3.4c5.1-2.2 9.7-5.3 13.7-9.2s7-8.5 9.2-13.7c2.2-5.3 3.4-10.9 3.4-16.7C93 44.2 91.8 38.6 89.6 33.3zM87.5 65.9c-2 4.8-5 9.2-8.7 12.9 -3.7 3.7-8.1 6.7-12.9 8.7 -5 2.1-10.3 3.2-15.8 3.2 -5.5 0-10.8-1.1-15.8-3.2 -4.8-2-9.2-5-12.9-8.7 -3.7-3.7-6.7-8.1-8.7-12.9 -2.1-5-3.2-10.3-3.2-15.8s1.1-10.8 3.2-15.8c2-4.8 5-9.2 8.7-12.9 3.7-3.7 8.1-6.7 12.9-8.7C39.2 10.5 44.5 9.4 50 9.4s10.8 1.1 15.8 3.2c4.8 2 9.2 5 12.9 8.7 3.7 3.7 6.7 8.1 8.7 12.9 2.1 5 3.2 10.3 3.2 15.8S89.6 60.8 87.5 65.9z"/><path d="M40.6 37.8c0 4.2 2.7 7.8 6.7 9l0-5.7 -0.1-12.3C43.3 30.1 40.6 33.7 40.6 37.8z"/><path d="M52.7 71.2c4-1.2 6.7-4.8 6.7-9 0-4.2-2.7-7.8-6.6-9L52.7 70.4V71.2z"/><path d="M76.1 23.9c-3.4-3.4-7.3-6.1-11.7-7.9 -4.6-1.9-9.4-2.9-14.4-2.9s-9.8 1-14.4 2.9c-4.4 1.9-8.3 4.5-11.7 7.9 -3.4 3.4-6.1 7.3-7.9 11.7 -1.9 4.6-2.9 9.4-2.9 14.4 0 5 1 9.8 2.9 14.4 1.9 4.4 4.5 8.4 7.9 11.7 3.4 3.4 7.3 6.1 11.7 7.9 4.6 1.9 9.4 2.9 14.4 2.9s9.8-1 14.4-2.9c4.4-1.9 8.4-4.5 11.7-7.9 3.4-3.4 6.1-7.3 7.9-11.7 1.9-4.6 2.9-9.4 2.9-14.4 0-5-1-9.8-2.9-14.4C82.2 31.3 79.5 27.3 76.1 23.9zM52.8 41.2l0 6.4c3.3 0.6 6.3 2.4 8.5 5 2.3 2.7 3.6 6.2 3.6 9.7 0 3.6-1.3 7.1-3.6 9.8 -2.2 2.6-5.3 4.3-8.6 4.9v2.6c0 1.5-1.2 2.8-2.8 2.8s-2.8-1.2-2.8-2.8v-2.6c-3.3-0.6-6.3-2.4-8.5-5 -2.3-2.7-3.6-6.2-3.6-9.7 0-1.5 1.2-2.8 2.8-2.8s2.8 1.2 2.8 2.8c0 4.1 2.7 7.7 6.6 9V70.4l0.1-17.9c-3.3-0.6-6.3-2.4-8.6-5 -2.3-2.7-3.6-6.2-3.6-9.7 0-3.6 1.3-7 3.6-9.7 2.2-2.6 5.2-4.3 8.5-5l0-2.6c0-1.5 1.2-2.8 2.8-2.8h0c1.5 0 2.8 1.2 2.8 2.8l0 2.6c3.3 0.6 6.4 2.4 8.6 5 2.3 2.7 3.6 6.2 3.6 9.8 0 1.5-1.2 2.8-2.8 2.8s-2.8-1.2-2.8-2.8c0-4.2-2.7-7.8-6.6-9L52.8 41.2z"/></svg>'
	$('#prop59').append(coin).append(coin).append(coin).append(coin).append(coin);
	$('#prop59 svg:eq(1)').css({top:-200, left:'80%'}).animate({top:3000},5500);
	$('#prop59 svg:eq(2)').css({top:-200, left:'40%'}).animate({top:3000},6000);
	$('#prop59 svg:eq(3)').css({top:-200, left:'50%'}).animate({top:3000},5000);
	$('#prop59 svg:eq(4)').css({top:-200, left:'70%'}).animate({top:3000},6500, function(){
		$('.coins').remove();
	});
	$('#prop59 svg:last-of-type').css({top:-200, left:'20%'}).animate({top:3000},5000);
}

function destroyCoins(){
	$('#prop59 svg:last-of-type').dequeue();
	$('#prop59 svg:eq(1)').dequeue();
	$('#prop59 svg:eq(2)').dequeue();
	$('#prop59 svg:eq(3)').dequeue();
	$('#prop59 svg:eq(4)').dequeue();
	$('.coins').remove();
}

/* ONLOAD CONTROL
--------------------------------------------------------*/
window.onload = function(){
	initializeJQuery();
}