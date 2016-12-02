/* ANIMATION CONTROL
--------------------------------------------------------*/
function toggleAnimation(s){
	if (s == '#cookie'){setTimeout(noshCookie, 1300);}
	else if (s == '#yescookie'){dropCookie();}
	else if (s == '#prop51'){animationControl(true, '.hammer');}
	else if (s == '#prop52'){animationControl(true, '#prop52 div[data="coin"]');}
	else if (s == '#prop53'){animationControl(true, '.approved');animationControl(true, '.denied');}
	else if (s == '#prop54'){animationControl(true, '#prop54 div[data="eye"]');}
	else if (s == '#prop55'){rainingCoins('#prop55');}	
	else if (s == '#prop56'){animationControl(true, '.smoke');}
	else if (s == '#prop59'){rainingCoins('#prop59');}
	else if (s == '#prop60'){animationControl(true, '#prop60 div[data="condom"]');}
	else if (s == '#prop64'){animationControl(true, '#prop64 div[data="pot"] svg');}
	else if (s == '#prop66'){animationControl(true, '.drip');}
	else if (s == '#prop67'){animationControl(true, '#prop67 div[data="bag"]');}
}

function clearAnimations(){
	animationControl(false, '#prop54 div[data="eye"]');
	animationControl(false, '.hammer');
	animationControl(false, '#prop52 div[data="coin"]');
	animationControl(false, '.approved');
	animationControl(false, '.denied');
	animationControl(false, '.smoke');
	animationControl(false, '#prop60 div[data="condom"]');
	animationControl(false, '#prop64 div[data="pot"] svg');
	animationControl(false, '#prop66 div[data="syringe"] svg>path:eq(0)');
	animationControl(false, '#prop67 div[data="bag"]');
	destroyCoins();
}

function animationControl(t,e){
	if (t === true){
		$(e).css({
			'-webkit-animation-play-state': 'running',
			'-ms-animation-play-state': 'running',
			'-moz-animation-play-state': 'running',
			'animation-play-state': 'running'
		});
	}
	else {
		$(e).css({
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
			gimmeProps.slides.lockSlide = false;

			//test for cookie, if true load cookie and go to another slide
			var cookieTest = getCookie();
			if (cookieTest === true){returnCustomer();}

			$(this).remove();
		});
	},500);
}

function dropCookie(){
	$('#yescookie .cookie').animate({top:2000}, 2000);
}

function rainingCoins(e){
	var coin = '<svg class="coins" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="5" y="5" width="90" height="90" fill="none"/><path d="M89.6 33.3c-2.2-5.1-5.3-9.7-9.2-13.7 -3.9-3.9-8.5-7-13.7-9.2C61.4 8.2 55.8 7.1 50 7.1s-11.4 1.1-16.7 3.4c-5.1 2.2-9.7 5.3-13.7 9.2 -3.9 3.9-7 8.5-9.2 13.7 -2.2 5.3-3.4 10.9-3.4 16.7 0 5.8 1.1 11.4 3.4 16.7 2.2 5.1 5.3 9.7 9.2 13.7 3.9 3.9 8.5 7 13.7 9.2 5.3 2.2 10.9 3.4 16.7 3.4s11.4-1.1 16.7-3.4c5.1-2.2 9.7-5.3 13.7-9.2s7-8.5 9.2-13.7c2.2-5.3 3.4-10.9 3.4-16.7C93 44.2 91.8 38.6 89.6 33.3zM87.5 65.9c-2 4.8-5 9.2-8.7 12.9 -3.7 3.7-8.1 6.7-12.9 8.7 -5 2.1-10.3 3.2-15.8 3.2 -5.5 0-10.8-1.1-15.8-3.2 -4.8-2-9.2-5-12.9-8.7 -3.7-3.7-6.7-8.1-8.7-12.9 -2.1-5-3.2-10.3-3.2-15.8s1.1-10.8 3.2-15.8c2-4.8 5-9.2 8.7-12.9 3.7-3.7 8.1-6.7 12.9-8.7C39.2 10.5 44.5 9.4 50 9.4s10.8 1.1 15.8 3.2c4.8 2 9.2 5 12.9 8.7 3.7 3.7 6.7 8.1 8.7 12.9 2.1 5 3.2 10.3 3.2 15.8S89.6 60.8 87.5 65.9z"/><path d="M40.6 37.8c0 4.2 2.7 7.8 6.7 9l0-5.7 -0.1-12.3C43.3 30.1 40.6 33.7 40.6 37.8z"/><path d="M52.7 71.2c4-1.2 6.7-4.8 6.7-9 0-4.2-2.7-7.8-6.6-9L52.7 70.4V71.2z"/><path d="M76.1 23.9c-3.4-3.4-7.3-6.1-11.7-7.9 -4.6-1.9-9.4-2.9-14.4-2.9s-9.8 1-14.4 2.9c-4.4 1.9-8.3 4.5-11.7 7.9 -3.4 3.4-6.1 7.3-7.9 11.7 -1.9 4.6-2.9 9.4-2.9 14.4 0 5 1 9.8 2.9 14.4 1.9 4.4 4.5 8.4 7.9 11.7 3.4 3.4 7.3 6.1 11.7 7.9 4.6 1.9 9.4 2.9 14.4 2.9s9.8-1 14.4-2.9c4.4-1.9 8.4-4.5 11.7-7.9 3.4-3.4 6.1-7.3 7.9-11.7 1.9-4.6 2.9-9.4 2.9-14.4 0-5-1-9.8-2.9-14.4C82.2 31.3 79.5 27.3 76.1 23.9zM52.8 41.2l0 6.4c3.3 0.6 6.3 2.4 8.5 5 2.3 2.7 3.6 6.2 3.6 9.7 0 3.6-1.3 7.1-3.6 9.8 -2.2 2.6-5.3 4.3-8.6 4.9v2.6c0 1.5-1.2 2.8-2.8 2.8s-2.8-1.2-2.8-2.8v-2.6c-3.3-0.6-6.3-2.4-8.5-5 -2.3-2.7-3.6-6.2-3.6-9.7 0-1.5 1.2-2.8 2.8-2.8s2.8 1.2 2.8 2.8c0 4.1 2.7 7.7 6.6 9V70.4l0.1-17.9c-3.3-0.6-6.3-2.4-8.6-5 -2.3-2.7-3.6-6.2-3.6-9.7 0-3.6 1.3-7 3.6-9.7 2.2-2.6 5.2-4.3 8.5-5l0-2.6c0-1.5 1.2-2.8 2.8-2.8h0c1.5 0 2.8 1.2 2.8 2.8l0 2.6c3.3 0.6 6.4 2.4 8.6 5 2.3 2.7 3.6 6.2 3.6 9.8 0 1.5-1.2 2.8-2.8 2.8s-2.8-1.2-2.8-2.8c0-4.2-2.7-7.8-6.6-9L52.8 41.2z"/></svg>';
	$(e).append(coin).append(coin).append(coin).append(coin).append(coin);
	$(e + ' svg:eq(1)').css({top:-200, left:'80%'}).animate({top:3000},5500);
	$(e + ' svg:eq(2)').css({top:-200, left:'40%'}).animate({top:3000},6000);
	$(e + ' svg:eq(3)').css({top:-200, left:'50%'}).animate({top:3000},5000);
	$(e + ' svg:eq(4)').css({top:-200, left:'70%'}).animate({top:3000},6500, function(){
		$('.coins').remove();
	});
	$(e + ' svg:last-of-type').css({top:-200, left:'20%'}).animate({top:3000},5000);
}

function destroyCoins(){
	$('#prop59 svg:last-of-type').dequeue();
	$('#prop59 svg:eq(1)').dequeue();
	$('#prop59 svg:eq(2)').dequeue();
	$('#prop59 svg:eq(3)').dequeue();
	$('#prop59 svg:eq(4)').dequeue();
	$('.coins').remove();
}

