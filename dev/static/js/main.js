$(document).ready(function () {

    svg4everybody({});

    var BODY = $('body');
    var WINDOW = $(window);
    var mainWrapper = $('.main-wrapper');
    var sTop;
    var mainHeader = $('.main-header');

    // Header fixed
    WINDOW.scroll(function () {
        if (!$('.main-wrapper').hasClass('photo-session')) {
            if (WINDOW.scrollTop() > 0) {
                mainWrapper.addClass('_scroll');
                mainHeader.addClass('_fixed');
            } else {
                mainHeader.removeClass('_fixed');
            }

            if (WINDOW.scrollTop() < sTop) {
                mainWrapper.removeClass('_scroll');
            }

            sTop = $(this).scrollTop();
        }
    });

    if (!$('.main-wrapper').hasClass('photo-session')) {
        if (WINDOW.scrollTop() > 0) {
            mainWrapper.addClass('_scroll');
            mainHeader.addClass('_fixed');
        }
    }

    $('.navbar__nav__item').hover(
        function () {
            var dropdownMenu = $('.navbar__nav__dropdown[data-dropdown="' + $(this).attr('data-dropmenu') + '"]');

            $('.navbar__nav__dropdown').removeClass('_show');
            $('.navbar__nav__item').removeClass('_open-dropdown');

            if (dropdownMenu.length) {
                $(this).addClass('_open-dropdown');
                dropdownMenu.addClass('_show');
            }
        }, function () {
            $('.navbar__nav__dropdown').removeClass('_show');
            $('.navbar__nav__item').removeClass('_open-dropdown');
        }
    )

    $('.navbar__nav__dropdown').hover(
        function () {
            $('.navbar__nav__item[data-dropmenu="' + $(this).attr('data-dropdown') + '"]').addClass('_open-dropdown');
            $(this).addClass('_show');
        }, 
        function () {
            $('.navbar__nav__item').removeClass('_open-dropdown');
            $('.navbar__nav__dropdown').removeClass('_show');
        }
    );

    if ($('.mix-container').length) {
        var mixer = mixitup('.mix-container');
    }

    $('.category-filter__selected').click(function () {
        $(this).parent('.category-filter').addClass('_active');
    });

    $('.category-filter__item').click(function () {
        var t = $(this).text();

        $(this).parents('.category-filter').removeClass('_active').find('.category-filter__selected span').text(t);
    })

    // Footer map
    ymaps.ready(init);
    var myMap,
        myPlacemark,
        contactsMapOne,
        contactsMapTwo;

    function init(){
        myMap = new ymaps.Map("footerMap", {
            center: [55.76222657, 37.55330700],
            zoom: 16,
            controls: []
        });

        myPlacemark = new ymaps.Placemark([55.76222657, 37.55330700], {
            hintContent: 'Москва!',
            balloonContent: 'Столица России'
        });

        myMap.geoObjects.add(myPlacemark);

        if ($('.map').length) {
            contactsMapOne = new ymaps.Map("mapOne", {
                center: [55.76222657, 37.55330700],
                zoom: 16,
                controls: []
            });

            contactsMapOne.geoObjects.add(myPlacemark);

            contactsMapTwo = new ymaps.Map("mapTwo", {
                center: [55.76222657, 37.55330700],
                zoom: 16,
                controls: []
            });
        }
    }

    $('.blog__more__link').hover(
        function () {
            $(this).parents('.blog__item').addClass('_hover');
        }, function () {
            $(this).parents('.blog__item').removeClass('_hover');
        }
    );

    $(".youtube").each(function() {
        // Зная идентификатор видео на YouTube, легко можно найти его миниатюру
        $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

        // Добавляем иконку Play поверх миниатюры, чтобы было похоже на видеоплеер
        $(this).append($('<div/>', {'class': 'play'}));

        $(document).delegate('#'+this.id, 'click', function() {
            // создаем iframe со включенной опцией autoplay
            var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
            if ($(this).data('params')) iframe_url+='&'+$(this).data('params');

            // Высота и ширина iframe должны быть такими же, как и у родительского блока
            var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height() })

            // Заменяем миниатюру HTML5 плеером с YouTube
            $(this).replaceWith(iframe);
        });
    });

    $('.example-works__slider').slick({
        centerMode: true,
        slidesToShow: 1,
        infinite: true,
        variableWidth: true,
        prevArrow: '<button class="slick-prev">Влево <div class="arrow"><i class="fa fa-chevron-left" aria-hidden="true"></i></div></button>',
        nextArrow: '<button class="slick-next"><div class="arrow"><i class="fa fa-chevron-right" aria-hidden="true"></i></div> Вправо</button>',
    });

    $('.example-works__item').each(function () {
        var mi = $(this).find('.magnific-image .slick-track');

        mi.magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            }
        });
    });

    $('.photo-session__tabs__item').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
        }
    });

    $('.photo-session__calc__slide-js').slider({
        range: "max",
        min: 1,
        max: 10,
        value: 2,
        slide: function( event, ui ) {
            $('#amount').val( ui.value );
        }
    });

    var direc = 0;

    $('.photo-session__calc__slide').each(function () {
        var th = $(this);
        var inp = th.find('.photo-session__calc__slide-input');
        var sl = th.find('.photo-session__calc__slide-js');

        sl.slider({
            range: "max",
            min: 1,
            max: 5,
            value: 1,
            slide: function( event, ui ) {
                inp.val( ui.value );
                th.find('.photo-session__calc__slide-numbers span').removeClass('_active');
                th.find('.photo-session__calc__slide-numbers span:nth-child(' + ui.value + ')').addClass('_active');

                var summ = Number($('.photo-session__calc__summ-input span').text());

                if (ui.value > direc) {
                    summ += 2000;
                } else {
                    if (summ - 2000 < 0) {
                        summ = 0
                    } else {
                        summ -= 2000;
                    }
                }

                $('.photo-session__calc__summ-input span').text(summ);

                direc = ui.value;
            }
        });
    });

    $('.photo-session__calc__slide-help .fa').hover(
        function () {
            $(this).parents('.photo-session__calc__slide-help').addClass('_show');
        }, function () {
            $(this).parents('.photo-session__calc__slide-help').removeClass('_show');
        }
    );

    $('.popup-with-form').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#name',

        // When elemened is focused, some mobile browsers in some cases zoom in
        // It looks not nice, so we disable it:
        callbacks: {
            beforeOpen: function() {
                if($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#name';
                }
            }
        }
    });

    $('.popup__close').on( "click", function() {
        $.magnificPopup.close();
    });

    $('body').addClass('_ready');

});
