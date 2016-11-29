var Header = function(Page) {
	this.Page = Page;
	this.listener = listener;
	this.showHeader = false;
	this.timeout = true;
	this.hideHeader = true;
	this.animHideHeader = animHideHeader;
	this.animShowHeader = animShowHeader;
    this.lastY = undefined;
    this.touchMoveUp = undefined;

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
        var _header = this;
        var $showHeader = $("div#show-header");
        $enterWebsite.on("click", function() {
            _header.animHideHeader($header);
        });

        $showHeader.on('click', function() {
             _header.timeout = false;
             _header.animShowHeader($header);
        });

        // ************ Attempt at listening for touch move to bring header down ************
        // $(document).on('touchmove', function(e) {
        //     currentScroll = $(this).scrollTop();
        //     var currentY = e.originalEvent.touches[0].clientY;
        //      if(currentY > _header.lastY){
        //          // moved down
        //          _header.touchMoveUp = true;
        //          console.log("move up");
        //      }else if(currentY < _header.lastY){
        //          // moved up
        //          _header.touchMoveUp = false;
        //          console.log("move down");
        //      }
        //      _header.lastY = currentY;
        //     if((currentScroll == top) && (_header.showHeader) && _header.touchMoveUp) {
        //         if(_header.timeout === true) {
        //             _header.timeout = false;
        //             _header.animShowHeader($header);
        //         }
        //     }
        // });
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
                _header.Page.section.hideHeaderButton();
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
            _header.Page.nav.showNav();
        }
    );
}