import ScrollMagic from 'ScrollMagic';
import 'animation.gsap';
import 'debug.addIndicators';
import TimelineMax from 'TimelineMax';

// Header animation
const header = document.querySelector('#header');

if (header) {
	let highlightCounter = 1;
	let hasHighlight = false;

	const changeHighlight = () => {
		if (!hasHighlight) {
			if (highlightCounter > 2) {
				highlightCounter = 1;
			}
			header.setAttribute('data-highlight', highlightCounter);
			highlightCounter++;
			hasHighlight = true;

			setTimeout(function() {
				header.removeAttribute('data-highlight');
				hasHighlight = false;
			}, 5000);
		}
	};

	setTimeout(function() {
		setInterval(changeHighlight, 20000);
		changeHighlight();
	}, 10000);
}

// Scroll watch for header
const main = document.querySelector('main');
const nav = document.querySelector('nav');
let scrollThrottle = false;

const setHeaderStyle = () => {
	nav.setAttribute('data-faded', main.scrollTop < 200);
};

setHeaderStyle();

main.addEventListener('scroll', () => {
	if (!scrollThrottle) {
		scrollThrottle = true;
		requestAnimationFrame(() => {
			setHeaderStyle();
			scrollThrottle = false;
		});
	}
}, { passive: true });

// Parallax for about section
const aboutBg = document.querySelector('.about-bg');
if (aboutBg) {
	const controller = new ScrollMagic.Controller({
		container: main
	});

	const tween = new TimelineMax()
		.add([
			TweenMax.to(aboutBg, 1, {y:'-25%'})
		]);

	const scene = new ScrollMagic.Scene({
		triggerElement: "#solutions",
		duration: 1000,
		ease: Linear.easeNone,
		offset: 500,
	})
		.setTween(tween)
		.addTo(controller);
}

// Analytics
const GA_EVENT_ATTR = 'data-ga-event';
const eventLinks = Array.prototype.slice.call(document.querySelectorAll(`[${GA_EVENT_ATTR}]`));
eventLinks.forEach(l => {
	l.addEventListener('click', () => {
		if (ga) {
			const event = l.getAttribute(GA_EVENT_ATTR);
			ga('send', 'event', 'Contact', 'click', event);
		}
	});
});