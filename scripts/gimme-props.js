/* GLOBAL VARIABLES
--------------------------------------------------------*/
var curSlide = '#nocookie', rightSlide = '#proplist', leftSlide = null, upSlide = null, downSlide = null, propSlide = null;
var propSelected = null, propID, tutorial = false, lockSlide = false, propMode = false, returning, firstPropPass, points;
var propData = new Object, resources = new Array;
var propTitles = {
	'prop59': {
		name: 'Prop 59',
		color: '#ae9b3c',
	 	icon:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="5" y="5" width="90" height="90" fill="none"/><path d="M89.6 33.3c-2.2-5.1-5.3-9.7-9.2-13.7 -3.9-3.9-8.5-7-13.7-9.2C61.4 8.2 55.8 7.1 50 7.1s-11.4 1.1-16.7 3.4c-5.1 2.2-9.7 5.3-13.7 9.2 -3.9 3.9-7 8.5-9.2 13.7 -2.2 5.3-3.4 10.9-3.4 16.7 0 5.8 1.1 11.4 3.4 16.7 2.2 5.1 5.3 9.7 9.2 13.7 3.9 3.9 8.5 7 13.7 9.2 5.3 2.2 10.9 3.4 16.7 3.4s11.4-1.1 16.7-3.4c5.1-2.2 9.7-5.3 13.7-9.2s7-8.5 9.2-13.7c2.2-5.3 3.4-10.9 3.4-16.7C93 44.2 91.8 38.6 89.6 33.3zM87.5 65.9c-2 4.8-5 9.2-8.7 12.9 -3.7 3.7-8.1 6.7-12.9 8.7 -5 2.1-10.3 3.2-15.8 3.2 -5.5 0-10.8-1.1-15.8-3.2 -4.8-2-9.2-5-12.9-8.7 -3.7-3.7-6.7-8.1-8.7-12.9 -2.1-5-3.2-10.3-3.2-15.8s1.1-10.8 3.2-15.8c2-4.8 5-9.2 8.7-12.9 3.7-3.7 8.1-6.7 12.9-8.7C39.2 10.5 44.5 9.4 50 9.4s10.8 1.1 15.8 3.2c4.8 2 9.2 5 12.9 8.7 3.7 3.7 6.7 8.1 8.7 12.9 2.1 5 3.2 10.3 3.2 15.8S89.6 60.8 87.5 65.9z"/><path d="M40.6 37.8c0 4.2 2.7 7.8 6.7 9l0-5.7 -0.1-12.3C43.3 30.1 40.6 33.7 40.6 37.8z"/><path d="M52.7 71.2c4-1.2 6.7-4.8 6.7-9 0-4.2-2.7-7.8-6.6-9L52.7 70.4V71.2z"/><path d="M76.1 23.9c-3.4-3.4-7.3-6.1-11.7-7.9 -4.6-1.9-9.4-2.9-14.4-2.9s-9.8 1-14.4 2.9c-4.4 1.9-8.3 4.5-11.7 7.9 -3.4 3.4-6.1 7.3-7.9 11.7 -1.9 4.6-2.9 9.4-2.9 14.4 0 5 1 9.8 2.9 14.4 1.9 4.4 4.5 8.4 7.9 11.7 3.4 3.4 7.3 6.1 11.7 7.9 4.6 1.9 9.4 2.9 14.4 2.9s9.8-1 14.4-2.9c4.4-1.9 8.4-4.5 11.7-7.9 3.4-3.4 6.1-7.3 7.9-11.7 1.9-4.6 2.9-9.4 2.9-14.4 0-5-1-9.8-2.9-14.4C82.2 31.3 79.5 27.3 76.1 23.9zM52.8 41.2l0 6.4c3.3 0.6 6.3 2.4 8.5 5 2.3 2.7 3.6 6.2 3.6 9.7 0 3.6-1.3 7.1-3.6 9.8 -2.2 2.6-5.3 4.3-8.6 4.9v2.6c0 1.5-1.2 2.8-2.8 2.8s-2.8-1.2-2.8-2.8v-2.6c-3.3-0.6-6.3-2.4-8.5-5 -2.3-2.7-3.6-6.2-3.6-9.7 0-1.5 1.2-2.8 2.8-2.8s2.8 1.2 2.8 2.8c0 4.1 2.7 7.7 6.6 9V70.4l0.1-17.9c-3.3-0.6-6.3-2.4-8.6-5 -2.3-2.7-3.6-6.2-3.6-9.7 0-3.6 1.3-7 3.6-9.7 2.2-2.6 5.2-4.3 8.5-5l0-2.6c0-1.5 1.2-2.8 2.8-2.8h0c1.5 0 2.8 1.2 2.8 2.8l0 2.6c3.3 0.6 6.4 2.4 8.6 5 2.3 2.7 3.6 6.2 3.6 9.8 0 1.5-1.2 2.8-2.8 2.8s-2.8-1.2-2.8-2.8c0-4.2-2.7-7.8-6.6-9L52.8 41.2z"/></svg>'
	}
}
var propPositions = new Array;

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
				changeBackground();
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
				changeBackground();
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
				changeBackground();
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
				changeBackground();
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
			changeBackground();
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
			changeBackground();
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
			changeBackground();
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
			changeBackground();
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

	$.getJSON('scripts/json/resources.json', function(data){
		propData['prop59'].resources = data[8];
	});
}

/* GENERAL CONTROL
--------------------------------------------------------*/
function changeBackground(){
	var color = $(curSlide).css('background-color');
	$('html').css('background-color', color);
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
			$('.propcaretright').add('.propcaretleft').fadeIn(300);
			firstPropPass = false;
		}
		else {
			//calculate points
			calcPoints(propData[propSelected][propID], direct);

			//grab slide ids for next ones - establishes new propID
			if (direct == 'left'){
				propID = parseInt(propData[propSelected][propID].leftid);	
			}
			else if (direct == 'right'){
				propID = parseInt(propData[propSelected][propID].rightid);
			}		
		}

		//configure next slides
		curSlide = '#' + propData[propSelected][propID].slideid; leftSlide = '#' + propData[propSelected][propID].leftslide; rightSlide = '#' + propData[propSelected][propID].rightslide;		

		//check victory conditions
		if (propData[propSelected][propID].victoryslide == true){
			
			//Add appropriate text
			var text;

			if (points < 0){
				text = "OPPOSE IT!";
				$(curSlide).addClass('darkred');
			}
			else if (points > 0){
				text = "SUPPORT IT!";
				$(curSlide).addClass('darkgreen');
			}
			else if (points == 0){
				text = "GO EITHER WAY";
				$(curSlide).addClass('darkgray');
			}

			$('<h1/>',{
				'text': text,
				'style': 'font-size:8rem;line-height: 9rem;'
			}).prependTo(curSlide + ' .propquestion');

			propMode = false;
			returning = true;
		}
	}
	//RETURNING TO PROP
	else if (returning == true){   
		curSlide = '#resources'; leftSlide = '#proplist'; rightSlide = '#proplist'; returning = false;		
		$('.rightcaret').add('.leftcaret').animate({opacity:.3}, 300); $('.propcaretleft').add('.propcaretright').fadeOut(300);
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
	//PROP LIST MAIN _____________________________________________________________________//

	else if (curSlide == '#resources' || curSlide == '#yescookie' && direct == 'left' || curSlide == '#nocookie' && direct == 'right' || curSlide == '#prop51' && direct == 'up'){   
		clearAnimations(); curSlide = '#proplist'; downSlide = '#prop51'; tutorial = false;
		$('#menu').fadeIn(300);
		setTimeout(function(){
			$('.' + propSelected).add('.propheader').remove();
		}, 300);
		$('.downcaret').animate({opacity:.3}, 300); $('.rightcaret').add('.leftcaret').add('.upcaret').animate({opacity:0}, 300);

	}
	//TUTORIAL MASTER
	else if (tutorial == true && direct == 'right'){ 
		clearAnimations(); loadProp(propSelected); curSlide = '#tutorial'; tutorial = false;rightSlide = '#' + propSlide;
		$('.rightcaret').animate({opacity:.3}, 300); $('.leftcaret').add('.upcaret').add('.downcaret').animate({opacity:0}, 300);
	}
	//PROP LIST 51
	else if (curSlide == '#proplist' && direct == 'down' || curSlide == '#prop52' && direct == 'up' || curSlide == '#prop65' && direct == 'down'){   
		clearAnimations(); dropHammer(true);
		curSlide = '#prop51'; upSlide = '#prop65'; downSlide = '#prop52'; propSelected = 'prop51'; tutorial = true;
		$('.downcaret').add('.upcaret').add('.rightcaret').animate({opacity:.3}, 300); $('.leftcaret').animate({opacity:0}, 300);
	}	
	//PROP LIST 52
	else if (curSlide == '#prop51' && direct == 'down' || curSlide == '#prop53' && direct == 'up'){   
		clearAnimations(); moveCoins(true);
		curSlide = '#prop52'; upSlide = '#prop51'; downSlide = '#prop53'; propSelected = 'prop52'; tutorial = true;
	}	
	//PROP LIST 53
	else if (curSlide == '#prop52' && direct == 'down' || curSlide == '#prop54' && direct == 'up'){   
		clearAnimations();
		curSlide = '#prop53'; upSlide = '#prop52'; downSlide = '#prop54'; propSelected = 'prop53'; tutorial = true;
	}	
	//PROP LIST 54
	else if (curSlide == '#prop53' && direct == 'down' || curSlide == '#prop55' && direct == 'up'){   
		clearAnimations();
		curSlide = '#prop54'; upSlide = '#prop53'; downSlide = '#prop55'; propSelected = 'prop54'; tutorial = true;
	}	
	//PROP LIST 55
	else if (curSlide == '#prop54' && direct == 'down' || curSlide == '#prop56' && direct == 'up'){   
		clearAnimations();
		curSlide = '#prop55'; upSlide = '#prop54'; downSlide = '#prop56'; propSelected = 'prop55'; tutorial = true;
	}	
	//PROP LIST 56
	else if (curSlide == '#prop55' && direct == 'down' || curSlide == '#prop57' && direct == 'up'){   
		clearAnimations();
		curSlide = '#prop56'; upSlide = '#prop55'; downSlide = '#prop57'; propSelected = 'prop56'; tutorial = true;
	}	
	//PROP LIST 57
	else if (curSlide == '#prop56' && direct == 'down' || curSlide == '#prop58' && direct == 'up'){   
		clearAnimations();
		curSlide = '#prop57'; upSlide = '#prop56'; downSlide = '#prop58'; propSelected = 'prop57'; tutorial = true;
	}	
	//PROP LIST 58
	else if (curSlide == '#prop57' && direct == 'down' || curSlide == '#prop59' && direct == 'up'){   
		clearAnimations();
		curSlide = '#prop58'; upSlide = '#prop57'; downSlide = '#prop59'; propSelected = 'prop58'; tutorial = true;
	}	
	//PROP LIST 59
	else if (curSlide == '#prop58' && direct == 'down' || curSlide == '#prop60' && direct == 'up'){   
		clearAnimations(); rainingCoins(); 
		curSlide = '#prop59'; upSlide = '#prop58'; downSlide = '#prop60'; rightSlide = '#tutorial'; propSelected = 'prop59';tutorial = true;
	}	
	//PROP LIST 60
	else if (curSlide == '#prop59' && direct == 'down'  || curSlide == '#prop61' && direct == 'up'){   
		clearAnimations();
		curSlide = '#prop60'; upSlide = '#prop59'; downSlide = '#prop61'; propSelected = 'prop60';tutorial = true;
	}	
	//PROP LIST 61
	else if (curSlide == '#prop60' && direct == 'down'  || curSlide == '#prop62' && direct == 'up'){   
		clearAnimations();
		curSlide = '#prop61'; upSlide = '#prop60'; downSlide = '#prop62'; propSelected = 'prop61';tutorial = true;
	}	
	//PROP LIST 62 AND 66
	else if (curSlide == '#prop61' && direct == 'down'  || curSlide == '#prop63' && direct == 'up'){   
		clearAnimations();
		curSlide = '#prop62'; upSlide = '#prop61'; downSlide = '#prop63'; propSelected = 'prop62';tutorial = true;
	}
	//PROP LIST 63
	else if (curSlide == '#prop62' && direct == 'down'  || curSlide == '#prop64' && direct == 'up'){   
		clearAnimations();
		curSlide = '#prop63'; upSlide = '#prop62'; downSlide = '#prop64'; propSelected = 'prop63';tutorial = true;
	}	
	//PROP LIST 64
	else if (curSlide == '#prop63' && direct == 'down'  || curSlide == '#prop65' && direct == 'up'){   
		clearAnimations();
		curSlide = '#prop64'; upSlide = '#prop63'; downSlide = '#prop65'; propSelected = 'prop64';tutorial = true;
	}	
	//PROP LIST 65 AND 67
	else if (curSlide == '#prop64' && direct == 'down'  || curSlide == '#prop51' && direct == 'up'){   
		clearAnimations();
		curSlide = '#prop65'; upSlide = '#prop64'; downSlide = '#prop51'; propSelected = 'prop65';tutorial = true;
		$('.downcaret').add('.upcaret').add('.rightcaret').animate({opacity:.3}, 300); $('.leftcaret').animate({opacity:0}, 300);
	}	

	//configure next slides
	$(upSlide).css({left:0,top:-10000,'z-index':0});
	$(downSlide).css({left:0,top:10000,'z-index':0});
	$(leftSlide).css({left:-10000,top:0,'z-index':0});
	$(rightSlide).css({left:10000,top:0,'z-index':0});
}

function calcPoints(d, direct){
	if (direct == 'left'){points += parseInt(d.leftpoints)}
	else if (direct == 'right'){points += parseInt(d.rightpoints)}
}

function loadProp(p){
	var d = propData[p];
	points = 0;	propID = 0; propMode = true; firstPropPass = true;

	//populate resource slide
	$('#resources a:eq(0)').attr('href', d.resources.kqed);
	$('#resources a:eq(1)').attr('href', d.resources.ballotfyi);
	$('#resources a:eq(2)').attr('href', d.resources.ballotpedia);

	//add prop header
	$('<div/>', {
		'class': 'propheader'
	}).appendTo('#container');

	$('.propheader').append(propTitles[propSelected].icon);
	$('.propheader svg').css('fill', propTitles[propSelected].color)

	$('<h2/>', {
		'text': propTitles[propSelected].name 
	}).appendTo('.propheader');


	//build slides
	for (var i = 0 ; i < d.length ; i++){
		//check if obj exists
		if (!d[i].hasOwnProperty('lefttext')){d[i]['lefttext'] = '';}
		if (!d[i].hasOwnProperty('subtext')){d[i]['subtext'] = '';}
		if (!d[i].hasOwnProperty('righttext')){d[i]['righttext'] = '';}
		if (!d[i].hasOwnProperty('victoryslide')){d[i]['victoryslide'] = false;}

		//base template
			
			//base section
			$('<section/>', {
				'id': 		d[i].slideid,
				'class': 	'relative startpos ' + p,
			}).appendTo('#container');	


			//prop question shell
			$('<div/>', {
				'class': 'propquestion'
			}).appendTo('#' + d[i].slideid);


			//prop question type
			if (d[i].victoryslide == true){				
				$('<h2/>', {
					'text': d[i].maintext
				}).appendTo('#' + d[i].slideid + ' .propquestion');
			}	
			else if (d[i].victoryslide == false){
				$('<h1/>', {
					'text': d[i].maintext
				}).appendTo('#' + d[i].slideid + ' .propquestion');
			}

			//prop choice
			$('<div/>', {
				'class': 'propchoice'
			}).appendTo('#' + d[i].slideid);

			$('<h3/>', {
				'text': d[i].lefttext
			}).appendTo('#' + d[i].slideid + ' .propchoice');

			$('<h3/>', {
				'text': d[i].subtext
			}).appendTo('#' + d[i].slideid + ' .propchoice');

			$('<h3/>', {
				'text': d[i].righttext
			}).appendTo('#' + d[i].slideid + ' .propchoice');
	}

	//define the rightSlide as first slide
	propSlide = d[0].slideid;
}

/* ANIMATION CONTROL
--------------------------------------------------------*/
function clearAnimations(){
	dropHammer(false);
	moveCoins(false);
	destroyCoins();
}

function moveCoins(t){
	if (t == true){
		$('#prop52>div[data="coin"]').css({
			'-webkit-animation-play-state': 'running',
			'-ms-animation-play-state': 'running',
			'-moz-animation-play-state': 'running',
			'animation-play-state': 'running'
		});
	}
	else {
		$('#prop52>div[data="coin"]').css({
			'-webkit-animation-play-state': 'paused',
			'-ms-animation-play-state': 'paused',
			'-moz-animation-play-state': 'paused',
			'animation-play-state': 'paused'
		});
	}
}

function dropHammer(t){
	if (t == true){
		$('.hammer').css({
			'-webkit-animation-play-state': 'running',
			'-ms-animation-play-state': 'running',
			'-moz-animation-play-state': 'running',
			'animation-play-state': 'running'
		});
	}
	else {
		$('.hammer').css({
			'-webkit-animation-play-state': 'paused',
			'-ms-animation-play-state': 'paused',
			'-moz-animation-play-state': 'paused',
			'animation-play-state': 'paused'
		});
	}
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