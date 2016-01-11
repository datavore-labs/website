// parallaxy backgrounds
// see http://pixelcog.github.io/parallax.js/

$('#header').parallax({
	imageSrc: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/102827/omar-style.jpg'
});

$('#get').parallax({
	imageSrc: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/102827/omar-style.jpg'
});

$('#who').parallax({
	imageSrc: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/102827/43West23rdStreetNY.jpg'
});

// card flipping animation
// https://nnattawat.github.io/flip/

$(".card").flip();


// @todo: figure out a new scrollspy method

// first method: didn't give us what we needed, a little clunky

// section snap scrolling
// disabled for initial release
// see http://projects.lukehaas.me/scrollify
// alternative if needed https://github.com/peachananr/purejs-onepage-scroll

/*
$.scrollify({
	section : "section",
	easing: "easeOutExpo",
	scrollSpeed: 1100,
	offset : 0,
	scrollbars: true,
	before:function() {},
	after:function() {},
	afterResize:function() {}
});
*/


// second method: strip out the fancy stuff and cut straight to jquery

// minimalistic scrollspy
// from https://jsfiddle.net/mekwall/up4nu/
/*
// Cache selectors
var lastId,
	topMenu = $("#top-menu"),
	topMenuHeight = topMenu.outerHeight() + 15,
	// All list items
	menuItems = topMenu.find("a"),
	// Anchors corresponding to menu items
	scrollItems = menuItems.map(function() {
		var item = $($(this).attr("href"));
		if (item.length) {
			return item;
		}
	});

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e) {
	var href = $(this).attr("href"),
		offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
	$('html, body').stop().animate({
		scrollTop: offsetTop
	}, 300);
	e.preventDefault();
});

// Bind to scroll
$(window).scroll(function() {
	// Get container scroll position
	var fromTop = $(this).scrollTop() + topMenuHeight;

	// Get id of current scroll item
	var cur = scrollItems.map(function() {
		if ($(this).offset().top < fromTop)
			return this;
	});
	// Get the id of the current element
	cur = cur[cur.length - 1];
	var id = cur && cur.length ? cur[0].id : "";

	if (lastId !== id) {
		lastId = id;
		// Set/remove active class
		menuItems
			.parent().removeClass("active")
			.end().filter("[href=#" + id + "]").parent().addClass("active");
	}
});
*/