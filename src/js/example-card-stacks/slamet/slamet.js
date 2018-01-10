import "src/js/example-card-stacks/slamet/slamet.css";

import { CardStack } from "src/js/card-stack";
import { CardStackControls } from "src/js/controls/card-stack-controls";

const RESET_INTERVAL = 300;

export class Slamet {
	constructor(identifier) {
		const options = {
			infinite: false,
			perspective: 1400,
			onEndStack: this.onEndStack,
			stackItemsAnimationDelay: 400,
			postAnimationCallback: this.postAnimationCallback
		};
		this.cardStack = new CardStack(identifier, document.getElementById(identifier), options);
		this.cardStack.registerPostAnimationAcceptCallback(this.postAnimationAcceptCallback);
		this.cardStackControls = new CardStackControls(this.cardStack);
		this.counterNode = document.querySelector("#counter > .counter__number");
	}

	postAnimationCallback = () => {
		this.cardStackControls.enable();
	};

	postAnimationAcceptCallback = () => {
		let count = parseInt(this.counterNode.innerHTML);
		this.counterNode.innerHTML = count + 1;
	};

	resetStack = () => {
		this.cardStack.restart();
		this.counterNode.innerHTML = 0;
		this.cardStackControls.enable();
	};

	onEndStack = () => {
		setTimeout(this.resetStack, RESET_INTERVAL);
	};
}
