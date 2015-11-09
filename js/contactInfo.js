$('.contact-info-right.clickable').mouseenter(function() {
	$(this).css({
		cursor: 'pointer',
		'background-color': '#F0F0F0'
	});

	var contactInfo = $(this)[0].children[1];
	$(contactInfo).css({
		'border-bottom': '1px solid black'
	});
}).mouseleave(function() {
	$(this).css({
		cursor: 'pointer',
		'background-color': '#FFF'
	});

	var contactInfo = $(this)[0].children[1];
	$(contactInfo).css('border-bottom', '');
});


$('.contact-info-left.clickable').mouseenter(function() {
	$(this).css({
		cursor: 'pointer',
		'background-color': '#F0F0F0'
	});

	var contactInfo = $(this)[0].children[1];
	$(contactInfo).css('border-bottom', '1px solid black');
}).mouseleave(function() {
	$(this).css({
		cursor: 'pointer',
		'background-color': '#FFF'
	});

	var contactInfo = $(this)[0].children[1];
	$(contactInfo).css('border-bottom', '');
});

$('.contact-info-right.clickable').on('click', function(elem) {
	// console.log(elem);
	var link = $(this)[0].attributes[1].nodeValue;
	window.location.href = link;
	window.test = $(this)[0].attributes;
});

$('.contact-info-left.clickable').on('click', function(elem) {
	// console.log(elem);
	var link = $(this)[0].attributes[1].nodeValue;
	console.log(link);
	window.location.href = link;
	window.test = $(this)[0].attributes;
});
