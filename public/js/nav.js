var Nav = function() {
	this.toggleHamburger = nav.toggleHamburger();
	this.showNav = nav.showNav();
}

var nav = {
	toggleHamburger: toggleHamburger,
	toggleMenu: toggleMenu,
	showNav: showNav
}

function toggleHamburger() {
	var thisNav = this;
	var $hamburger = $("div#hamburger");
	if($hamburger.length) {
		$hamburger.click(function() {
			$(this).toggleClass('open');
			thisNav.toggleMenu();
		})
	}
}

function toggleMenu() {
	var thisNav = this;
	var $menu = $("div#menu");
	if($menu.length) {
		$menu.toggleClass('open');
	}
}

function showNav() {
	
}








