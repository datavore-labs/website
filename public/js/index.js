$('#what .card').on('click', function() {
    $(this).toggleClass('flipped');
});

if ($('#header').length) {
    var highlightCounter = 1;
    var hasHighlight = false;

    function changeHighlight() {
        if (!hasHighlight) {
            if (highlightCounter > 2) {
                highlightCounter = 1;
            }
            $('#header').attr('data-highlight', highlightCounter);
            highlightCounter++;
            hasHighlight = true;

            setTimeout(function() {
                $('#header').removeAttr('data-highlight');
                hasHighlight = false;
            }, 5000);
        }
    }

    setTimeout(function() {
       setInterval(changeHighlight, 20000);
       changeHighlight();
    }, 10000);
}

// parallax animation for divider section
// init controller
var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});

// build scenes
new ScrollMagic.Scene({triggerElement: "#who"})
    .setTween("#who > div.bg", {y: "80%", ease: Linear.easeNone})
    .addTo(controller);

new ScrollMagic.Scene({triggerElement: ".parallax-lines"})
    .setTween(".parallax-lines > div.bg:nth-child(1)", {x: "20%", ease: Linear.easeNone})
    .addTo(controller);

new ScrollMagic.Scene({triggerElement: ".parallax-lines"})
    .setTween(".parallax-lines > div.bg:nth-child(2)", {x: "10%", ease: Linear.easeNone})
    .addTo(controller);

new ScrollMagic.Scene({triggerElement: ".parallax-lines"})
    .setTween(".parallax-lines > div.bg:nth-child(3)", {x: "5%", ease: Linear.easeNone})
    .addTo(controller);


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