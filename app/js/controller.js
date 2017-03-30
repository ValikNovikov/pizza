$(function () {


var $mobileDropDown = $('.mobile-dropdown');

	/* Set the width of the side navigation to 250px */
	$('.open-mobile-menu').click(function () {
		$("#sidenav").css({'transform': 'translateX(0)'});
	});

	/* Set the width of the side navigation to 0 */
	$('.menu-btn').click(function () {
		$("#sidenav").css({'transform': 'translateX(-260px)'});

	});

	$('#home-btn').click(function () {
		if ($mobileDropDown.hasClass('show-dropdown')) {
			$mobileDropDown.removeClass('show-dropdown');
			$mobileDropDown.slideUp();
		} else {
			$mobileDropDown.slideDown();
			$mobileDropDown.addClass('show-dropdown');
		}

	});



//-----carousel------//
	var $ul = $(".slider ul"),
	slideCount = $ul.children().length,
	slideWidth = 100.0 / slideCount,
	slideIndex = 0,
	firstSlide = $ul.find("li:first-child"),
	lastSlide = $ul.find("li:last-child");

	lastSlide.clone().prependTo($ul);
	firstSlide.clone().appendTo($ul);

	$ul.find("li").each(function(indx) {
		var leftPercentage = (slideWidth * indx) + "%";
		$(this).css({"left":leftPercentage});
		$(this).css({width:(100 / slideCount) + "%"});
	});

	$(".prev").on('click', function() {
		slide(slideIndex - 1);
	});

	$(".next").click(function() {
		slide(slideIndex + 1);
	});


	function slide(newSlideIndex) {

		var marginLeft = (newSlideIndex * (-100) - 100) + "%";

		$ul.animate({"margin-left": marginLeft}, 400, function() {
			if(newSlideIndex < 0) {
				$ul.css("margin-left", ((slideCount) * (-100)) + "%");

				newSlideIndex = slideCount - 1;
			} else if(newSlideIndex >= slideCount) {
				$ul.css("margin-left", "-100%");

				newSlideIndex = 0;
			}

			slideIndex = newSlideIndex

		});

	}
//-----/carousel------//



});

