import ICar from './ICar';
import ISensor from './ISensor';
import { Point } from './types';

export default class Sensor implements ISensor {
	private readonly car: ICar;
	private readonly rayCount = 5;
	private readonly rayLength = 150;
	private readonly raySpread = Math.PI * 0.5;

	public constructor(car: ICar) {
		this.car = car;
	}

	public update(borders: Point[][]) {
		//
	}

	public draw(context: CanvasRenderingContext2D) {
		//
	}
}
