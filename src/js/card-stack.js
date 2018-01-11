import "src/css/component.css";

import dynamics from "dynamics.js";

const CARD_ACTION = {
	REJECT: "stack__item--reject",
	ACCEPT: "stack__item--accept"
};

const defaultOptions = {
	perspective: 1000,
	perspectiveOrigin: "50% -50%",
	cardSpacing: 50,
	visible: 3,
	infinite: true,
	stackItemsAnimation: {
		duration: 500,
		type: dynamics.bezier,
		points: [{ x: 0, y: 0, cp: [{ x: 0.25, y: 0.1 }] }, { x: 1, y: 1, cp: [{ x: 0.25, y: 1 }] }]
	},
	stackItemsAnimationDelay: 250
};

const createPositionCardAtCallback = (context, item, ix) => () => context.positionCardAt(item, ix);

export class CardStack {
	constructor(name, node, options) {
		this.name = name;
		this.node = node;
		this.postAnimationObservers = {};
		this.options = { ...defaultOptions, ...options };

		this.initialisePerspective();
		this.initialiseQueue();
		this.initialiseCards();
		this.initialised = true;
	}

	getName() {
		return this.name;
	}

	getNode() {
		return this.getNode();
	}

	getVisibleCardCount() {
		return this.cardQueue.length <= this.options.visible
			? this.cardQueue.length
			: this.options.visible;
	}

	initialisePerspective() {
		this.node.style.perspective = `${this.options.perspective}px`;
		this.node.style.perspectiveOrigin = this.options.perspectiveOrigin;
	}

	initialiseQueue() {
		this.cardQueue = Array.from(this.node.children);
	}

	initialiseCards() {
		this.cardQueue.forEach((item, ix) => {
			const isVisible = ix < this.getVisibleCardCount() ? true : false;
			isVisible ? this.positionCardAt(item, ix) : this.positionCardAtEnd(item);
		});
	}

	registerPostAnimationActionCallback(action, postAnimationCallback) {
		if (!this.postAnimationObservers[action]) {
			this.postAnimationObservers[action] = {};
			this.postAnimationObservers[action].observers = [];
		}

		this.postAnimationObservers[action].observers.push(postAnimationCallback);
		// Return unsubscribe method
		return () => {
			this.postAnimationAcceptObservers[action].observers = this.postAnimationAcceptObservers[
				action
			].observers.filter(fn => fn !== postAnimationCallback);
		};
	}

	registerPostAnimationAcceptCallback(callback) {
		this.registerPostAnimationActionCallback(CARD_ACTION.ACCEPT, callback);
	}

	registerPostAnimationRejectCallback(callback) {
		this.registerPostAnimationActionCallback(CARD_ACTION.REJECT, callback);
	}

	reject() {
		this.flingCardAnimation(CARD_ACTION.REJECT);
	}

	accept() {
		this.flingCardAnimation(CARD_ACTION.ACCEPT);
	}

	isEmpty() {
		return this.cardQueue.length === 0;
	}

	addAnimationDecorations(item, action) {
		item.addEventListener("animationend", this.onFlingCardAnimationEnd);
		item.classList.add(action);
	}

	removeAnimationDecorations(item) {
		item.classList.remove(CARD_ACTION.ACCEPT, CARD_ACTION.REJECT);
		item.removeEventListener("animationend", this.onFlingCardAnimationEnd);
	}

	restart() {
		this.initialiseQueue();
		this.initialiseCards();
	}

	getPreAnimationObject(cardAction) {
		let preAnimation;
		if (this.options.stackItemsPreAnimation) {
			if (cardAction === CARD_ACTION.ACCEPT) {
				preAnimation = this.options.stackItemsPreAnimation.accept;
			} else {
				preAnimation = this.options.stackItemsPreAnimation.reject;
			}
		}
		return preAnimation;
	}

	flingCardAnimation(cardAction) {
		if (this.isAnimating || this.isEmpty()) {
			return;
		}

		this.isAnimating = true;
		this.currentAction = cardAction;

		const preAnimation = this.getPreAnimationObject(cardAction);
		const item = this.cardQueue.shift();

		if (this.options.infinite) {
			this.cardQueue.push(item);
		}

		this.addAnimationDecorations(item, cardAction);

		setTimeout(
			this.animateDeck.call(this, { preAnimation }),
			this.options.stackItemsAnimationDelay
		);
	}

	onFlingCardAnimationEnd = event => {
		const item = event.target;
		const visibleCardCount = this.getVisibleCardCount();

		this.positionCardAtEnd(item, visibleCardCount);
		this.removeAnimationDecorations(item);
		this.isAnimating = false;

		// Call postAnimation callback registered via options
		if (this.options.postAnimationCallback) {
			this.options.postAnimationCallback(this);
		}

		if (this.postAnimationObservers[this.currentAction]) {
			const { observers } = this.postAnimationObservers[this.currentAction];
			if (observers && observers.length > 0) {
				observers.forEach(observer => observer.call(this));
			}
		}

		if (this.isEmpty() && this.options.onEndStack) {
			this.options.onEndStack(this);
		}
		this.currentAction = null;
	};

	positionCardAtEnd(item) {
		const offset = this.getVisibleCardCount();
		const translateZ = parseInt(-1 * this.options.cardSpacing * offset);

		item.style.opacity = 0;
		item.style.pointerEvents = "none";
		item.style.zIndex = -1;
		item.style.display = "none";

		item.style.transform = "translate3d(0px, 0px, " + translateZ + "px)";
	}

	positionCardAt(item, position) {
		const zIndex = parseInt(this.getVisibleCardCount() - position);
		const offset = position;
		const translateZ = parseInt(-1 * this.options.cardSpacing * offset);

		item.style.opacity = 1;
		item.style.pointerEvents = "auto";
		item.style.zIndex = zIndex;
		item.style.display = "block";

		setTimeout(() => {
			dynamics.animate(
				item,
				{
					translateZ: translateZ
				},
				this.options.stackItemsAnimation
			);
		}, 0);
	}

	getAnimationProps(preAnimation, ix, visibleCards) {
		const animProps = {};
		for (const [key, value] of Object.entries(preAnimation.animationProperties)) {
			var interval = preAnimation.elastic ? value / visibleCards : 0;
			animProps[key] = value - Number(ix * interval);
		}
		animProps.translateZ = parseInt(-1 * 50 * (ix + 1));
		return animProps;
	}

	animateDeck = ({ preAnimation }) => {
		const visibleCards = this.getVisibleCardCount();
		for (let ix = 0; ix < visibleCards; ++ix) {
			const item = this.cardQueue[ix];

			const positionCardAt = createPositionCardAtCallback(this, item, ix);

			if (preAnimation) {
				const animProps = this.getAnimationProps(preAnimation, ix, visibleCards);
				preAnimation.animationSettings.complete = positionCardAt;
				dynamics.animate(item, animProps, preAnimation.animationSettings);
			} else {
				setTimeout(positionCardAt, this.options.stackItemsAnimationDelay);
			}
		}
	};
}
