/* SLIDE CONTROL
--------------------------------------------------------*/
function configureSlides(direct){
	var s = gimmeProps.slides, p = gimmeProps.propstate;

	//empty all slides
	s.leftSlide = null; s.rightSlide = null; s.upSlide = null; s.downSlide = null;

	//hide title
	if (p.disappearing == true){
		setTimeout(function(){
			$('.' + p.propSelected).add('.propheader').remove();
		}, 300);
		p.disappearing = false;
	}

	//forgive me conditional gods
	//PROPS ALL
	if (p.propMode == true){   

		//first pass with prop?
		if (p.firstPropPass == true){
			$('.rightcaret').animate({opacity:0}, 300);
			$('.propcaretright').add('.propcaretleft').fadeIn(300);
			p.firstPropPass = false;
		}
		else {
			//calculate points
			calcPoints(gimmeProps.data.props[p.propSelected][p.propID], direct);

			//grab slide ids for next ones - establishes new p.propID
			if (direct == 'left'){
				p.propID = parseInt(gimmeProps.data.props[p.propSelected][p.propID].leftid);	
			}
			else if (direct == 'right'){
				p.propID = parseInt(gimmeProps.data.props[p.propSelected][p.propID].rightid);
			}		
		}

		//configure next slides
		s.curSlide = '#' + gimmeProps.data.props[p.propSelected][p.propID].slideid; s.leftSlide = '#' + gimmeProps.data.props[p.propSelected][p.propID].leftslide; s.rightSlide = '#' + gimmeProps.data.props[p.propSelected][p.propID].rightslide;		

		//check victory conditions
		if (gimmeProps.data.props[p.propSelected][p.propID].victoryslide == true){
			
			//Add appropriate text
			var text;

			if (p.points < 0){
				text = "OPPOSE IT!";
				$(s.curSlide).addClass('darkred');
			}
			else if (p.points > 0){
				text = "SUPPORT IT!";
				$(s.curSlide).addClass('darkgreen');
			}
			else if (p.points == 0){
				text = "GO EITHER WAY";
				$(s.curSlide).addClass('darkgray');
			}

			$('<h1/>',{
				'text': text,
				'style': 'font-size:8rem;line-height: 9rem;'
			}).prependTo(s.curSlide + ' .propquestion');

			p.propMode = false;
			p.returning = true;
		}
	}
	//RETURNING TO PROP
	else if (p.returning == true){   
		s.curSlide = '#resources'; s.leftSlide = '#' + p.propSelected; s.rightSlide = '#' + p.propSelected; p.returning = false; p.disappearing = true;		
		$('.rightcaret').add('.leftcaret').animate({opacity:.3}, 300); $('.propcaretleft').add('.propcaretright').fadeOut(300);
	}
	//ABOUT
	else if (s.curSlide == '#intro' && direct == 'right' || s.curSlide == '#whoweare' && direct == 'up'){    
		s.curSlide = '#about'; s.rightSlide = '#cookie'; s.downSlide = '#whoweare';
		$('.rightcaret').add('.downcaret').animate({opacity:.3}, 300);$('.upcaret').add('.leftcaret').animate({opacity:0}, 300);
	}
	//WHO WE ARE
	else if (s.curSlide == '#about' && direct == 'down'){   
		s.curSlide = '#whoweare'; s.upSlide = '#about'; s.rightSlide = '#cookie';
		$('.rightcaret').add('.upcaret').animate({opacity:.3}, 300);$('.leftcaret').add('.downcaret').animate({opacity:0}, 300);
	}
	//COOKIE
	else if (s.curSlide == '#about' && direct == 'right' || s.curSlide == '#whoweare' && direct == 'right'){  
		s.curSlide = '#cookie'; s.leftSlide = '#yescookie'; s.rightSlide = '#nocookie';
		$('.rightcaret').add('.leftcaret').animate({opacity:.3}, 300);$('.upcaret').add('.downcaret').animate({opacity:0}, 300);
		$('html').css('background-color', '#fff');
		s.lockSlide = true;
		setTimeout(noshCookie, 1300);
	}	
	//YES COOKIE
	else if (s.curSlide == '#cookie' && direct == 'left'){   
		s.curSlide = '#yescookie'; s.leftSlide = '#proplist';
		$('.rightcaret').add('.leftcaret').add('.upcaret').add('.downcaret').animate({opacity:0}, 300);
		s.lockSlide = true;
		dropCookie('yes');
	}
	//NO COOKIE
	else if (s.curSlide == '#cookie' && direct == 'right'){   
		s.curSlide = '#nocookie'; s.rightSlide = '#proplist';
		$('.rightcaret').add('.leftcaret').add('.upcaret').add('.downcaret').animate({opacity:0}, 300);
		s.lockSlide = true;
		dropCookie('no');
	}
	//PROP LIST MAIN _____________________________________________________________________//

	else if (s.curSlide == '#yescookie' && direct == 'left' || s.curSlide == '#nocookie' && direct == 'right' || s.curSlide == '#prop51' && direct == 'up'){   
		clearAnimations(); s.curSlide = '#proplist'; s.downSlide = '#prop51'; p.tutorial = false;
		$('#menu').fadeIn(300);		
		$('.downcaret').animate({opacity:.3}, 300); $('.rightcaret').add('.leftcaret').add('.upcaret').animate({opacity:0}, 300);

	}
	//p.tutorial MASTER
	else if (p.tutorial == true && direct == 'right'){ 
		clearAnimations(); loadProp(p.propSelected); s.curSlide = '#tutorial'; p.tutorial = false;s.rightSlide = '#' + s.propSlide;
		$('.rightcaret').animate({opacity:.3}, 300); $('.leftcaret').add('.upcaret').add('.downcaret').animate({opacity:0}, 300);
	}
	//PROP LIST 51
	else if (s.curSlide == '#resources' && p.propSelected == 'prop51' || s.curSlide == '#proplist' && direct == 'down' || s.curSlide == '#prop52' && direct == 'up' || s.curSlide == '#prop65' && direct == 'down'){   
		clearAnimations(); dropHammer(true);
		s.curSlide = '#prop51'; s.upSlide = '#prop65'; s.downSlide = '#prop52'; p.propSelected = 'prop51'; p.tutorial = true;
		$('.downcaret').add('.upcaret').add('.rightcaret').animate({opacity:.3}, 300); $('.leftcaret').animate({opacity:0}, 300);
	}	
	//PROP LIST 52
	else if (s.curSlide == '#resources' && p.propSelected == 'prop52' || s.curSlide == '#prop51' && direct == 'down' || s.curSlide == '#prop53' && direct == 'up'){   
		clearAnimations(); moveCoins(true);
		s.curSlide = '#prop52'; s.upSlide = '#prop51'; s.downSlide = '#prop53'; p.propSelected = 'prop52'; p.tutorial = true;
	}	
	//PROP LIST 53
	else if (s.curSlide == '#resources' && p.propSelected == 'prop53' || s.curSlide == '#prop52' && direct == 'down' || s.curSlide == '#prop54' && direct == 'up'){   
		clearAnimations();
		s.curSlide = '#prop53'; s.upSlide = '#prop52'; s.downSlide = '#prop54'; p.propSelected = 'prop53'; p.tutorial = true;
	}	
	//PROP LIST 54
	else if (s.curSlide == '#resources' && p.propSelected == 'prop54' || s.curSlide == '#prop53' && direct == 'down' || s.curSlide == '#prop55' && direct == 'up'){   
		clearAnimations();
		s.curSlide = '#prop54'; s.upSlide = '#prop53'; s.downSlide = '#prop55'; p.propSelected = 'prop54'; p.tutorial = true;
	}	
	//PROP LIST 55
	else if (s.curSlide == '#resources' && p.propSelected == 'prop55' || s.curSlide == '#prop54' && direct == 'down' || s.curSlide == '#prop56' && direct == 'up'){   
		clearAnimations();
		s.curSlide = '#prop55'; s.upSlide = '#prop54'; s.downSlide = '#prop56'; p.propSelected = 'prop55'; p.tutorial = true;
	}	
	//PROP LIST 56
	else if (s.curSlide == '#resources' && p.propSelected == 'prop56' || s.curSlide == '#prop55' && direct == 'down' || s.curSlide == '#prop57' && direct == 'up'){   
		clearAnimations();
		s.curSlide = '#prop56'; s.upSlide = '#prop55'; s.downSlide = '#prop57'; p.propSelected = 'prop56'; p.tutorial = true;
	}	
	//PROP LIST 57
	else if (s.curSlide == '#resources' && p.propSelected == 'prop57' || s.curSlide == '#prop56' && direct == 'down' || s.curSlide == '#prop58' && direct == 'up'){   
		clearAnimations();
		s.curSlide = '#prop57'; s.upSlide = '#prop56'; s.downSlide = '#prop58'; p.propSelected = 'prop57'; p.tutorial = true;
	}	
	//PROP LIST 58
	else if (s.curSlide == '#resources' && p.propSelected == 'prop58' || s.curSlide == '#prop57' && direct == 'down' || s.curSlide == '#prop59' && direct == 'up'){   
		clearAnimations();
		s.curSlide = '#prop58'; s.upSlide = '#prop57'; s.downSlide = '#prop59'; p.propSelected = 'prop58'; p.tutorial = true;
	}	
	//PROP LIST 59
	else if (s.curSlide == '#resources' && p.propSelected == 'prop59' || s.curSlide == '#prop58' && direct == 'down' || s.curSlide == '#prop60' && direct == 'up'){   
		clearAnimations(); rainingCoins(); 
		s.curSlide = '#prop59'; s.upSlide = '#prop58'; s.downSlide = '#prop60'; s.rightSlide = '#tutorial'; p.propSelected = 'prop59';p.tutorial = true;
	}	
	//PROP LIST 60
	else if (s.curSlide == '#resources' && p.propSelected == 'prop60' || s.curSlide == '#prop59' && direct == 'down'  || s.curSlide == '#prop61' && direct == 'up'){   
		clearAnimations();
		s.curSlide = '#prop60'; s.upSlide = '#prop59'; s.downSlide = '#prop61'; p.propSelected = 'prop60';p.tutorial = true;
	}	
	//PROP LIST 61
	else if (s.curSlide == '#resources' && p.propSelected == 'prop61' || s.curSlide == '#prop60' && direct == 'down'  || s.curSlide == '#prop62' && direct == 'up'){   
		clearAnimations();
		s.curSlide = '#prop61'; s.upSlide = '#prop60'; s.downSlide = '#prop62'; p.propSelected = 'prop61';p.tutorial = true;
	}	
	//PROP LIST 62 AND 66
	else if (s.curSlide == '#resources' && p.propSelected == 'prop62' || s.curSlide == '#prop61' && direct == 'down'  || s.curSlide == '#prop63' && direct == 'up'){   
		clearAnimations();
		s.curSlide = '#prop62'; s.upSlide = '#prop61'; s.downSlide = '#prop63'; p.propSelected = 'prop62';p.tutorial = true;
	}
	//PROP LIST 63
	else if (s.curSlide == '#resources' && p.propSelected == 'prop63' || s.curSlide == '#prop62' && direct == 'down'  || s.curSlide == '#prop64' && direct == 'up'){   
		clearAnimations();
		s.curSlide = '#prop63'; s.upSlide = '#prop62'; s.downSlide = '#prop64'; p.propSelected = 'prop63';p.tutorial = true;
	}	
	//PROP LIST 64
	else if (s.curSlide == '#resources' && p.propSelected == 'prop64' || s.curSlide == '#prop63' && direct == 'down'  || s.curSlide == '#prop65' && direct == 'up'){   
		clearAnimations();
		s.curSlide = '#prop64'; s.upSlide = '#prop63'; s.downSlide = '#prop65'; p.propSelected = 'prop64';p.tutorial = true;
	}	
	//PROP LIST 65 AND 67
	else if (s.curSlide == '#resources' && p.propSelected == 'prop65' || s.curSlide == '#prop64' && direct == 'down'  || s.curSlide == '#prop51' && direct == 'up'){   
		clearAnimations();
		s.curSlide = '#prop65'; s.upSlide = '#prop64'; s.downSlide = '#prop51'; p.propSelected = 'prop65';p.tutorial = true;
		$('.downcaret').add('.upcaret').add('.rightcaret').animate({opacity:.3}, 300); $('.leftcaret').animate({opacity:0}, 300);
	}	

	//configure next slides
	$(s.upSlide).css({left:0,top:-10000,'z-index':0});
	$(s.downSlide).css({left:0,top:10000,'z-index':0});
	$(s.leftSlide).css({left:-10000,top:0,'z-index':0});
	$(s.rightSlide).css({left:10000,top:0,'z-index':0});
}

function loadProp(p){
	var d = gimmeProps.data.props[p];
	gimmeProps.propstate.points = 0;	gimmeProps.propstate.propID = 0; gimmeProps.propstate.propMode = true; gimmeProps.propstate.firstPropPass = true;

	var resources = parseResources(59);

	//populate resource slide
	$('#resources a:eq(0)').attr('href', resources.kqed);
	$('#resources a:eq(1)').attr('href', resources.ballotfyi);
	$('#resources a:eq(2)').attr('href', resources.ballotpedia);

	//add prop header
	$('<div/>', {
		'class': 'propheader'
	}).appendTo('#container');

	$('.propheader').append(gimmeProps.header[gimmeProps.propstate.propSelected].icon);
	$('.propheader svg').css('fill', gimmeProps.header[gimmeProps.propstate.propSelected].color)

	$('<h2/>', {
		'text': gimmeProps.header[gimmeProps.propstate.propSelected].name 
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
	gimmeProps.slides.propSlide = d[0].slideid;
}