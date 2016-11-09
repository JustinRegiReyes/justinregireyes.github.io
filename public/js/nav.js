var Nav = function(Page) {
	this.Page = Page;
	this.toggleHamburger = toggleHamburger;
	this.toggleMenu = toggleMenu;
	this.showHamburger = showHamburger;
	this.hideHamburger = hideHamburger;
	this.showNav = showNav;
	this.hideNav = hideNav;

	this.toggleHamburger();
}

function toggleHamburger() {
	var _nav = this;
	var $hamburger = $("div#hamburger");
	if($hamburger.length) {
		$hamburger.click(function() {
			$(this).toggleClass('open');
			_nav.toggleMenu();
		})
	}
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
	var $nav = $("nav#main-nav");
	var _nav = this;
	$nav.css({top: "-70px"});
	_nav.hideHamburger();
}

function showHamburger() {
	var $hamburgerWrap = $("div#hamburger-wrapper");
	var _nav = this;
	var $span1 = $("div#hamburger span:nth-child(1)");
	var $span4 = $("div#hamburger span:nth-child(4)");
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








