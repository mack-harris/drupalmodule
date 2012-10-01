/*
 * jLetter - jQuery text rotator plugin
 * http://do-web.com/jletter/overview
 *
 * Copyright 2011, Miriam Zusin
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://do-web.com/jletter/license
 */

(function($){
   $.fn.jLetter = function(options){
	   
	var options = $.extend({
		pause: 3000,
		rotateSpeed: 2500,
		fadeSpeed: 1000
	},options);

	return this.each(function() {            
		var hndl = this;
		
		//set class
		$(this).addClass("jLetter");
		
		//init slides
		this.slides = $(this).find(".slide");
		this.slides.hide();
		
		//init panel
		$(this).prepend("<div class='panel'><p></p></div>");	
		this.panel = $(this).find(".panel");
		this.par = this.panel.find("p");
		
		//sliding vars
		this.current = 0;
		this.slides_num = this.slides.length;
		
		this.random = function(X){
			return Math.floor(X * (Math.random() % 1));
		};
		
		this.randomBetween = function(MinV, MaxV){
			return MinV + hndl.random(MaxV - MinV + 1);
		};
		
		this.next = function(){
			
			if(hndl.current < hndl.slides_num - 1){
				hndl.current++;
			}
			else{
				hndl.current = 0;
			}			
			
		};
		
		this.makeEffect = function(){
			var par_txt = hndl.par.text();
			var letters_arr = jQuery.makeArray(par_txt.split(''));
			var letters_html = '';
			var j = 1;
			
			//replace text with spans
			for(var i=0; i<letters_arr.length; i++){
				if(letters_arr[i] == ' ')
					letters_html += '<span class="letter">&nbsp;</span>';
				else
					letters_html += '<span class="letter">' + letters_arr[i] + '</span>';
			}

			hndl.par.html(letters_html);
			hndl.par.find("span.letter").each(function(){
				$(this).css("position", "relative");
				$(this).animate({left: hndl.randomBetween(-150, 150), top:hndl.randomBetween(-75, 75), opacity: 0}, options.rotateSpeed, function(){
					if(hndl.par.find("span.letter:animated").length <= 1){
						hndl.next();
						hndl.run();					
					}
				});
				
				j++;
			});			
		};
		
		this.fadePar = function(){
			var cpar = $(hndl).find("div.slide:eq(" + hndl.current + ") p");
			hndl.par.hide();
			hndl.par.html(cpar.html());
			hndl.par.fadeIn(options.fadeSpeed);
		};
		
		this.run = function(){
			hndl.fadePar();
			
			setTimeout(function(){
							hndl.makeEffect();
						}, options.pause);	
						
			
		};
		
		this.run();
		
	});    
   };
})(jQuery);
