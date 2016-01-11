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

// section snap scrolling
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

// card flipping animation
// https://nnattawat.github.io/flip/

$(".card").flip();