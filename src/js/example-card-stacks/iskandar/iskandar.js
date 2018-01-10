import "src/js/example-card-stacks/iskandar/iskandar.css";
import dynamics from "dynamics.js";
import { CardStack } from "src/js/card-stack";
import { CardStackControls } from "src/js/controls/card-stack-controls";

export class Iskandar {
	constructor(identifier) {
		const options = {
			stackItemsAnimationDelay: 125,
			stackItemsAnimation: {
				duration: 800,
				type: dynamics.spring
			},
			perspectiveOrigin: "50% 130%",
			visible: 5,
			stackItemsPreAnimation: {
				accept: {
					elastic: true,
					animationProperties: { translateX: 150, translateY: -10 },
					animationSettings: {
						duration: 200,
						type: dynamics.easeOut
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
