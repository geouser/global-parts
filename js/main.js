// Global parameters
window.params = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};


/**
     *
     * Check if element exist on page
     *
     * @param el {string} jQuery object (#popup)
     *
     * @return {bool}
     *
*/
function exist(el){
    if ( $(el).length > 0 ) {
        return true;
    } else {
        return false;
    }
}


jQuery(document).ready(function($) {

    /*---------------------------
                                  FULLPAGE
    ---------------------------*/
    if ( exist('#fullpage') ) {
        $('#fullpage').fullpage({
            sectionSelector: '.fp-section',
            slideSelector: '.fp-slide',
            responsiveWidth: 1200,
            lockAnchors: true,
            anchors:['section-1', 'section-2', 'section-3', 'section-4', 'section-5', 'section-6'],
            navigation: true,
            navigationPosition: 'right',
        })

        $('.fp-scroll-down').on('click', function(event) {
            event.preventDefault();
            $.fn.fullpage.moveSectionDown();
        });
    }


    /*---------------------------
                              CONTACTS FORM
    ---------------------------*/
    $('input, textarea').on('focusin', function(event) {
        event.preventDefault();
        $(this).parent().addClass('focus');
    });
    $('input, textarea').on('focusout', function(event) {
        event.preventDefault();
        if ( !$(this).val() ) {
            $(this).parent().removeClass('focus');
        }
    });



    /*---------------------------
                                  Side menu
    ---------------------------*/
    $('.sidebar-menu-nav a').click(function(event){
        event.preventDefault();
        $(this).siblings('ul').slideToggle();
    });


    var top = 0;

    $('.sidebar-menu-nav').mCustomScrollbar({
        callbacks:{
            onScroll:function(){
              top = Math.abs(parseInt($('#mCSB_1_container').css('top')));
            }
        }
    });

    $('.down-menu').click(function(){
        $('.sidebar-menu-nav').mCustomScrollbar("scrollTo", top + 206);
    });


    /*---------------------------
                                  Background-slider
    ---------------------------*/
    $('.background-slider').slick({
        fade: true,
        dots: false,
        arrows: false,
        easing: 'ease-in-out',
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 2000,
        pauseOnHover: false
    })

    $('.photo-slider').slick({
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1
              }
            }
          ]
    });

    $('.photo-slider').each(function() { // the containers for all your galleries
        $(this).magnificPopup({
            delegate: 'a', // the selector for gallery item
            type: 'image',
            gallery: {
              enabled:true
            }
        });
    });




    /*---------------------------
                                  ACCORDION
    ---------------------------*/
    if ( exist('.accordion') ) {
        $( ".accordion" ).accordion({
            heightStyle: "content",
            collapsible: true,
        });
    }


    /*---------------------------
                                  Attach cv
    ---------------------------*/
    $('.js-send-cv').on('click', function(event) {
        event.preventDefault();
        var job = $(this).attr('data-title');
        $('#modal-popup-cv').find('input[name=job]').val(job);
        openPopup('#modal-popup-cv');
    });

    /*---------------------------
                                  Custom file button
    ---------------------------*/
    $('input[type=file]').each(function(index, el) {
        $(this).wrap('<div class="custom-file"></div>');
        var parent = $(this).parent();
        parent.append('<button class="button file-button" data-label="Attach a file">Attach a file</button>');

        $(this).on('change', function(event) {
            event.preventDefault();
            var filename = $(this).val().split('/').pop().split('\\').pop();
            $(this).siblings('.file-button').text(filename);
        });
    });


    /*---------------------------
                                  ADD CLASS ON SCROLL
    ---------------------------*/
    $(function() { 
        var $document = $(document),
            $element = $('.menu-button'),
            $element2 = $('header'),
            className = 'hasScrolled';

        $document.scroll(function() {
            $element.toggleClass(className, $document.scrollTop() >= 1);
            $element2.toggleClass(className, $document.scrollTop() >= 1);
        });
    });
    
    /*---------------------------
                                PAGE ANCHORS
    ---------------------------*/
    $('.anchor').click(function() {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 50
        }, 800);
        return false;
    });

    /*---------------------------
                                ACTIVATE MENU ITEM OVER CURRENT SECTION
    ---------------------------*/
    var $sections = $('section');
    $(window).scroll(function(){
        var currentScroll = $(this).scrollTop();
        var $currentSection;
        var windowHalf = $(window).height() / 2;
        
        $sections.each(function(){
          var divPosition = $(this).offset().top - windowHalf;
          
          if( divPosition - 1 < currentScroll ){
            $currentSection = $(this);
          }
        var id = $currentSection.attr('id');
          $('a').removeClass('active');
          $("[href=#"+id+"]").addClass('active');
        })
    });

    /*---------------------------
                                  MENU TOGGLE
    ---------------------------*/
    $('.menu-button').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $(this).siblings('header').toggleClass('active');
        $('.mobile-menu').toggleClass('active');
        if ($('header').hasClass('active')) {
                $('body').css('overflow', 'hidden');
            } else {
                $('body').css('overflow', 'visible');
            }
    });

    $('.side-menu-button').on('click', function(event) {
        event.preventDefault();
        $('body').addClass('overlay');
        $('.sidebar-menu').toggleClass('active');
    });
    $('.sidebar-menu .close').on('click', function(event) {
        event.preventDefault();
        $('body').removeClass('overlay');
        $('.sidebar-menu').removeClass('active');
    });



    /*---------------------------
                                  Magnific popup
    ---------------------------*/
    $('.magnific').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',
        modal: false,

        closeBtnInside: true,
        preloader: false,
        
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });



    /*----------------------------
                              SEND FORM
    -------------------------*/
    /**
     *
     * Open popup
     *
     * @param popup {String} jQuery object (#popup)
     *
     * @return n/a
     *
    */
    function openPopup(popup){
        $.magnificPopup.open({
            items: {
              src: popup
            },
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            modal: false,
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-slide-bottom'
        }, 0);
    }

    $('form').on('submit', function(event) {
        event.preventDefault();
        /* Act on the event */
        var data = $(this).serialize();
        $.ajax({
            url: theme.url + '/forms.php',
            type: 'POST',
            data: data,
            success: function(result){
                if (result.status == 'ok') {
                    openPopup('#modal-popup-ok')
                } else {
                    openPopup('#modal-popup-error')
                }
            },
            error: function(result) {
                openPopup('#modal-popup-error');
            }
        })
        .always(function() {
            $('form').each(function(index, el) {
                $(this)[0].reset();
            });
        });
        
    });



    /*Google map init*/
    var map;
    function googleMap_initialize() {
        var lat = $('#map_canvas').data('lat');
        var long = $('#map_canvas').data('lng');

        var mapCenterCoord = new google.maps.LatLng(lat, long);
        var mapMarkerCoord = new google.maps.LatLng(lat, long);

        var mapOptions = {
            center: mapCenterCoord,
            zoom: 17,
            //draggable: false,
            disableDefaultUI: true,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
        var markerImage = new google.maps.MarkerImage('images/location.svg');
        var marker = new google.maps.Marker({
            icon: markerImage,
            position: mapMarkerCoord, 
            map: map,
            title:"Чисто Строй"
        });
        
        $(window).resize(function (){
            map.setCenter(mapCenterCoord);
        });
    }

    if ( exist( '#map_canvas' ) ) {
        googleMap_initialize();
    }

}); // end file