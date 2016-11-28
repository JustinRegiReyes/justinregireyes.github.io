var Header = function(Page) {
	this.Page = Page;
	this.listener = listener;
	this.showHeader = false;
	this.timeout = true;
	this.hideHeader = true;
	this.animHideHeader = animHideHeader;
	this.animShowHeader = animShowHeader;

	this.listener();
}


function listener() {
	var _header = this;
    var $header = $('header');
    var top = 0;
    var currentScroll = 0;
    var windowWidth = $(window).width();

    if(windowWidth > 416) {
        $(document).on('DOMMouseScroll mousewheel touchmove', function(e) {
            currentScroll = $(this).scrollTop();
            var delta = (e.originalEvent.wheelDelta || -e.originalEvent.detail);
            if((currentScroll == top) && _header.showHeader && (delta > 0)) {
                if(_header.timeout === true) {
                    _header.timeout = false;
                    _header.animShowHeader($header);
                }
            } else if((delta < -1) && (_header.showHeader === false) && _header.hideHeader) {
            	_header.animHideHeader($header);
            }
        });
    } else {
        var $enterWebsite = $("div#enter-website");
        $enterWebsite.on("click", function() {
            _header.animHideHeader($header);
        });

        $(document).on('DOMMouseScroll mousewheel', function(e) {
            currentScroll = $(this).scrollTop();
            var delta = (e.originalEvent.wheelDelta || -e.originalEvent.detail);
            if((currentScroll == top) && _header.showHeader && (delta > 0)) {
                if(_header.timeout === true) {
                    _header.timeout = false;
                    _header.animShowHeader($header);
                }
            }
        });

        $(document).on('touchmove', function(e) {
            currentScroll = $(this).scrollTop();
            var delta = (e.originalEvent.wheelDelta || -e.originalEvent.detail);
            if((currentScroll == top) && _header.showHeader && (delta > 0)) {
                if(_header.timeout === true) {
                    _header.timeout = false;
                    _header.animShowHeader($header);
                }
                $("span#current-section").prepend(currentScroll);
            }
        });
    }
}

function animShowHeader($header) {
	var _header = this;
	$("body").css({overflow: "hidden"});
    $("html").css({overflow: "hidden"});
    $header.css({opacity: 1});
    setTimeout(function() {
        $header.animate({
            top: 0
            }, 1000, "easeOutExpo", 
            function() {
                _header.showHeader = false;
                _header.hideHeader = true;
                _header.Page.nav.hideNav();
                _header.Page.section.hideAboutSection();
            }
        );
    }, 500);
}

function animHideHeader($header) {
	var _header = this;
	var height = $header.height();
    height = (height + 10) * -1;
    _header.hideHeader = false;
    $header.animate({
        top: height
        }, 1000, "easeInExpo", 
        function() {
            $header.css({opacity: 0});
            $(document).scrollTop(1);
            _header.Page.nav.showNav();
        }
    );
}