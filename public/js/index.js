// $(window).on('beforeunload', function(){
//   var $header = $('header');
//   $header.css({top: 0});
//   $(window).scrollTop(0);
// });

$(function() {
    "use strict"; // Start of use strict

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
            scrollTop: ($($anchor.attr('href')).offset().top + 10)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // date functions
    Date.prototype.today = function () { 
        return (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) + "/" + ((this.getDate() < 10)?"0":"") + this.getDate() + "/"+ this.getFullYear();
    }

    // For the time now
    Date.prototype.timeNow = function () {
         return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
    }

    // modal functions
        function modalListeners() {
            var _page = this;
            $('div.modal').on('shown.bs.modal', function() {
                var $this = $(this);
                $("html, body").css({overflow: "hidden"});
                console.log($('html').css('height'));
                var $loadingIcons = $this.find('i.fa-spin');
                if($loadingIcons.length) {
                    _page.loadImage($this);
                }
            });

            $('div.modal').on('hidden.bs.modal', function() {
                $("html, body").css({overflow: "visible"});
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