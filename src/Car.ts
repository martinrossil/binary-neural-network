import Controls from './Controls';
import ICar from './ICar';
import IControls from './IControls';
import ISensor from './ISensor';
import Sensor from './Sensor';
import { Point } from './types';

export default class Car implements ICar {
	private x: number;
	public y: number;
	private readonly width: number;
	private readonly height: number;
	private speed = 0;
	private readonly acceleration = 0.2;
	private readonly maxSpeed = 3;
	private readonly friction = 0.05;
	private angle = 0;
	private readonly controls: IControls;
	private readonly sensor: ISensor;

	public constructor(x: number, y: number, width: number, height: number) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.controls = new Controls();
		this.sensor = new Sensor(this);
	}

	public update(borders: Point[][]): void {
		this.move();
		this.sensor.update(borders);
	}

	private move() {
		if (this.controls.forward) {
			this.speed += this.acceleration;
		}

		if (this.controls.reverse) {
			this.speed -= this.acceleration;
		}

		if (this.speed > this.maxSpeed) {
			this.speed = this.maxSpeed;
		}

		if (this.speed < -this.maxSpeed / 2) {
			this.speed = -this.maxSpeed / 2;
		}

		if (this.speed > 0) {
			this.speed -= this.friction;
		}

		if (this.speed < 0) {
			this.speed += this.friction;
		}

		if (Math.abs(this.speed) < this.friction) {
			this.speed = 0;
		}

		if (this.speed !== 0) {
			const flip = this.speed > 0 ? 1 : -1;
			if (this.controls.left) {
				this.angle += 0.03 * flip;
			}

			if (this.controls.right) {
				this.angle -= 0.03 * flip;
			}
		}

		this.x -= Math.sin(this.angle) * this.speed;
		this.y -= Math.cos(this.angle) * this.speed;
	}

	public draw(context: CanvasRenderingContext2D) {
		context.save();
		context.fillStyle = 'black';
		context.translate(this.x, this.y);
		context.rotate(-this.angle);
		context.beginPath();
		context.rect(-this.width * 0.5, -this.height * 0.5, this.width, this.height);
		context.fill();
		context.restore();
		this.sensor.draw(context);
	}
}
