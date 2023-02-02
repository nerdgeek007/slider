function sliders(sliderDiv) {
	if (!(sliderDiv instanceof Element)) {
		throw new Error('no slider');
	}
	// create some variables for slider
	let current;
	let prev;
	let next;
	//select some elements for working
	const slides = sliderDiv.querySelector('.slides');
	const prevButton = sliderDiv.querySelector('.goToPrev');
	const nextButton = sliderDiv.querySelector('.goToNext');

	function startSlider() {
		current = sliderDiv.querySelector('.current') || slides.firstElementChild;
		next = current.nextElementSibling || slides.firstElementChild;
		prev = current.previousElementSibling || slides.lastElementChild;
	}

	//add the classes
	function applyClasses() {
		current.classList.add('current');
		prev.classList.add('prev');
		next.classList.add('next');
	}

	//for moving the slides
	function move(direction) {
		//take the classes of
		const classes = ['current', 'prev', 'next'];
		current.classList.remove(...classes);
		prev.classList.remove(...classes);
		next.classList.remove(...classes);
		if (direction === 'back') {
			[prev, current, next] = [
				prev.previousElementSibling || slides.lastElementChild,
				prev,
				current,
			];
		} else {
			[prev, current, next] = [
				current,
				next,
				next.nextElementSibling || slides.firstElementChild,
			];
		}
		applyClasses();
	}

	function handleKey(e) {
		if (e.key === 'ArrowLeft') {
			move('back');
		}
		if (e.key === 'ArrowRight') {
			move();
		} else {
			return;
		}
	}

	//when the slider is created run the startSlider function
	startSlider();
	applyClasses();
	//add the eventlisteners
	prevButton.addEventListener('click', () => move('back'));
	nextButton.addEventListener('click', move);
	slides.addEventListener('keyup', handleKey);
}

const mySlider = sliders(document.querySelector('.slider'));

const dogSlider = sliders(document.querySelector('.dog-slider'));
