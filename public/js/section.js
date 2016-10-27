var Section = function(Page) {
	this.Page = Page;
	this.showAboutSection = showAboutSection;
	this.hideAboutSection = hideAboutSection;
	this.animSection = animSection;
	this.hideSection = hideSection;
	this.inViewListener = inViewListener;
	this.animateAbout = false;

	this.inViewListener();
}

function inViewListener() {
	var $section = $("section");
	var _section = this;
	$section.on('inview', function(event, isVisible) {
		var $this = $(this);
		var sectionId = $this.attr('id');
		if(isVisible) {
			if(sectionId !== "about" || _section.animateAbout ) {
				animSection();
			}
		}
	});
}

function animSection($section) {
	var _section = this;
	var $titleWrapper = $section.find('div.title-wrapper');
	var $hr = $titleWrapper.children('hr');
	$titleWrapper.animate({
		opacity: 1,
		bottom: 0
		}, 500, "easeOutCubic", function() {
			animateHr();
		});


	function animateHr() {
		$hr.animate({
			width: "70"
			}, 750, "easeOutCirc", function() {
				// animation complete
			}
		);
	}
}

function hideSection($section) {
	var _section = this;
	var $titleWrapper = $section.find('div.title-wrapper');
	var $hr = $titleWrapper.children('hr');
	$titleWrapper.animate({
		opacity: 0,
		bottom: 70
		}, 500, "easeInCubic", function() {
			$hr.css({width: 0});
		}
	);
}

function showAboutSection() {
	var $section = $("section#about");
	var _section = this;
	_section.animSection($section);
}

function hideAboutSection() {
	var $section = $("section#about");
	var _section = this;
	
	hideSection($section);
}