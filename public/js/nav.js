var Nav = function(Page) {
	this.Page = Page;
	this.toggleHamburger = toggleHamburger;
	this.toggleMenu = toggleMenu;
	this.showHamburger = showHamburger;
	this.hideHamburger = hideHamburger;
	this.showNav = showNav;
	this.hideNav = hideNav;
	this.sectionListener = sectionListener;
	this.toggleHamburgerBackground = toggleHamburgerBackground;
	this.toggleCurrentSection = toggleCurrentSection;

	this.toggleHamburger();
	this.sectionListener();
}

function toggleHamburger() {
	var _nav = this;
	var $hamburger = $("div#hamburger");

	if($hamburger.length) {
		$hamburger.click(function() {
			if($hamburger.hasClass('open')) {
				_nav.toggleHamburgerBackground(1);
				_nav.toggleCurrentSection(1);
			} else {
				_nav.toggleHamburgerBackground(0);
				_nav.toggleCurrentSection(0);
			}
			$(this).toggleClass('open');
			_nav.toggleMenu();

		})
	}
}

function toggleHamburgerBackground(opacity) {
	var $hamburgerBackground = $("div#hamburger-background");

	$hamburgerBackground.animate({
		opacity: opacity
	}, 250, "swing", function() {
		// animation complete
	});
}

function toggleCurrentSection(opacity) {
	var $currentSection = $("span#current-section");
	var currentSection = $currentSection.text();
	console.log(currentSection);

	$currentSection.animate({
		opacity: opacity
	}, 250, "swing", function() {
		// animation complete
	});
}

function toggleMenu() {
	var _nav = this;
	var $menu = $("div#menu");
	if($menu.length) {
		$menu.toggleClass('open');
	}
}

function showNav() {
	var _nav = this;
	var $nav = $("nav#main-nav");
	$nav.animate({
		top: 0
		}, 500, "easeOutExpo",
		function() {
			_nav.showHamburger();
		}
	);
}

function hideNav() {
	var _nav = this;
	var $nav = $("nav#main-nav");
	var $hamburger = $("div#hamburger");
	var $menu = $("div#menu");

	$nav.css({top: "-70px"});
	$hamburger.removeClass('open');
	$menu.removeClass('open');
	_nav.hideHamburger();
}

function showHamburger() {
	var $hamburgerWrap = $("div#hamburger-wrapper");
	var _nav = this;
	var $span1 = $("div#hamburger span:nth-child(1)");
	var $span4 = $("div#hamburger span:nth-child(4)");
	var $currentSection = $("span#current-section");
	$span1.animate({
		top: 0
		}, 500, "easeOutExpo", 
		function() {
			// animation complete
			$("body").css({overflow: "visible"});
            $("body").css({height: "auto"});
		}
	);
	$span4.animate({
		top: 23
		}, 500, "easeOutExpo", 
		function() {
			// animation complete
			_nav.Page.section.showAboutSection();
		}
	);
}

function hideHamburger() {
	var $hamburgerWrap = $("div#hamburger-wrapper");
	var $span1 = $("div#hamburger span:nth-child(1)");
	var $span4 = $("div#hamburger span:nth-child(4)");
	$span1.css({top: "12px"});
	$span4.css({top: "12px"});
}

function sectionListener() {
	$(window).on('scroll', function() {
	    var scrollTop = $(this).scrollTop();
	    var $closest = undefined;
	    var $currentSection = $("span#current-section");
	    var $menuLi = $("div#menu").find('li');

	    $('section').each(function() {
	    	var $this = $(this);
	        var topDistance = $this.offset().top;

	        if ( (topDistance - 5) <= scrollTop ) {
	        	$closest = $this;
	        }
	        
	    });

	    if($closest !== undefined) {
	    	var sectionName = $closest.data('section-name');
	    	$currentSection.text(sectionName);
	    	$menuLi.each(function() {
	    		var $this = $(this);
	    		var menuSection = $this.data('section-name');
	    		$this.removeClass('current-section');
	    		if(menuSection === sectionName) {
	    			$this.addClass('current-section');
	    		}
	    	});
	    }
	});
}








