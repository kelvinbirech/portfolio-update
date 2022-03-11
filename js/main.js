;(function () {
	
	
	'use strict';
    
    const cfg = {
                scrollDuration : 800, // smoothscroll duration
                mailChimpURL   : ''   // mailchimp url
                };
    const $WIN = $(window);

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};
	
	var vid = document.getElementById("myVideo");
	vid.playbackRate = 0.7;

 /* preloader
    * -------------------------------------------------- */
 const ssPreloader = function() {

	$("html").addClass('ss-preload');

	$WIN.on('load', function() {

		// force page scroll position to top at page refresh
		$('html, body').animate({ scrollTop: 0 }, 'normal');

		// will first fade out the loading animation 
		$("#loader").fadeOut("slow", function() {
			// will fade out the whole DIV that covers the website.
			$("#preloader").delay(100).fadeOut("slow");
		}); 
		
		// for hero content animations 
		$("html").removeClass('ss-preload');
		$("html").addClass('ss-loaded');

	});
};


/* move header
* -------------------------------------------------- */
const ssMoveHeader = function () {

	const $hero = $('.fh5co-about-me'),
		  $hdr = $('.s-header'),
		  triggerHeight = $hero.outerHeight() - 170;


	$WIN.on('scroll', function () {

		let loc = $WIN.scrollTop();

		if (loc > triggerHeight) {
			$hdr.addClass('sticky');
		} else {
			$hdr.removeClass('sticky');
		}

		if (loc > triggerHeight + 20) {
			$hdr.addClass('offset');
		} else {
			$hdr.removeClass('offset');
		}

		if (loc > triggerHeight + 150) {
			$hdr.addClass('scrolling');
		} else {
			$hdr.removeClass('scrolling');
		}

	});

};



/* mobile menu
* ---------------------------------------------------- */ 
const ssMobileMenu = function() {

	const $toggleButton = $('.s-header__menu-toggle');
	const $headerContent = $('.s-header__content');
	const $siteBody = $("body");

	$toggleButton.on('click', function(event){
		event.preventDefault();
		$toggleButton.toggleClass('is-clicked');
		$siteBody.toggleClass('menu-is-open');
	});

	$headerContent.find('.s-header__nav a, .btn').on("click", function() {

		// at 900px and below
		if (window.matchMedia('(max-width: 900px)').matches) {
			$toggleButton.toggleClass('is-clicked');
			$siteBody.toggleClass('menu-is-open');
		}
	});

	$WIN.on('resize', function() {

		// above 900px
		if (window.matchMedia('(min-width: 901px)').matches) {
			if ($siteBody.hasClass("menu-is-open")) $siteBody.removeClass("menu-is-open");
			if ($toggleButton.hasClass("is-clicked")) $toggleButton.removeClass("is-clicked");
		}
	});

};







	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};



	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 600, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	



	
	$(function(){
		contentWayPoint();
		goToTop();
		
		fullHeight();
	
		ssPreloader();
        
        ssMoveHeader();
        ssMobileMenu();
	
	
	});


}());

