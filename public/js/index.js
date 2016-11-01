$(window).on('beforeunload', function(){
  var $header = $('header');
  $header.css({top: 0});
  $(window).scrollTop(0);
});

$(function() {
    "use strict"; // Start of use strict
    console.log('reload');

    var Page = function() {
        // nav.js
        this.nav = new Nav(this);
        // header.js
        this.header = new Header(this);
        // section.js
        this.section = new Section(this);
    }

    var page = new Page();

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

});