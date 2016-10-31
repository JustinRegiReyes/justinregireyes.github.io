var Section = function(Page) {
	this.Page = Page;
	this.showAboutSection = showAboutSection;
	this.hideAboutSection = hideAboutSection;
	this.animSection = animSection;
	this.hideSection = hideSection;
	this.inViewListener = inViewListener;
	this.animateAbout = false;
	this.animIAmA = animIAmA;
	this.IAmATracker = undefined;
	this.resetIAmA = resetIAmA;

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
	var $content = $section.find('div.content');
	var $hr = $titleWrapper.find('hr');
	$titleWrapper.animate({
		opacity: 1,
		bottom: 0
		}, 500, "easeOutCubic", function() {
			animateHr();
		}
	);

	function animateHr() {
		$hr.animate({
			width: "100%"
			}, 500, "easeOutCirc", function() {
				animateContent();
			}
		);
	};

	function animateContent() {
		$content.animate({
				opacity: 1,
				top: 0
			}, 500, "easeOutCubic", function() {
				var sectionId = $section.attr('id');
				if(sectionId === "about") {
					_section.animIAmA();
				}
			}
		);	
	};
}

function hideSection($section) {
	var _section = this;
	var sectionId = $section.attr('id');
	var $titleWrapper = $section.find('div.title-wrapper');
	var $hr = $titleWrapper.find('hr');
	var $about = $section.find('div.content');

	$titleWrapper.animate({
		opacity: 0,
		bottom: 70
		}, 500, "easeInCubic", function() {
			$hr.css({width: "0%"});
			if(sectionId === "about") {
				$about.css({
					opacity: 0,
					top: "100px"
				});
				_section.resetIAmA();
			};
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
	
	_section.hideSection($section);
}

function animIAmA() {
	var _section = this;
	var $i_am_a = $("h1.i-am-a");
	var $headerPrimary = $("h1.i-am-a.primary");
	var $headerSecondary = $("h1.i-am-a.secondary");
	var iAmWords = ["Code Tinkerer", "Sandwich Connoisseur", "Gamer", "Foodie", "Full Stack Web Developer", "Teachable"];
	if($i_am_a.length) {
		var switchCounter = 0;
		var wordTracker = 0;
		_section.IAmATracker = window.setInterval(function() {
			wordTracker = switchWords(wordTracker, switchCounter, iAmWords, $headerPrimary, $headerSecondary);
			switchCounter++;
		}, 4000);
	}
};

function resetIAmA() {
	var _section = this;
	var $i_am_a = $("h1.i-am-a");
	var $headerPrimary = $("h1.i-am-a.primary");
	var $headerSecondary = $("h1.i-am-a.secondary");
	if($i_am_a.length) {
		window.clearInterval(_section.IAmATracker);
		$headerPrimary.text("Full Stack Web Developer");
		$headerSecondary.text("Teachable");
	}
}

function switchWords(wordTracker, switchCounter, iAmWords, $headerPrimary, $headerSecondary) {


	if(wordTracker < iAmWords.length) {
		var word = iAmWords[wordTracker];
	} else {
		wordTracker = 0;
		var word = iAmWords[wordTracker];
	}
	wordTracker++;

	animWords(switchCounter, $headerPrimary, $headerSecondary, word);

	return wordTracker;
};

function animWords(switchCounter, $headerPrimary, $headerSecondary, word) {
	if(switchCounter % 2 == 0) {
		$headerPrimary.animate({
				top: 10,
				opacity: 0
			}, 500, "swing", 
			function() {
				// animation complete
				$headerPrimary.css({top: "-30px"});
				$headerPrimary.text(word)
			}
		);
		$headerSecondary.animate({
				top: 0,
				opacity: 1
			}, 500, "swing", 
			function() {
				// animation complete
			}
		);
	} else {
		$headerSecondary.animate({
				top: 10,
				opacity: 0
			}, 500, "swing", 
			function() {
				// animation complete
				$headerSecondary.css({top: "-30px"});
				$headerSecondary.text(word)
			}
		);
		$headerPrimary.animate({
				top: 0,
				opacity: 1
			}, 500, "swing", 
			function() {
				// animation complete
			}
		);
	}
}
