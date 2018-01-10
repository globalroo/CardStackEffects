import "src/js/example-card-stacks/mawar/mawar.css";
import dynamics from "dynamics.js";
import { CardStack } from "src/js/card-stack";
import { CardStackControls } from "src/js/controls/card-stack-controls";

export class Mawar {
	constructor(identifier) {
		const options = {
			perspective: 1500,
			perspectiveOrigin: "-150% 50%",
			visible: 4,
			stackItemsAnimation: {
				duration: 1300,
				type: dynamics.spring
			},
			stackItemsPreAnimation: {
				accept: {
					elastic: true,
					animationProperties: { translateX: 100 },
					animationSettings: {
						duration: 200,
						type: dynamics.easeIn
					}
				},
				reject: {
					elastic: true,
					animationProperties: { translateX: -100 },
					animationSettings: {
						duration: 200,
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
