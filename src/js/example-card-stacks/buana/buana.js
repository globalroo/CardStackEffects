import "src/js/example-card-stacks/buana/buana.css";
import { CardStack } from "src/js/card-stack";
import { CardStackControls } from "src/js/controls/card-stack-controls";

export class Buana {
	constructor(identifier) {
		const options = {
			perspectiveOrigin: "-50% -50%",
			postAnimationCallback: this.postAnimationCallback
		};
		this.cardStack = new CardStack(identifier, document.getElementById(identifier), options);
		this.cardStackControls = new CardStackControls(this.cardStack);
		this.radialActionNode = document.getElementById("radialAction");
		this.addClickRadialEffect();
	}

	addClickRadialEffect() {
		this.cardStackControls.acceptButton.addClickHandler(this.playRadialAnimation);
		this.cardStackControls.rejectButton.addClickHandler(this.playRadialAnimation);
	}

	postAnimationCallback = () => {
		this.cardStackControls.enable();
	};

	playRadialAnimation = event => {
		const bttn = event.currentTarget;
		const boxOffset = this.radialActionNode.parentNode.getBoundingClientRect();
		const offset = bttn.getBoundingClientRect();
		this.radialActionNode.style.left = Number(offset.left - boxOffset.left) + "px";
		this.radialActionNode.style.top = Number(offset.top - boxOffset.top) + "px";
		this.radialActionNode.classList.add(
			bttn.classList.contains("button--reject")
				? "material-circle--reject"
				: "material-circle--accept"
		);
		this.radialActionNode.addEventListener("animationend", this.radialActionAnimationEnd);
		this.radialActionNode.classList.add("material-circle--active");
	};

	radialActionAnimationEnd = () => {
		this.radialActionNode.removeEventListener("animationend", this.radialActionAnimationEnd);
		this.radialActionNode.classList.remove("material-circle--reject", "material-circle--accept");
		this.radialActionNode.classList.remove("material-circle--active");
	};
}
