/* SLIDE CONTROL
--------------------------------------------------------*/
function configureSlides(direct){
	leftSlide = null; rightSlide = null; upSlide = null; downSlide = null;

	//hide title
	if (disappearing == true){
		setTimeout(function(){
			$('.' + propSelected).add('.propheader').remove();
		}, 300);
		disappearing = false;
	}

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
		curSlide = '#resources'; leftSlide = '#' + propSelected; rightSlide = '#' + propSelected; returning = false; disappearing = true;		
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

	else if (curSlide == '#yescookie' && direct == 'left' || curSlide == '#nocookie' && direct == 'right' || curSlide == '#prop51' && direct == 'up'){   
		clearAnimations(); curSlide = '#proplist'; downSlide = '#prop51'; tutorial = false;
		$('#menu').fadeIn(300);		
		$('.downcaret').animate({opacity:.3}, 300); $('.rightcaret').add('.leftcaret').add('.upcaret').animate({opacity:0}, 300);

	}
	//TUTORIAL MASTER
	else if (tutorial == true && direct == 'right'){ 
		clearAnimations(); loadProp(propSelected); curSlide = '#tutorial'; tutorial = false;rightSlide = '#' + propSlide;
		$('.rightcaret').animate({opacity:.3}, 300); $('.leftcaret').add('.upcaret').add('.downcaret').animate({opacity:0}, 300);
	}
	//PROP LIST 51
	else if (curSlide == '#resources' && propSelected == 'prop51' || curSlide == '#proplist' && direct == 'down' || curSlide == '#prop52' && direct == 'up' || curSlide == '#prop65' && direct == 'down'){   
		clearAnimations(); dropHammer(true);
		curSlide = '#prop51'; upSlide = '#prop65'; downSlide = '#prop52'; propSelected = 'prop51'; tutorial = true;
		$('.downcaret').add('.upcaret').add('.rightcaret').animate({opacity:.3}, 300); $('.leftcaret').animate({opacity:0}, 300);
	}	
	//PROP LIST 52
	else if (curSlide == '#resources' && propSelected == 'prop52' || curSlide == '#prop51' && direct == 'down' || curSlide == '#prop53' && direct == 'up'){   
		clearAnimations(); moveCoins(true);
		curSlide = '#prop52'; upSlide = '#prop51'; downSlide = '#prop53'; propSelected = 'prop52'; tutorial = true;
	}	
	//PROP LIST 53
	else if (curSlide == '#resources' && propSelected == 'prop53' || curSlide == '#prop52' && direct == 'down' || curSlide == '#prop54' && direct == 'up'){   
		clearAnimations();
		curSlide = '#prop53'; upSlide = '#prop52'; downSlide = '#prop54'; propSelected = 'prop53'; tutorial = true;
	}	
	//PROP LIST 54
	else if (curSlide == '#resources' && propSelected == 'prop54' || curSlide == '#prop53' && direct == 'down' || curSlide == '#prop55' && direct == 'up'){   
		clearAnimations();
		curSlide = '#prop54'; upSlide = '#prop53'; downSlide = '#prop55'; propSelected = 'prop54'; tutorial = true;
	}	
	//PROP LIST 55
	else if (curSlide == '#resources' && propSelected == 'prop55' || curSlide == '#prop54' && direct == 'down' || curSlide == '#prop56' && direct == 'up'){   
		clearAnimations();
		curSlide = '#prop55'; upSlide = '#prop54'; downSlide = '#prop56'; propSelected = 'prop55'; tutorial = true;
	}	
	//PROP LIST 56
	else if (curSlide == '#resources' && propSelected == 'prop56' || curSlide == '#prop55' && direct == 'down' || curSlide == '#prop57' && direct == 'up'){   
		clearAnimations();
		curSlide = '#prop56'; upSlide = '#prop55'; downSlide = '#prop57'; propSelected = 'prop56'; tutorial = true;
	}	
	//PROP LIST 57
	else if (curSlide == '#resources' && propSelected == 'prop57' || curSlide == '#prop56' && direct == 'down' || curSlide == '#prop58' && direct == 'up'){   
		clearAnimations();
		curSlide = '#prop57'; upSlide = '#prop56'; downSlide = '#prop58'; propSelected = 'prop57'; tutorial = true;
	}	
	//PROP LIST 58
	else if (curSlide == '#resources' && propSelected == 'prop58' || curSlide == '#prop57' && direct == 'down' || curSlide == '#prop59' && direct == 'up'){   
		clearAnimations();
		curSlide = '#prop58'; upSlide = '#prop57'; downSlide = '#prop59'; propSelected = 'prop58'; tutorial = true;
	}	
	//PROP LIST 59
	else if (curSlide == '#resources' && propSelected == 'prop59' || curSlide == '#prop58' && direct == 'down' || curSlide == '#prop60' && direct == 'up'){   
		clearAnimations(); rainingCoins(); 
		curSlide = '#prop59'; upSlide = '#prop58'; downSlide = '#prop60'; rightSlide = '#tutorial'; propSelected = 'prop59';tutorial = true;
	}	
	//PROP LIST 60
	else if (curSlide == '#resources' && propSelected == 'prop60' || curSlide == '#prop59' && direct == 'down'  || curSlide == '#prop61' && direct == 'up'){   
		clearAnimations();
		curSlide = '#prop60'; upSlide = '#prop59'; downSlide = '#prop61'; propSelected = 'prop60';tutorial = true;
	}	
	//PROP LIST 61
	else if (curSlide == '#resources' && propSelected == 'prop61' || curSlide == '#prop60' && direct == 'down'  || curSlide == '#prop62' && direct == 'up'){   
		clearAnimations();
		curSlide = '#prop61'; upSlide = '#prop60'; downSlide = '#prop62'; propSelected = 'prop61';tutorial = true;
	}	
	//PROP LIST 62 AND 66
	else if (curSlide == '#resources' && propSelected == 'prop62' || curSlide == '#prop61' && direct == 'down'  || curSlide == '#prop63' && direct == 'up'){   
		clearAnimations();
		curSlide = '#prop62'; upSlide = '#prop61'; downSlide = '#prop63'; propSelected = 'prop62';tutorial = true;
	}
	//PROP LIST 63
	else if (curSlide == '#resources' && propSelected == 'prop63' || curSlide == '#prop62' && direct == 'down'  || curSlide == '#prop64' && direct == 'up'){   
		clearAnimations();
		curSlide = '#prop63'; upSlide = '#prop62'; downSlide = '#prop64'; propSelected = 'prop63';tutorial = true;
	}	
	//PROP LIST 64
	else if (curSlide == '#resources' && propSelected == 'prop64' || curSlide == '#prop63' && direct == 'down'  || curSlide == '#prop65' && direct == 'up'){   
		clearAnimations();
		curSlide = '#prop64'; upSlide = '#prop63'; downSlide = '#prop65'; propSelected = 'prop64';tutorial = true;
	}	
	//PROP LIST 65 AND 67
	else if (curSlide == '#resources' && propSelected == 'prop65' || curSlide == '#prop64' && direct == 'down'  || curSlide == '#prop51' && direct == 'up'){   
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