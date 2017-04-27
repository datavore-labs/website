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