import "src/js/example-card-stacks/eka/eka.css";
import dynamics from "dynamics.js";
import { CardStack } from "src/js/card-stack";
import { CardStackControls } from "src/js/controls/card-stack-controls";

export class Eka {
	constructor(identifier) {
		const options = {
			stackItemsAnimation: {
				duration: 800,
				type: dynamics.spring
			},
			postAnimationCallback: this.postAnimationCallback
		};
		this.cardStack = new CardStack(identifier, document.getElementById(identifier), options);
		this.cardStackControls = new CardStackControls(this.cardStack);
	}

	postAnimationCallback = () => {
		this.cardStackControls.enable();
	};
}
