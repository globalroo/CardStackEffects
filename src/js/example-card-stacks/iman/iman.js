import "src/js/example-card-stacks/iman/iman.css";
import dynamics from "dynamics.js";
import { CardStack } from "src/js/card-stack";
import { CardStackControls } from "src/js/controls/card-stack-controls";

export class Iman {
	constructor(identifier) {
		const options = {
			stackItemsAnimation: {
				duration: 800,
				type: dynamics.spring
			},
			stackItemsPreAnimation: {
				accept: {
					elastic: true,
					animationProperties: { translateX: 100, translateY: 10, rotateZ: 5 },
					animationSettings: {
						duration: 100,
						type: dynamics.easeIn
					}
				},
				reject: {
					elastic: true,
					animationProperties: { translateX: -100, translateY: 10, rotateZ: -5 },
					animationSettings: {
						duration: 100,
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
