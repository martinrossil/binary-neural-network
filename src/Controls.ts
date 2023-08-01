import IControls from './IControls';
import { ControlType } from './types';

export default class Controls implements IControls {
	public forward: boolean;
	public left: boolean;
	public right: boolean;
	public reverse: boolean;

	public constructor(type: ControlType) {
		this.forward = false;
		this.left = false;
		this.right = false;
		this.reverse = false;
		if (type === 'KEYS') {
			this.addKeyboardListeners();
		} else if (type === 'DUMMY') {
			this.forward = true;
		}
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
