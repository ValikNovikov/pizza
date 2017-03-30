$(function () {
    'use strict';

    var $mobileDropDown = $('.mobile-dropdown'),
        $ul = $('.slider ul'),
        $dots = $('#dots'),
        $sideNav = $('#sidenav'),
        $currentDots,
        slideCount = $ul.children().length,
        slideWidth = 100, // eslint-disable-line
        slideIndex = 0, // eslint-disable-line
        firstSlide = $ul.find('li:first-child'),
        lastSlide = $ul.find('li:last-child'),
        i;

    /* Set the width of the side navigation to 250px */
    $('.open-mobile-menu').click(function () {
        $sideNav.addClass('show-sidenav');
    });

    /* Set the width of the side navigation to 0 */
    $('.menu-btn').click(function () {
        $sideNav.removeClass('show-sidenav');
    });

    $('#home-btn').click(function () {
        if ($mobileDropDown.hasClass('show-dropdown')) {
            $mobileDropDown.toggleClass('show-dropdown').slideUp();
        } else {
            $mobileDropDown.slideDown().toggleClass('show-dropdown');
        }
    });


// -----carousel------//

    lastSlide.clone().prependTo($ul);
    firstSlide.clone().appendTo($ul);

    $ul.find('li').each(function (indx) {
        var leftPercentage = (slideWidth * indx) + '%';

        $(this).css({'left': leftPercentage}).css({width: (slideWidth) + '%'});
    });

    for (i = 0; i < slideCount; i += 1) { // eslint-disable-line
        $dots.append('<li><a data-id=' + i + ' class="dot">Dots</a></li>');
    }

    $currentDots = $('.dot');

    $currentDots.eq(0).addClass('active'); // eslint-disable-line


    $('.prev').on('click', function () {
        slide(slideIndex - 1); // eslint-disable-line
        dotMarker(-1); // eslint-disable-line
    });

    $('.next').click(function () {
        if (slideIndex + 1 === slideCount) { // eslint-disable-line
            $currentDots.eq(0).addClass('active'); // eslint-disable-line
        }

        dotMarker(+1); // eslint-disable-line
        slide(slideIndex + 1); // eslint-disable-line
    });

    function dotMarker (val) {
        var $currentDot = $('.dot');

        $currentDot.eq(slideIndex).removeClass('active');
        $currentDot.eq(slideIndex + Number(val)).addClass('active');
    }


    $currentDots.click(function () {
        var index = $(this).data('id');

        $currentDots.removeClass('active');
        $(this).addClass('active');

        slide(index);
    });


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

    setInterval(function () {
        if (slideIndex + 1 === slideCount) { // eslint-disable-line
            $currentDots.eq(0).addClass('active'); // eslint-disable-line
        }
        dotMarker(+1); // eslint-disable-line
        slide(slideIndex + 1); // eslint-disable-line
    }, 4000); // eslint-disable-line

// -----/carousel------//
});

