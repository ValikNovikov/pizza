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