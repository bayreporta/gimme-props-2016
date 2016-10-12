function slideControl(direct){
	var s = gimmeProps.slides, p = gimmeProps.propstate;

	//empty all slides
	s.leftSlide = null; s.rightSlide = null; s.upSlide = null; s.downSlide = null;

	//entering back into proplist land? hide header
	if (s.curSlide == '#resources'){
		setTimeout(function(){
			$('.' + p.propSelected).add('.propheader').remove();
		}, 300);
	}

	//run function based on what type of slide we are dealing with
	if (p.returning == true){
		//configure slides
		s.curSlide = '#resources';		
		s.leftSlide = '#' + p.propSelected;s.rightSlide = '#' + p.propSelected;

		//destroy slides for prop
		$('.' + p.propSelected).remove();

		//configure resource elem
		$('#resources').attr({
			'leftslide': '#' + p.propSelected,
			'rightslide': '#' + p.propSelected
		})

		//carets
		$('.rightcaret').add('.leftcaret').animate({opacity:.3}, 300); $('.propcaretleft').add('.propcaretright').animate({opacity:0}, 300);
		
		//done
		p.returning = false;
	}
	else if (p.propMode == true){configurePropSlides(s, p, direct);}
	else {configureSlides(s, p, direct);}

	//activate menu if proplist
	if (s.curSlide == '#proplist'){$('#menu').fadeIn(300);}

	//reset next slides position
	resetSlidePosition(s);
}

function configurePropSlides(s, p, direct){
	var d = gimmeProps.data.props[p.propSelected];

	//if first time in, switch up carets
	if (s.curSlide == '#tutorial'){
		$('.rightcaret').animate({opacity:0}, 300);
		$('.propcaretright').add('.propcaretleft').animate({opacity:.3}, 300);;
	}
	//otherwise calculate points and determine next slides	
	else {

		//calculate points
		calcPoints(d[p.propID], direct);

		//determine which slide if applicaple in victory
		if ($('#' + p.propSelected + d[p.propID].rightid).attr('special') == 'victory'){		

			//Pick slide based on points
			var search;
			if (p.points < 0){search = 'oppose';}
			else if (p.points > 0){search = 'support';}
			else if (p.points == 0){search = 'default';}

			//loop through to get slide
			for (var i=0 ; i < d.length ; i++){
				if (d[i].id == d[p.propID].rightid){
					if (d[i].victorycond == search){
						$('#' + p.propSelected + d[p.propID].rightid + ' h2').text(d[i].maintext);
						$('#' + p.propSelected + d[p.propID].rightid + ' h3:eq(1)').text(d[i].subtext);
					}					
				}			
			}
		}

		//grab slide ids for next ones - establishes new p.propID
		if (direct == 'left'){p.propID = parseInt(d[p.propID].leftid);}
		else if (direct == 'right'){p.propID = parseInt(d[p.propID].rightid);}		
	}

	//configure next slides
	s.curSlide = '#' + d[p.propID].slideid; 
	s.leftSlide = '#' + d[p.propID].leftslide; 
	s.rightSlide = '#' + d[p.propID].rightslide;		

	//check victory conditions
	if (d[p.propID].victoryslide == true){
		
		//Add appropriate text
		var text;
		if (p.points < 0){
			text = "OPPOSE";
			$(s.curSlide).addClass('darkred');
			$('.prop-result[data="'+ p.propSelected +'"] .circle').css('background-color', '#7b272c');
			$('.prop-result[data="'+ p.propSelected +'"] .circle i').removeClass('fa-question').removeClass('fa-check').addClass('fa-times');
		}
		else if (p.points > 0){
			text = "SUPPORT";
			$(s.curSlide).addClass('darkgreen');
			$('.prop-result[data="'+ p.propSelected +'"] .circle').css('background-color', '#2c7b27');
			$('.prop-result[data="'+ p.propSelected +'"] .circle i').removeClass('fa-question').removeClass('fa-times').addClass('fa-check');
		}
		else if (p.points == 0){
			text = "GO EITHER WAY";
			$(s.curSlide).addClass('darkgray');
			$('.prop-result[data="'+ p.propSelected +'"] .circle').css('background-color', '#666666');
			$('.prop-result[data="'+ p.propSelected +'"] .circle i').removeClass('fa-times').removeClass('fa-check').addClass('fa-question');
		}

		//adding flavor text
		$('<h1/>',{
			'text': text,
			'style': 'font-size:8rem;line-height: 9rem;'
		}).prependTo(s.curSlide + ' .propquestion');

		//leaving prop mode
		p.propMode = false;
		p.returning = true;
	}
}

function configureSlides(s, p, direct){
	//grab element of current slide
	var $prevSlide = $(s.curSlide);

	//update current slide
	if (direct == 'up'){s.curSlide = $prevSlide.attr('upslide');}
	else if (direct == 'down'){s.curSlide = $prevSlide.attr('downslide');}
	else if (direct == 'left'){s.curSlide = $prevSlide.attr('leftslide');}
	else if (direct == 'right'){s.curSlide = $prevSlide.attr('rightslide');}

	//update directional slides and carets
	var $thisSlide = $(s.curSlide);

	if ($thisSlide.attr('upslide') != undefined){s.upSlide = $($thisSlide).attr('upslide');$('.upcaret').animate({opacity:.3}, 300);}
	else {$('.upcaret').animate({opacity:0}, 300);}

	if ($thisSlide.attr('downslide') != undefined){s.downSlide = $($thisSlide).attr('downslide');$('.downcaret').animate({opacity:.3}, 300);}
	else {$('.downcaret').animate({opacity:0}, 300);}

	if ($thisSlide.attr('leftslide') != undefined){s.leftSlide = $($thisSlide).attr('leftslide');$('.leftcaret').animate({opacity:.3}, 300);}
	else {$('.leftcaret').animate({opacity:0}, 300);}

	if ($thisSlide.attr('rightslide') != undefined){s.rightSlide = $($thisSlide).attr('rightslide');$('.rightcaret').animate({opacity:.3}, 300);}
	else {$('.rightcaret').animate({opacity:0}, 300);}

	//lock slide if applicable
	if ($($thisSlide).attr('lockslide') == 'true'){s.lockSlide = true;}

	//clear animations if applicable
	if ($($thisSlide).attr('clearanimation') == 'true'){clearAnimations();}

	//animation control if applicable
	if ($($thisSlide).attr('animation') == 'true'){toggleAnimation(s.curSlide);}

	//load prop data if tutorial
	if (s.curSlide == '#tutorial'){initProp($prevSlide.attr('id'),s,p);}
}

function populateSlides(d){
	//provide base slide elems directional slides
	for (var i=0; i < d.length ; i++){
		if (d[i].leftid != undefined){$(d[i].targetid).attr('leftslide', d[i].leftid);}
		if (d[i].rightid != undefined){$(d[i].targetid).attr('rightslide', d[i].rightid);}		
		if (d[i].upid != undefined){$(d[i].targetid).attr('upslide', d[i].upid);}		
		if (d[i].downid != undefined){$(d[i].targetid).attr('downslide', d[i].downid);}
		if (d[i].lockslide != false){$(d[i].targetid).attr('lockslide', 'true');}		
		if (d[i].animation != false){$(d[i].targetid).attr('animation', 'true');}		
		if (d[i].clearanimation != false){$(d[i].targetid).attr('clearanimation', 'true');}		
	}
}

function resetSlidePosition(s){
	//configure next slides
	$(s.upSlide).css({left:0,top:-10000,'z-index':0});
	$(s.downSlide).css({left:0,top:10000,'z-index':0});
	$(s.leftSlide).css({left:-10000,top:0,'z-index':0});
	$(s.rightSlide).css({left:10000,top:0,'z-index':0});
}

function initProp(prev,s,p){
	//configure prop data
	prev = prev.split('#');
	p.propSelected = prev[0]; //lock in which prop we are exploring
	var d = gimmeProps.data.props[p.propSelected]; //grab data for selected prop
	p.points = 0; //reset points for quiz
	p.propID = 0; //first slide of the prop stack
	p.propMode = true; //activate prop slide transitions

	//configure next slide
	s.rightSlide = '#' + p.propSelected + '0';	

	//populate resources
	parseResources(d[0].propID);
	
	//load prop slides
	loadPropSlides(d, p.propSelected);
}

function loadPropSlides(d, p){
	//add prop header
	$('<div/>', {
		'class': 'propheader'
	}).appendTo('#container');

	$('.propheader').append(gimmeProps.header[p].icon);
	$('.propheader svg').css('fill', gimmeProps.header[p].color)

	$('<h2/>', {
		'text': gimmeProps.header[p].name 
	}).appendTo('.propheader');


	//build slides
	for (var i = 0 ; i < d.length ; i++){
		//check if obj exists
		if (!d[i].hasOwnProperty('lefttext')){d[i]['lefttext'] = '';}
		if (!d[i].hasOwnProperty('subtext')){d[i]['subtext'] = '';}
		if (!d[i].hasOwnProperty('righttext')){d[i]['righttext'] = '';}
		if (!d[i].hasOwnProperty('victoryslide')){d[i]['victoryslide'] = false;}
		if (!d[i].hasOwnProperty('special')){d[i]['special'] = false;}

		//base template
			
			//base section
			$('<section/>', {
				'id': 		d[i].slideid,
				'class': 	'relative startpos ' + p,
				'special': 	d[i].special
			}).appendTo('#container');	


			//prop question shell
			$('<div/>', {
				'class': 'propquestion'
			}).appendTo('#' + d[i].slideid);


			//prop question type
			if (d[i].victoryslide == true){				
				$('<h2/>', {	
					'text': d[i].maintext,
					'class': 'txtcenter'
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
}


	
	

	