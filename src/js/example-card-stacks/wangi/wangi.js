import "src/js/example-card-stacks/wangi/wangi.css";

import { CardStack } from "src/js/card-stack";
import { CardStackControls } from "src/js/controls/card-stack-controls";

export class Wangi {
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
