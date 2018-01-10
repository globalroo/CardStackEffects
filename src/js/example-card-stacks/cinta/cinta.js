import "src/js/example-card-stacks/cinta/cinta.css";

import { CardStack } from "src/js/card-stack";
import { CardStackControls } from "src/js/controls/card-stack-controls";

const RESET_INTERVAL = 300;

export class Cinta {
	constructor(identifier) {
		const options = {
			perspective: 1400,
			perspectiveOrigin: "200% -100%",
			visible: 6,
			infinite: false,
			onEndStack: this.onEndStack,
			postAnimationCallback: this.postAnimationCallback
		};
		this.cardStack = new CardStack(identifier, document.getElementById(identifier), options);
		this.cardStackControls = new CardStackControls(this.cardStack);
	}

	restartStack = () => {
		this.cardStack.restart();
		this.cardStackControls.enable();
	};

	onEndStack = () => {
		setTimeout(this.restartStack, RESET_INTERVAL);
	};

	postAnimationCallback = () => {
		this.cardStackControls.enable();
	};
}
