import "src/js/example-card-stacks/kasih/kasih.css";
import dynamics from "dynamics.js";
import { CardStack } from "src/js/card-stack";
import { CardStackControls } from "src/js/controls/card-stack-controls";

export class Kasih {
	constructor(identifier) {
		const options = {
			stackItemsAnimation: {
				duration: 1000,
				type: dynamics.spring,
				friction: 420
			},
			visible: 4,
			perspectiveOrigin: "50% 50%",
			stackItemsPreAnimation: {
				accept: {
					elastic: true,
					animationProperties: { translateX: 250 },
					animationSettings: {
						duration: 400,
						type: dynamics.easeIn
					}
				},
				reject: {
					elastic: true,
					animationProperties: { translateX: -250 },
					animationSettings: {
						duration: 400,
						type: dynamics.easeIn
					}
				}
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
