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
	this.portfolioContentListener = portfolioContentListener;
	this.portfolioIsotope = portfolioIsotope;
	this.sendEmailForm = sendEmailForm;
	this.emailInputListener = emailInputListener;
	this.gridFilterListener = gridFilterListener;
	this.filterIsotope = filterIsotope;

	this.inViewListener();
	this.portfolioContentListener();
	this.portfolioIsotope();
	this.sendEmailForm();
	this.emailInputListener();
	this.gridFilterListener();
};

function inViewListener() {
	var $section = $("section");
	var _section = this;
	$section.on('inview', function(event, isVisible) {
		var $this = $(this);
		var sectionId = $this.attr('id');
		var $titleWrapper = $this.find('div.title-wrapper');
		if(isVisible) {
			if(sectionId !== "about" || _section.animateAbout ) {
				animSection($this);
			}
		}
	});
};

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
};

function hideSection($section) {
	var _section = this;
	var sectionId = $section.attr('id');
	var $titleWrapper = $section.find('div.title-wrapper');
	var $hr = $titleWrapper.find('hr');
	var $about = $section.find('div.content');

	$titleWrapper.animate({
		opacity: 0,
		bottom: 50
		}, 500, "easeInCubic", function() {
			$hr.css({width: "0%"});
			if(sectionId === "about") {
				$about.css({
					opacity: 0,
					top: "100px"
				});
				_section.resetIAmA();
			}
		}
	);
};

function showAboutSection() {
	var $section = $("section#about");
	var _section = this;
	var $currentSection = $("span#current-section");
	var $hamburgerBackground = $("div#hamburger-background");

	_section.animSection($section);
	$currentSection.animate({
		opacity: 1
	}, 500, "swing", function() {
		// animation complete
		$hamburgerBackground.animate({
			opacity: 1
		}, 500, "swing", function() {
			// animation complete
		})
	})
};

function hideAboutSection() {
	var $section = $("section#about");
	var _section = this;
	
	_section.hideSection($section);
};

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
};

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
	};
};

function portfolioContentListener() {
	var _section = this;
	var $portfolioBox = $("div.portfolio-box-content-wrapper");
	var smallViewport = 767;
	if($portfolioBox.length) {
		$portfolioBox.on('mouseenter', function() {
			if($(window).width() >= smallViewport) {
				$this = $(this);
				$this.toggleClass('shadowed');
				var $readMore = $this.find('a.read-more');
				$readMore.animate({
					right: 5,
					opacity: 1
				});
				$this.animate({
					bottom: 20
				}, 500, "easeOutExpo", function() {

				});
			}
		});
		$portfolioBox.on('mouseleave', function() {
			if($(window).width() >= smallViewport) {
				$this = $(this);
				$this.toggleClass('shadowed');
				var $readMore = $this.find('a.read-more');
				$readMore.animate({
					right: 30,
					opacity: 0
				}, 250, "easeOutExpo", function() {
				});
				$this.animate({
					bottom: 0
				}, 500, "easeOutBounce", function() {

				});
			}
		});
	};
};

function portfolioIsotope() {
	var $grid = $("div#portfolio-grid");
	$grid.isotope({
		itemSelector: '.portfolio-box',
		layoutMode: 'fitRows'
	});
};

function sendEmailForm() {
	var $emailForm = $("form#email-form");
	if($emailForm.length) {
		$emailForm.on("submit", function(e) {
			e.preventDefault();
			var $this = $(this);
			var emailer = {
				name: $("#emailer-name").val(),
				"_replyto": $("#emailer-email").val(),
				message: $("#emailer-message").val()
			}
			$.ajax({ 
				url: "//formspree.io/justin.regi.reyes@gmail.com", 
				method: "POST", 
				data: {
					name: emailer.name,
					"_replyto": emailer._replyto
				}, 
				dataType: "json" 
			});
		});
	};
};

function emailInputListener() {
	var $emailForm = $("form#email-form");
	if($emailForm.length) {
		var $input = $emailForm.find('input');
		var $textarea = $emailForm.find('textarea');

		$input.on('focus', function() {
			var $this = $(this);
			$this.toggleClass('focused');
		});

		$textarea.on('focus', function() {
			var $this = $(this);
			$this.toggleClass('focused');
		});

		$input.on('focusout', function() {
			var $this = $(this);
			$this.toggleClass('focused');
		});

		$textarea.on('focusout', function() {
			var $this = $(this);
			$this.toggleClass('focused');
		});
	}
}

function gridFilterListener() {
	var $gridFilter = $('div.grid-filter');
	var _section = this;
	if($gridFilter.length) {
		$gridFilter.on('click', function() {
			var $this = $(this);
			var $allFilter = $('div[data-filter=' + "all" + ']');
			var filter = $this.data('filter');
			if(filter !== "all") {
				if($allFilter.hasClass('chosen') === true) {
					$allFilter.removeClass('chosen')	
				};
			}
			$this.toggleClass('chosen');
			_section.filterIsotope($this);
		});
	}
}

function filterIsotope($thisElement) {
	var $grid = $('div#portfolio-grid');
	var $gridFilter = $('div.grid-filter.chosen');
	var filterString = "";
	var filter = $thisElement.data('filter');
	if(filter === "all") {
		$gridFilter.each(function() {
			var $this = $(this);
			var filter = $this.data('filter');
			if(filter !== "all") {
				$this.removeClass('chosen');
			}
		});
	} else {
		if($gridFilter.length) {
			$gridFilter.each(function() {
				var $this = $(this);
				var filter = $this.data('filter');
				if(filter !== 'all') {
					filterString += '.' + filter;
				}
			});
		} else {
			filterString = "";
			var $allFilter = $('div[data-filter=' + "all" + ']');
			if($allFilter.hasClass('chosen') === false) {
				$allFilter.toggleClass('chosen');
			}
		}
	}
	
	$grid.isotope({ filter: filterString });
}
