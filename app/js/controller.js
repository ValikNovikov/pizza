$(function () {
	function w() {
		console.log('nice');
	}

	w();

	$('#menu').slicknav({
		closedSymbol: "&#9658;",
		openedSymbol: "&#9660;"
	});

	$('.single-item').slick();
});

/* Set the width of the side navigation to 250px */
function openNav() {
	$("#mySidenav").css({'width':'290px'});
}
/* Set the width of the side navigation to 0 */
function closeNav() {
	$("#mySidenav").css({'width':'0'});
}

function showMobileDropDown () {
	if($('.mobile-dropdown').css('display') == 'none'){
		$('.mobile-dropdown').show('slow');
	} else {
		$('.mobile-dropdown').hide('slow');
	}

}