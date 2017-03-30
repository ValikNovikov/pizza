$(function () {


var $mobileDropDown = $('.mobile-dropdown');

	/* Set the width of the side navigation to 250px */
	$('.open-mobile-menu').click(function () {
		$("#sidenav").addClass('show-sidenav');
	});

	/* Set the width of the side navigation to 0 */
	$('.menu-btn').click(function () {
		$("#sidenav").removeClass('show-sidenav');

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
	$dots=$("#dots"),
	slideCount = $ul.children().length,
	slideWidth = '100',
	slideIndex = 0,
	firstSlide = $ul.find("li:first-child"),
	lastSlide = $ul.find("li:last-child");

	lastSlide.clone().prependTo($ul);
	firstSlide.clone().appendTo($ul);

	$ul.find("li").each(function(indx) {
		var leftPercentage = (slideWidth * indx) + "%";
		$(this).css({"left":leftPercentage});
		$(this).css({width:(slideWidth) + "%"});
	});

	for(var i=0; i < slideCount; i++){
		$dots.prepend('<li><a class="current-dot">Home</a></li>');
	}
	$dots.find('li:first-child a').addClass("active-dot");



	$(".prev").on('click', function() {
		var $currentDot = $(".current-dot");

		slide(slideIndex - 1);
		$currentDot.eq(slideIndex).removeClass("active-dot");
		$currentDot.eq(slideIndex - 1).addClass("active-dot");
	});



	$(".next").click(function() {
		var $currentDot = $(".current-dot");

		slide(slideIndex + 1);

		$currentDot.eq(slideIndex).removeClass("active-dot");

		if(slideIndex +1 == slideCount){
			$currentDot.eq(0).addClass("active-dot");
		}

		$currentDot.eq(slideIndex + 1).addClass("active-dot");
	});



$('.current-dot').click(function  () {
	var index = $( ".current-dot" ).index(this);

	$(".current-dot").removeClass("active-dot");
	$(this).addClass("active-dot");

	slide(index);
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

