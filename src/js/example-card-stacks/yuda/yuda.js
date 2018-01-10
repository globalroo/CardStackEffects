import "src/js/example-card-stacks/yuda/yuda.css";

import { CardStack } from "src/js/card-stack";
import { CardStackControls } from "src/js/controls/card-stack-controls";

export class Yuda {
	constructor(identifier) {
		const options = {
			postAnimationCallback: this.postAnimationCallback
		};
		this.cardStack = new CardStack(identifier, document.getElementById(identifier), options);
		this.cardStackControls = new CardStackControls(this.cardStack);
	}

	postAnimationCallback = () => {
		this.cardStackControls.enable();
	};
}
