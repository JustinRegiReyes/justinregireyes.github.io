
$(function() {
    "use strict"; // Start of use strict
    console.log('reload');

    // nav.js
    var nav = new Nav();

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    });

    // Scroll listener
    headerListener();


});

function headerListener() {
    var $header = $('header');
    var top = 0;
    var currentScroll = 0;
    var showHeader = false;
    var timeout = true;
    var hideHeader = true;
    // var startchange = $('#startchange');
    // var offset = startchange.offset();
    $(document).bind('DOMMouseScroll mousewheel', function(e) {
        currentScroll = $(this).scrollTop();
        var delta = (e.originalEvent.wheelDelta || -e.originalEvent.detail);
        if((currentScroll == top) && showHeader ) {
            if(timeout === true) {
                timeout = false;
                $("html, body").css({overflow: "hidden"});
                setTimeout(function() {
                    $header.animate({
                        top: 0
                        }, 1000, "easeOutExpo", 
                        function() {
                            showHeader = false;
                            hideHeader = true;
                        }
                    );
                }, 500);
            }
        } else if((delta < -1) && (showHeader === false) && hideHeader) {
            var height = $header.height();
            height = (height + 10) * -1;
            hideHeader = false;
            $header.animate({
                top: height
                }, 1000, "easeInExpo", 
                function() {
                    $("html, body").css({overflow: "visible"});
                    $(document).scrollTop(1);
                    showHeader = true;
                    timeout = true;
                }
            );
        }
    });
}
