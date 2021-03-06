/* GLOBAL VARIABLES - GIMME PROPS 2016
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
		curSlide: '#intro',
		upSlide: null,
		downSlide: null,
		leftSlide: null,
		rightSlide: '#about',
		lockSlide: false
	},
	data:{
		master: [],
		cookie: false,
		props: {},
		resources: [],
		header: []
	},
	score:{}
};

/* COOKIE CONTROL
--------------------------------------------------------*/
function setCookie(){
	Cookies.set('gimme props', gimmeProps.score, {expires: 30});
	gimmeProps.data.cookie = true;
}

function getCookie(){
	var cookie = Cookies.getJSON('gimme props');

	if (cookie !== undefined){
		gimmeProps.data.cookie = true;
		gimmeProps.score = cookie;
		return true;
	}
}

function returnCustomer(){
	//change cookie slide text
	$('#cookie h1').text('You haz cookie!');
	$('#cookie p').text('');
	$('#cookie h2').text('Looks like this isn\'t your first prop rodeo. We\'ve loaded your previous progress. Have a ball.');

	//change next slides
	gimmeProps.slides.curSlide = '#cookie';
	gimmeProps.slides.leftSlide = '#proplist';
	gimmeProps.slides.rightSlide = '#proplist';

	//update prop positions on list screen
	for (var i = 0 ; i < gimmeProps.data.resources.length; i++){
		if (gimmeProps.score[gimmeProps.data.resources[i].propselect] === null){continue;}
		else if (gimmeProps.score[gimmeProps.data.resources[i].propselect] == -1){
			$('#prop' + gimmeProps.data.resources[i].propid + ' .circle i').css('color', '#7b272c').removeClass('fa-question').removeClass('fa-check').addClass('fa-times');
		}
		else if (gimmeProps.score[gimmeProps.data.resources[i].propselect] === 0){
			$('#prop' + gimmeProps.data.resources[i].propid + ' .circle i').css('color', '#666').removeClass('fa-times').removeClass('fa-check').addClass('fa-question');
		}
		else if (gimmeProps.score[gimmeProps.data.resources[i].propselect] == 1){
			$('#prop' + gimmeProps.data.resources[i].propid + ' .circle i').css('color', '#2c7b27').removeClass('fa-question').removeClass('fa-times').addClass('fa-check');
		}
	}

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
		if (gimmeProps.slides.rightSlide !== null && gimmeProps.slides.lockSlide === false){
			if (event.which == 39){
				changeBackground();
				$(gimmeProps.slides.curSlide).animate({
					left:-10000
				}, 300);
				$(gimmeProps.slides.rightSlide).animate({
					left:0
				}, 300);
				event.preventDefault();
				slideControl('right');
			}
		}
	});

	// key left
	$(document).on('keydown', function(event){
		if (gimmeProps.slides.leftSlide !== null && gimmeProps.slides.lockSlide === false){
			if (event.which == 37){
				changeBackground();
				$(gimmeProps.slides.curSlide).animate({
					left:10000
				}, 300);
				$(gimmeProps.slides.leftSlide).animate({
					left:0
				}, 300);
				event.preventDefault();
				slideControl('left');				
			}
		}
	});

	// key up
	$(document).on('keydown', function(event){
		if (gimmeProps.slides.upSlide !== null && gimmeProps.slides.lockSlide === false){
			if (event.which == 38){
				changeBackground();
				$(gimmeProps.slides.curSlide).animate({
					top:10000
				}, 300);
				$(gimmeProps.slides.upSlide).animate({
					top:0
				}, 300);
				event.preventDefault();
				slideControl('up');				
			}
		}
	});

	// key down
	$(document).on('keydown', function(event){
		if (gimmeProps.slides.downSlide !== null && gimmeProps.slides.lockSlide === false){
			if (event.which == 40){
				changeBackground();
				$(gimmeProps.slides.curSlide).animate({
					top:-10000
				}, 300);
				$(gimmeProps.slides.downSlide).animate({
					top:0
				}, 300);
				event.preventDefault();
				slideControl('down');				
			}
		}
	});

	//swipe left
	$(window).on('swipeleft', function(event){
		if (gimmeProps.slides.rightSlide !== null && gimmeProps.slides.lockSlide === false){
			changeBackground();
			$(gimmeProps.slides.curSlide).animate({
				left:-10000
			}, 300);
			$(gimmeProps.slides.rightSlide).animate({
				left:0
			}, 300);
			event.preventDefault();
			slideControl('right');
		}
	});

	//swipe right
	$(window).on('swiperight', function(event){
		if (gimmeProps.slides.leftSlide !== null && gimmeProps.slides.lockSlide === false){
			changeBackground();
			$(gimmeProps.slides.curSlide).animate({
				left:10000
			}, 300);
			$(gimmeProps.slides.leftSlide).animate({
				left:0
			}, 300);
			event.preventDefault();
			slideControl('left');

		}
	});
	
	//swipe up
	$(window).on('swipeup', function(event){
		if (gimmeProps.slides.downSlide !== null && gimmeProps.slides.lockSlide === false){
			changeBackground();
			$(gimmeProps.slides.curSlide).animate({
				top:-10000
			}, 300);
			$(gimmeProps.slides.downSlide).animate({
				top:0
			}, 300);
			slideControl('down');

		}
	});

	//swipe down
	$(window).on('swipedown', function(event){
		if (gimmeProps.slides.upSlide !== null && gimmeProps.slides.lockSlide === false){
			changeBackground();
			$(gimmeProps.slides.curSlide).animate({
				top:10000
			}, 300);
			$(gimmeProps.slides.upSlide).animate({
				top:0
			}, 300);
			slideControl('up');
		}
	});

	//click right
	$('.rightcaret').add('.propcaretright').on('click', function(event){
		if (gimmeProps.slides.rightSlide !== null && gimmeProps.slides.lockSlide === false){
			changeBackground();
			$(gimmeProps.slides.curSlide).animate({
				left:-10000
			}, 300);
			$(gimmeProps.slides.rightSlide).animate({
				left:0
			}, 300);
			event.preventDefault();
			slideControl('right');
		}
	});

	//click left
	$('.leftcaret').add('.propcaretleft').on('click', function(event){
		if (gimmeProps.slides.leftSlide !== null && gimmeProps.slides.lockSlide === false){
			changeBackground();
			$(gimmeProps.slides.curSlide).animate({
				left:10000
			}, 300);
			$(gimmeProps.slides.leftSlide).animate({
				left:0
			}, 300);
			event.preventDefault();
			slideControl('left');

		}
	});
	
	//click down
	$('.downcaret').on('click', function(event){
		if (gimmeProps.slides.downSlide !== null && gimmeProps.slides.lockSlide === false){
			changeBackground();
			$(gimmeProps.slides.curSlide).animate({
				top:-10000
			}, 300);
			$(gimmeProps.slides.downSlide).animate({
				top:0
			}, 300);
			slideControl('down');

		}
	});

	//click up
	$('.upcaret').on('click', function(event){
		if (gimmeProps.slides.upSlide !== null && gimmeProps.slides.lockSlide === false){
			changeBackground();
			$(gimmeProps.slides.curSlide).animate({
				top:10000
			}, 300);
			$(gimmeProps.slides.upSlide).animate({
				top:0
			}, 300);
			slideControl('up');
		}
	});
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
		$('.downcaret').animate({opacity:0.3}, 300);$('.rightcaret').add('.leftcaret').add('.upcaret').css('opacity', 0);
		$('.propcaretleft').add('.propcaretright').animate({opacity:0}, 300);


		//reset if in prop mode
		gimmeProps.propstate.propMode = false;
		$('.' + gimmeProps.propstate.propSelected).remove();
		setTimeout(function(){
			$('.' + gimmeProps.propstate.propSelected).add('.propheader').remove();
		}, 300);


	});
}

function initData(id){
	$.getJSON('scripts/json/' + id + '.json', function(d){
		gimmeProps.data.props[id] = d[id];
		gimmeProps.score[id] = null;
	});
}

function initJSON(){
	$.getJSON('scripts/json/master.json', function(data){
		gimmeProps.data.master = data;

		for (var i = 0 ; i < gimmeProps.data.master.length; i++){
			initData(data[i].slideid);
		}
	});

	$.getJSON('scripts/json/slidecontrol.json', function(data){
		populateSlides(data);
	});

	$.getJSON('scripts/json/resources.json', function(data){
		gimmeProps.data.resources = data;
	});

	$.getJSON('scripts/json/header.json', function(data){
		gimmeProps.data.header = data;
	});
}

function parseResources(k){
	for (var i=0 ; i < gimmeProps.data.resources.length ; i++){
		if (gimmeProps.data.resources[i].propid == k){
			$('#resources a:eq(0)').attr('href', gimmeProps.data.resources[i].kqed);
			$('#resources a:eq(1)').attr('href', gimmeProps.data.resources[i].ballotfyi);
			$('#resources a:eq(2)').attr('href', gimmeProps.data.resources[i].ballotpedia);
			break;
		}
	}
}

function retreiveHeader(k){
	for (var i=0 ; i < gimmeProps.data.header.length ; i++){
		if (gimmeProps.data.header[i].propid == k){
			
			//init vals if dont exist
			if (!gimmeProps.data.header[i].hasOwnProperty('icon')){gimmeProps.data.header[i].icon = '';}
			if (!gimmeProps.data.header[i].hasOwnProperty('color')){gimmeProps.data.header[i].color = '';}
			return gimmeProps.data.header[i];
		}
	}
	return null;
}

/* GENERAL CONTROL
--------------------------------------------------------*/
function changeBackground(){
	var color = $(gimmeProps.slides.curSlide).css('background-color');
	$('html').css('background-color', color);
}

function calcPoints(d, direct){
	if (direct == 'left'){gimmeProps.propstate.points += parseInt(d.leftpoints);}
	else if (direct == 'right'){gimmeProps.propstate.points += parseInt(d.rightpoints);}
}


/* ONLOAD CONTROL
--------------------------------------------------------*/
window.onload = function(){
	initializeJQuery();
};