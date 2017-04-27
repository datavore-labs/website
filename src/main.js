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