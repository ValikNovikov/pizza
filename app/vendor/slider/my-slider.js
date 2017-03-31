(function ($) {
    'use strict';
    var sliderLogic,
        $ul = $('.slider ul'),
        $dots = $('#dots'),
        $currentDots,
        slideCount = $ul.children().length,
        slideWidth = 100, // eslint-disable-line
        slideIndex = 0, // eslint-disable-line
        firstSlide = $ul.find('li:first-child'),
        lastSlide = $ul.find('li:last-child'),
        i,
        buttons = '<button class="prev">&#x2190;</button>';
    buttons += '<button class="next">&#x2192;</button>';

    jQuery.fn.slider = function (options) {
        options = $.extend({
            buttons: true,
            autoSlide: false,
            delay: 4000, // eslint-disable-line
            dots: false
        }, options);


        sliderLogic = function () {
            lastSlide.clone().prependTo($ul);
            firstSlide.clone().appendTo($ul);

            $ul.find('li').each(function (indx) {
                var leftPercentage = (slideWidth * indx) + '%';

                $(this).css({'left': leftPercentage}).css({width: (slideWidth) + '%'});
            });

            if (options.buttons) {
                $('#my-slider').append(buttons);
            }

            if (options.dots) {
                for (i = 0; i < slideCount; i += 1) { // eslint-disable-line
                    $dots.append('<li><a data-id=' + i + ' class="dot">Dots</a></li>');
                }

                $currentDots = $('.dot');

                $currentDots.eq(0).addClass('active'); // eslint-disable-line

                $currentDots.click(function () {
                    var index = $(this).data('id');

                    $currentDots.removeClass('active');
                    $(this).addClass('active');

                    slide(index);
                });
            }


            $('.prev').on('click', function () {
                slide(slideIndex - 1); // eslint-disable-line
                if (options.dots)  dotMarker(-1); // eslint-disable-line
            });

            $('.next').click(function () {
                if (slideIndex + 1 === slideCount) { // eslint-disable-line
                    $currentDots.eq(0).addClass('active'); // eslint-disable-line
                }

               if (options.dots) dotMarker(1); // eslint-disable-line
                slide(slideIndex + 1); // eslint-disable-line
            });

            function dotMarker (val) {
                var $currentDot = $('.dot');

                $currentDot.eq(slideIndex).removeClass('active');
                $currentDot.eq(slideIndex + Number(val)).addClass('active');
            }


            function slide (newSlideIndex) {
                var marginLeft = (newSlideIndex * ('-100') - '100') + '%';

                $ul.animate({'margin-left': marginLeft}, '400', function () {
                    if (newSlideIndex < 0) { // eslint-disable-line
                        $ul.css('margin-left', ((slideCount) * ('-100')) + '%');

                        newSlideIndex = slideCount - '1';
                    } else if (newSlideIndex >= slideCount) {
                        $ul.css('margin-left', '-100%');

                        newSlideIndex = 0; // eslint-disable-line
                    }

                    slideIndex = newSlideIndex;
                });
            }

            if (options.autoSlide) {
                setInterval(function () {
                    if (slideIndex + 1 === slideCount) { // eslint-disable-line
                        $currentDots.eq(0).addClass('active'); // eslint-disable-line
                    }
                    dotMarker(+1); // eslint-disable-line
                    slide(slideIndex + 1); // eslint-disable-line
                }, options.delay); // eslint-disable-line
            }
        };


        return this.each(sliderLogic);
    };
})(jQuery);
