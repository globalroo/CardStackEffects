import MobileDetect from "mobile-detect";

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const mobileCheck = mobileDetect.mobile();
const clickEventType = mobileCheck ? "touchstart" : "click";
const animationTriggerClass = "button--active";
const animationEndedEvent = "animationend";

/**
 * Click feedback effect : see more at http://tympanus.net/codrops/2015/02/11/subtle-click-feedback-effects/
 */

export class AnimatedButton {
	constructor(node, callback) {
		this.node = node;
		this.enabled = true;
		this.clickHandlers = [];
		if (callback && typeof callback === "function") {
			this.clickHandlers.push(callback);
		}
		this.node.addEventListener(clickEventType, this.clickHandler);
		this.node.addEventListener(animationEndedEvent, this.animationEnded);
	}

	addClickHandler(callback) {
		if (callback && typeof callback === "function") {
			this.clickHandlers.push(callback);
		}
	}

	removeClickHandler(callback) {
		this.clickHandlers.filter(clickHandler => clickHandler !== callback);
	}

	isEnabled() {
		return this.enabled === true;
	}

	enableButton = () => {
		this.enabled = true;
	};

	disableButton = () => {
		this.enabled = false;
	};

	clickHandler = event => {
		if (this.enabled) {
			this.node.classList.add(animationTriggerClass);
			this.clickHandlers.forEach(callback => callback(event, this));
		}
	};

	animationEnded = () => {
		this.node.classList.remove(animationTriggerClass);
	};
}
