function slideControl(direct){
	var s = gimmeProps.slides, p = gimmeProps.propstate;

	//empty all slides
	s.leftSlide = null; s.rightSlide = null; s.upSlide = null; s.downSlide = null;

	//run function based on what type of slide we are dealing with
	if (p.propMode == true){configurePropSlides(s, p, direct);}
	//returning
	//etc
	else { configureSlides(s, p, direct);}

	//reset next slides position
	resetSlidePosition(s);
}

function configurePropSlides(s, p, direct){
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

function configureSlides(s, p, direct){
	//grab element of current slide
	var $prevSlide = $(s.curSlide);

	//update current slide
	if (direct == 'up'){s.curSlide = $prevSlide.attr('upslide');}
	else if (direct == 'down'){s.curSlide = $prevSlide.attr('downslide');}
	else if (direct == 'left'){s.curSlide = $prevSlide.attr('leftslide');}
	else if (direct == 'right'){s.curSlide = $prevSlide.attr('rightslide');}

	//update directional slides
	var $thisSlide = $(s.curSlide);
	if ($thisSlide.attr('upslide') != undefined){s.upSlide = $($thisSlide.attr('upslide'));}
	if ($thisSlide.attr('downslide') != undefined){s.downSlide = $($thisSlide.attr('downslide'));}
	if ($thisSlide.attr('leftslide') != undefined){s.leftSlide = $($thisSlide.attr('leftslide'));}
	if ($thisSlide.attr('rightslide') != undefined){s.rightSlide = $($thisSlide.attr('rightslide'));}
}

function populateSlides(d){
	for (var i=0; i < d.length ; i++){
		if (d[i].leftid != undefined){$(d[i].targetid).attr('leftslide', d[i].leftid);}
		if (d[i].rightid != undefined){$(d[i].targetid).attr('rightslide', d[i].rightid);}
		if (d[i].upid != undefined){$(d[i].targetid).attr('upslide', d[i].upid);}
		if (d[i].downid != undefined){$(d[i].targetid).attr('downslide', d[i].downid);}
	}
}

function resetSlidePosition(s){
	//configure next slides
	$(s.upSlide).css({left:0,top:-10000,'z-index':0});
	$(s.downSlide).css({left:0,top:10000,'z-index':0});
	$(s.leftSlide).css({left:-10000,top:0,'z-index':0});
	$(s.rightSlide).css({left:10000,top:0,'z-index':0});
}