import IControls from './IControls';

export default class Controls implements IControls {
	public forward: boolean;
	public left: boolean;
	public right: boolean;
	public reverse: boolean;

	public constructor() {
		this.forward = false;
		this.left = false;
		this.right = false;
		this.reverse = false;
		this.addKeyboardListeners();
	}

	private addKeyboardListeners() {
		document.onkeydown = event => {
			switch (event.key) {
				case 'ArrowLeft':
					this.left = true;
					break;
				case 'ArrowRight':
					this.right = true;
					break;
				case 'ArrowUp':
					this.forward = true;
					break;
				case 'ArrowDown':
					this.reverse = true;
					break;
				default: break;
			}
		};

		document.onkeyup = event => {
			switch (event.key) {
				case 'ArrowLeft':
					this.left = false;
					break;
				case 'ArrowRight':
					this.right = false;
					break;
				case 'ArrowUp':
					this.forward = false;
					break;
				case 'ArrowDown':
					this.reverse = false;
					break;
				default: break;
			}
		};
	}
}
