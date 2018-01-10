import { AnimatedButton } from "src/js/controls/animated-button";

export class CardStackControls {
	constructor(cardStack) {
		this.cardStack = cardStack;
		this.identifier = cardStack.getName();
		this.acceptButton = this.createAcceptButton(this.acceptHandler);
		this.rejectButton = this.createRejectButton(this.rejectHandler);
	}

	enable = () => {
		this.acceptButton.enableButton();
		this.rejectButton.enableButton();
	};

	disable() {
		this.acceptButton.disableButton();
		this.rejectButton.disableButton();
	}

	acceptHandler = () => {
		this.disable();
		this.cardStack.accept();
	};

	rejectHandler = () => {
		this.disable();
		this.cardStack.reject();
	};

	createAcceptButton(acceptHandler) {
		const acceptNode = document.querySelector(`.button--accept[data-stack = ${this.identifier}]`);
		return new AnimatedButton(acceptNode, acceptHandler);
	}

	createRejectButton(rejectHandler) {
		const rejectNode = document.querySelector(`.button--reject[data-stack = ${this.identifier}]`);
		return new AnimatedButton(rejectNode, rejectHandler);
	}
}
