import Car from './Car';
import ICar from './ICar';
import IRoad from './IRoad';
import Road from './Road';

export default class BinaryNeuralNetwork extends HTMLElement {
	public constructor() {
		super();
		this.style.display = 'block';
		this.style.height = '100%';
		this.appendChild(this.carCanvas);
		this.road = new Road(this.carCanvas.width / 2, this.carCanvas.width * 0.9);
		this.car = new Car(this.road.getLaneCenter(1), 100, 30, 50);
		this.update();
	}

	private update() {
		this.carContext.save();
		this.carContext.fillStyle = 'lightgray';
		this.carContext.fillRect(0, 0, this.carCanvas.width, this.carCanvas.height);
		this.carContext.restore();

		this.car.update(this.road.borders);
		this.carContext.save();
		this.carContext.translate(0, -this.car.y + (this.carCanvas.height * 0.7));
		this.road.draw(this.carContext);
		this.car.draw(this.carContext);
		this.carContext.restore();
		requestAnimationFrame(this.update.bind(this));
		/* this.carContext.save();
		this.carContext.fillStyle = 'lightgray';
		this.carContext.fillRect(0, 0, this.carCanvas.width, this.carCanvas.height);
		this.carContext.restore();
		this.car.update();
		this.car.draw(this.carContext);
		requestAnimationFrame(this.update.bind(this)); */
	}

	private readonly road: IRoad;

	private readonly car: ICar;

	private _carCanvas!: HTMLCanvasElement;

	private get carCanvas() {
		if (!this._carCanvas) {
			this._carCanvas = document.createElement('canvas');
			this._carCanvas.width = 200;
			this._carCanvas.height = window.innerHeight;
			this._carCanvas.style.background = 'lightgray';
		}

		return this._carCanvas;
	}

	private _carContext!: CanvasRenderingContext2D;

	private get carContext() {
		if (!this._carContext) {
			this._carContext = this.carCanvas.getContext('2d') as unknown as CanvasRenderingContext2D;
		}

		return this._carContext;
	}
}
customElements.define('binary-neural-network', BinaryNeuralNetwork);
