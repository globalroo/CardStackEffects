import "src/js/example-card-stacks/dian/dian.css";
import dynamics from "dynamics.js";
import { CardStack } from "src/js/card-stack";
import { CardStackControls } from "src/js/controls/card-stack-controls";

export class Dian {
	constructor(identifier) {
		const options = {
			stackItemsAnimationDelay: 125,
			stackItemsAnimation: {
				duration: 800,
				type: dynamics.spring
			},
			visible: 1,
			perspectiveOrigin: "50% 50%",
			postAnimationCallback: this.postAnimationCallback
		};
		this.cardStack = new CardStack(identifier, document.getElementById(identifier), options);
		this.cardStackControls = new CardStackControls(this.cardStack);
	}

	postAnimationCallback = () => {
		this.cardStackControls.enable();
	};
}
