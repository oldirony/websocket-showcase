

export function calculateScrollPosTop (el) {
	const bbox = el.getBoundingClientRect();
	return bbox.top + Math.round(bbox.height/2);// + window.pageYOffset - window.innerHeight;
}

function easing (t) {
	return t<.5 ? 2*t*t : -1+(4-2*t)*t
}

function updateScrollPos(now, difference, duration, target) {
	let complete = false;
	let timeDiff = new Date().getTime() - now;
	if (timeDiff > duration) {
		timeDiff = duration;
		complete = true;
	}

	const easedValue = easing(timeDiff / duration) * difference;
	if(target){
		target.scrollTop = easedValue + target.scrollTop;
	} else {
		window.scrollTo(0, easedValue + window.pageYOffset);
	}

	if (!complete) {
		requestAnimationFrame(updateScrollPos.bind(null, now, difference, duration, target));
	}
}

export function scroll (finalValue, duration, target) {
	const now = new Date().getTime();
	const difference = finalValue - (target ? target.scrollTop : window.pageYOffset);
	requestAnimationFrame(updateScrollPos.bind(null, now, difference, duration, target));
}