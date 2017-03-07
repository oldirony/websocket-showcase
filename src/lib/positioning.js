

export function calculateScrollPosTop (el) {
	const bbox = el.getBoundingClientRect();
	return bbox.top;// + Math.round(bbox.height/2);// + window.pageYOffset - window.innerHeight;
}

function easing (t) {
	return t<.5 ? 2*t*t : -1+(4-2*t)*t
}

function updateScrollPos(startTime, finalValue, duration, target) {
	let complete = false;
	let timeDiff = new Date().getTime() - startTime;
	if (timeDiff > duration) {
		timeDiff = duration;
		complete = true;
	}

	const difference = finalValue - target.scrollTop;
	const easedValue = easing(timeDiff / duration) * difference;

	if(target){
		target.scrollTop += easedValue;
	} else {
		window.scrollTo(0, easedValue + window.pageYOffset);
	}

	if (!complete) {
		requestAnimationFrame(updateScrollPos.bind(null, startTime, finalValue, duration, target));
	}
}

export function scroll (finalValue, duration, target) {
	const startTime = new Date().getTime();
	requestAnimationFrame(updateScrollPos.bind(null, startTime, finalValue, duration, target));
}