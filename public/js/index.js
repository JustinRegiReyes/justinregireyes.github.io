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
        this.modalListeners = modalListeners;
        this.loadImage = loadImage;

        this.modalListeners();
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

    // modal functions
        function modalListeners() {
            var _page = this;
            $('div.modal').on('shown.bs.modal', function() {
                var $this = $(this);
                $("body").css({overflow: "hidden"});
                $("body").css({height: "100%"});
                var $loadingIcons = $this.find('i.fa-spin');
                if($loadingIcons.length) {
                    _page.loadImage($this);
                }
            });

            $('div.modal').on('hidden.bs.modal', function() {
                $("body").css({overflow: "visible"});
                $("body").css({height: "auto"});
            });
        }

        function loadImage($modal) {
            var $pictureContainers = $modal.find('div.picture-container');
            $pictureContainers.each(function() {
                var $container = $(this);
                var $loadingIcon = $container.find('i.fa-spin');
                var imgPath = $container.data('imgPath');
                $('<img src="'+ imgPath +'" class="img-responsive">').load(function() {
                    var $img = $(this);
                    $loadingIcon.fadeOut('fast', function() {
                        appendImg($container, $img);
                    });
                });
            });
            
            var $loadingIcons = $modal.find('i-fa-spin');
            $loadingIcons.remove();

            function appendImg($container, $img) {
                $container.empty();
                $img.appendTo($container);
                setTimeout(function() {
                  $img.fadeIn();
                }, 500);
            }
        }
    // modal functions END

});