/* GLOBAL VARIABLES
--------------------------------------------------------*/
var gimmeProps = {
	propstate:{
		points: 0,
		propID: 0,
		propSelected: null,
		propMode: false,
		returning: false
	},
	slides:{
		curSlide: '#nocookie',
		upSlide: null,
		downSlide: null,
		leftSlide: null,
		rightSlide: '#proplist',
		lockSlide: false
	},
	data:{
		props: new Object,
		resources: new Array
	},
	header:{
		'prop51': {
			name: 'Prop 51',
			color: '',
			icon: ''
		},
		'prop56': {
			name: 'Prop 56',
			color: '',
			icon: ''
		},
		'prop59': {
			name: 'Prop 59',
			color: '#ae9b3c',
		 	icon:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="5" y="5" width="90" height="90" fill="none"/><path d="M89.6 33.3c-2.2-5.1-5.3-9.7-9.2-13.7 -3.9-3.9-8.5-7-13.7-9.2C61.4 8.2 55.8 7.1 50 7.1s-11.4 1.1-16.7 3.4c-5.1 2.2-9.7 5.3-13.7 9.2 -3.9 3.9-7 8.5-9.2 13.7 -2.2 5.3-3.4 10.9-3.4 16.7 0 5.8 1.1 11.4 3.4 16.7 2.2 5.1 5.3 9.7 9.2 13.7 3.9 3.9 8.5 7 13.7 9.2 5.3 2.2 10.9 3.4 16.7 3.4s11.4-1.1 16.7-3.4c5.1-2.2 9.7-5.3 13.7-9.2s7-8.5 9.2-13.7c2.2-5.3 3.4-10.9 3.4-16.7C93 44.2 91.8 38.6 89.6 33.3zM87.5 65.9c-2 4.8-5 9.2-8.7 12.9 -3.7 3.7-8.1 6.7-12.9 8.7 -5 2.1-10.3 3.2-15.8 3.2 -5.5 0-10.8-1.1-15.8-3.2 -4.8-2-9.2-5-12.9-8.7 -3.7-3.7-6.7-8.1-8.7-12.9 -2.1-5-3.2-10.3-3.2-15.8s1.1-10.8 3.2-15.8c2-4.8 5-9.2 8.7-12.9 3.7-3.7 8.1-6.7 12.9-8.7C39.2 10.5 44.5 9.4 50 9.4s10.8 1.1 15.8 3.2c4.8 2 9.2 5 12.9 8.7 3.7 3.7 6.7 8.1 8.7 12.9 2.1 5 3.2 10.3 3.2 15.8S89.6 60.8 87.5 65.9z"/><path d="M40.6 37.8c0 4.2 2.7 7.8 6.7 9l0-5.7 -0.1-12.3C43.3 30.1 40.6 33.7 40.6 37.8z"/><path d="M52.7 71.2c4-1.2 6.7-4.8 6.7-9 0-4.2-2.7-7.8-6.6-9L52.7 70.4V71.2z"/><path d="M76.1 23.9c-3.4-3.4-7.3-6.1-11.7-7.9 -4.6-1.9-9.4-2.9-14.4-2.9s-9.8 1-14.4 2.9c-4.4 1.9-8.3 4.5-11.7 7.9 -3.4 3.4-6.1 7.3-7.9 11.7 -1.9 4.6-2.9 9.4-2.9 14.4 0 5 1 9.8 2.9 14.4 1.9 4.4 4.5 8.4 7.9 11.7 3.4 3.4 7.3 6.1 11.7 7.9 4.6 1.9 9.4 2.9 14.4 2.9s9.8-1 14.4-2.9c4.4-1.9 8.4-4.5 11.7-7.9 3.4-3.4 6.1-7.3 7.9-11.7 1.9-4.6 2.9-9.4 2.9-14.4 0-5-1-9.8-2.9-14.4C82.2 31.3 79.5 27.3 76.1 23.9zM52.8 41.2l0 6.4c3.3 0.6 6.3 2.4 8.5 5 2.3 2.7 3.6 6.2 3.6 9.7 0 3.6-1.3 7.1-3.6 9.8 -2.2 2.6-5.3 4.3-8.6 4.9v2.6c0 1.5-1.2 2.8-2.8 2.8s-2.8-1.2-2.8-2.8v-2.6c-3.3-0.6-6.3-2.4-8.5-5 -2.3-2.7-3.6-6.2-3.6-9.7 0-1.5 1.2-2.8 2.8-2.8s2.8 1.2 2.8 2.8c0 4.1 2.7 7.7 6.6 9V70.4l0.1-17.9c-3.3-0.6-6.3-2.4-8.6-5 -2.3-2.7-3.6-6.2-3.6-9.7 0-3.6 1.3-7 3.6-9.7 2.2-2.6 5.2-4.3 8.5-5l0-2.6c0-1.5 1.2-2.8 2.8-2.8h0c1.5 0 2.8 1.2 2.8 2.8l0 2.6c3.3 0.6 6.4 2.4 8.6 5 2.3 2.7 3.6 6.2 3.6 9.8 0 1.5-1.2 2.8-2.8 2.8s-2.8-1.2-2.8-2.8c0-4.2-2.7-7.8-6.6-9L52.8 41.2z"/></svg>'
		}
	}
}

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
	initMenu();
}

function initTransitions(){
	// key right
	$(document).on('keydown', function(event){
		if (gimmeProps.slides.rightSlide != null && gimmeProps.slides.lockSlide == false){
			if (event.which == 39){
				changeBackground();
				$(gimmeProps.slides.curSlide).animate({
					left:-10000
				}, 300)
				$(gimmeProps.slides.rightSlide).animate({
					left:0
				}, 300)
				event.preventDefault();
				slideControl('right');
			}
		}
	});

	// key left
	$(document).on('keydown', function(event){
		if (gimmeProps.slides.leftSlide != null && gimmeProps.slides.lockSlide == false){
			if (event.which == 37){
				changeBackground();
				$(gimmeProps.slides.curSlide).animate({
					left:10000
				}, 300)
				$(gimmeProps.slides.leftSlide).animate({
					left:0
				}, 300)
				event.preventDefault();
				slideControl('left');				
			}
		}
	});

	// key up
	$(document).on('keydown', function(event){
		if (gimmeProps.slides.upSlide != null && gimmeProps.slides.lockSlide == false){
			if (event.which == 38){
				changeBackground();
				$(gimmeProps.slides.curSlide).animate({
					top:10000
				}, 300)
				$(gimmeProps.slides.upSlide).animate({
					top:0
				}, 300)
				event.preventDefault();
				slideControl('up');				
			}
		}
	});

	// key down
	$(document).on('keydown', function(event){
		if (gimmeProps.slides.downSlide != null && gimmeProps.slides.lockSlide == false){
			if (event.which == 40){
				changeBackground();
				$(gimmeProps.slides.curSlide).animate({
					top:-10000
				}, 300)
				$(gimmeProps.slides.downSlide).animate({
					top:0
				}, 300)
				event.preventDefault();
				slideControl('down');				
			}
		}
	});

	//swipe left
	$(window).on('swipeleft', function(event){
		if (gimmeProps.slides.rightSlide != null && gimmeProps.slides.lockSlide == false){
			changeBackground();
			$(gimmeProps.slides.curSlide).animate({
				left:-10000
			}, 300)
			$(gimmeProps.slides.rightSlide).animate({
				left:0
			}, 300)
			event.preventDefault();
			slideControl('right');
		}
	})

	//swipe right
	$(window).on('swiperight', function(event){
		if (gimmeProps.slides.leftSlide != null && gimmeProps.slides.lockSlide == false){
			changeBackground();
			$(gimmeProps.slides.curSlide).animate({
				left:10000
			}, 300)
			$(gimmeProps.slides.leftSlide).animate({
				left:0
			}, 300)
			event.preventDefault();
			slideControl('left');

		}
	})
	
	//swipe up
	$(window).on('swipeup', function(event){
		if (gimmeProps.slides.downSlide != null && gimmeProps.slides.lockSlide == false){
			changeBackground();
			$(gimmeProps.slides.curSlide).animate({
				top:-10000
			}, 300)
			$(gimmeProps.slides.downSlide).animate({
				top:0
			}, 300)
			slideControl('down');

		}
	})

	//swipe down
	$(window).on('swipedown', function(event){
		if (gimmeProps.slides.upSlide != null && gimmeProps.slides.lockSlide == false){
			changeBackground();
			$(gimmeProps.slides.curSlide).animate({
				top:10000
			}, 300)
			$(gimmeProps.slides.upSlide).animate({
				top:0
			}, 300)
			slideControl('up');
		}
	})

	//click right
	$('.rightcaret').add('.propcaretright').on('click', function(event){
		if (gimmeProps.slides.rightSlide != null && gimmeProps.slides.lockSlide == false){
			changeBackground();
			$(gimmeProps.slides.curSlide).animate({
				left:-10000
			}, 300)
			$(gimmeProps.slides.rightSlide).animate({
				left:0
			}, 300)
			event.preventDefault();
			slideControl('right');
		}
	})

	//click left
	$('.leftcaret').add('.propcaretleft').on('click', function(event){
		if (gimmeProps.slides.leftSlide != null && gimmeProps.slides.lockSlide == false){
			changeBackground();
			$(gimmeProps.slides.curSlide).animate({
				left:10000
			}, 300)
			$(gimmeProps.slides.leftSlide).animate({
				left:0
			}, 300)
			event.preventDefault();
			slideControl('left');

		}
	})
	
	//click down
	$('.downcaret').on('click', function(event){
		if (gimmeProps.slides.downSlide != null && gimmeProps.slides.lockSlide == false){
			changeBackground();
			$(gimmeProps.slides.curSlide).animate({
				top:-10000
			}, 300)
			$(gimmeProps.slides.downSlide).animate({
				top:0
			}, 300)
			slideControl('down');

		}
	})

	//click up
	$('.upcaret').on('click', function(event){
		if (gimmeProps.slides.upSlide != null && gimmeProps.slides.lockSlide == false){
			changeBackground();
			$(gimmeProps.slides.curSlide).animate({
				top:10000
			}, 300)
			$(gimmeProps.slides.upSlide).animate({
				top:0
			}, 300)
			slideControl('up');
		}
	})
}

function initMenu(){
	$('#deets').on('click', function(){
		//teleportation time
		$(gimmeProps.slides.curSlide).animate({top:-10000}, 300);
		$('#proplist').css({
			top:-10000,
			left:0	
		}).animate({top:0},300);

		//check if you are on the prop result screen
		if ($('#results').attr('state') == 'on'){
			$('#deets').click();
		}
		
		//next slides
		gimmeProps.slides.curSlide = '#proplist';
		gimmeProps.slides.downSlide = '#prop51';
		$('.downcaret').animate({opacity:.3}, 300);$('.rightcaret').add('.leftcaret').add('.upcaret').css('opacity', 0)
		$('.propcaretleft').add('.propcaretright').animate({opacity:0}, 300);


		//reset if in prop mode
		gimmeProps.propstate.propMode = false;
		$('.' + gimmeProps.propstate.propSelected).remove();
		setTimeout(function(){
			$('.' + gimmeProps.propstate.propSelected).add('.propheader').remove();
		}, 300);


	});
}

function initJSON(){
	$.getJSON('scripts/json/slidecontrol.json', function(data){
		populateSlides(data);
	});

	$.getJSON('scripts/json/prop51.json', function(data){
		gimmeProps.data.props['prop51'] = data.prop51;
	});

	$.getJSON('scripts/json/prop52.json', function(data){
		gimmeProps.data.props['prop52'] = data.prop52;
	});

	$.getJSON('scripts/json/prop53.json', function(data){
		gimmeProps.data.props['prop53'] = data.prop53;
	});

	$.getJSON('scripts/json/prop56.json', function(data){
		gimmeProps.data.props['prop56'] = data.prop56;
	});

	$.getJSON('scripts/json/prop59.json', function(data){
		gimmeProps.data.props['prop59'] = data.prop59;
	});

	$.getJSON('scripts/json/resources.json', function(data){
		gimmeProps.data.resources = data;
	});
}

function parseResources(k){
	for (var i=0 ; i < gimmeProps.data.resources.length ; i++){
		console.log(k)
			console.log(gimmeProps.data.resources[i].propid)
		if (gimmeProps.data.resources[i].propid == k){

			$('#resources a:eq(0)').attr('href', gimmeProps.data.resources[i].kqed);
			$('#resources a:eq(1)').attr('href', gimmeProps.data.resources[i].ballotfyi);
			$('#resources a:eq(2)').attr('href', gimmeProps.data.resources[i].ballotpedia);
			break;
		}
	}
}

/* GENERAL CONTROL
--------------------------------------------------------*/
function changeBackground(){
	var color = $(gimmeProps.slides.curSlide).css('background-color');
	$('html').css('background-color', color);
}

function calcPoints(d, direct){
	if (direct == 'left'){gimmeProps.propstate.points += parseInt(d.leftpoints)}
	else if (direct == 'right'){gimmeProps.propstate.points += parseInt(d.rightpoints)}
}


/* ONLOAD CONTROL
--------------------------------------------------------*/
window.onload = function(){
	initializeJQuery();
}