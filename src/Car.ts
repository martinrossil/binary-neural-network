import Controls from './Controls';
import ICar from './ICar';
import IControls from './IControls';
import INeuralNetwork from './INeuralNetwork';
import ISensor from './ISensor';
import NeuralNetwork from './NeuralNetwork';
import Sensor from './Sensor';
import { Borders, ControlType, Points, TouchPoint, Traffic } from './types';
import { polysIntersect } from './utils';

export default class Car implements ICar {
	public x: number;
	public y: number;
	private readonly width: number;
	private readonly height: number;
	private speed;
	private readonly acceleration;
	private readonly maxSpeed: number;
	private readonly friction;
	public angle;
	private readonly controls: IControls;
	private readonly sensor: ISensor | null;
	private damaged: boolean;
	public readonly polygon: Points;
	private readonly useBrain: boolean;
	private readonly brain: INeuralNetwork | null;

	public constructor(x: number, y: number, width: number, height: number, controlType: ControlType, maxSpeed = 3) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = 0;
		this.acceleration = 0.2;
		this.maxSpeed = maxSpeed;
		this.friction = 0.05;
		this.angle = 0;
		this.damaged = false;
		this.polygon = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
		this.sensor = null;
		this.useBrain = controlType === 'AI';
		this.brain = null;
		if (controlType !== 'DUMMY') {
			this.sensor = new Sensor(this);
			this.brain = new NeuralNetwork([this.sensor.rayCount, 4, 4]);
		}

		console.table(this.brain?.levels);
		this.controls = new Controls(controlType);
	}

	public update(borders: Borders, traffic: Traffic): void {
		if (!this.damaged) {
			this.move();
			this.updatePolygon();
			this.damaged = this.assessDamage(borders, traffic);
		}

		if (this.sensor) {
			this.sensor.update(borders, traffic);
			const offsets = this.sensor.readings.map((s: TouchPoint | null) => {
				if (s !== null) {
					return 1;
				}

				return 0;
			});
			// const offsets = this.sensor.readings.map(s => s === null ? 0 : 1 - s.offset);
			if (this.brain) {
				const outputs = NeuralNetwork.feedForward(offsets, this.brain);
				// console.log(outputs);
				this.controls.forward = outputs[0] === 1;
				this.controls.left = outputs[1] === 1;
				this.controls.right = outputs[2] === 1;
				this.controls.reverse = outputs[3] === 1;
			}
		}
	}

	private updatePolygon() {
		const rad = Math.hypot(this.width, this.height) / 2;
		const alpha = Math.atan2(this.width, this.height);
		this.polygon[0].x = this.x - (Math.sin(this.angle - alpha) * rad);
		this.polygon[0].y = this.y - (Math.cos(this.angle - alpha) * rad);
		this.polygon[1].x = this.x - (Math.sin(this.angle + alpha) * rad);
		this.polygon[1].y = this.y - (Math.cos(this.angle + alpha) * rad);
		this.polygon[2].x = this.x - (Math.sin(Math.PI + this.angle - alpha) * rad);
		this.polygon[2].y = this.y - (Math.cos(Math.PI + this.angle - alpha) * rad);
		this.polygon[3].x = this.x - (Math.sin(Math.PI + this.angle + alpha) * rad);
		this.polygon[3].y = this.y - (Math.cos(Math.PI + this.angle + alpha) * rad);
	}

	private assessDamage(borders: Borders, traffic: ICar[]) {
		for (const border of borders) {
			if (polysIntersect(this.polygon, border)) {
				return true;
			}
		}

		for (const car of traffic) {
			if (polysIntersect(this.polygon, car.polygon)) {
				return true;
			}
		}

		return false;
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

	public draw(context: CanvasRenderingContext2D, color: string) {
		if (this.damaged) {
			context.fillStyle = 'gray';
		} else {
			context.fillStyle = color;
		}

		context.beginPath();
		context.moveTo(this.polygon[0].x, this.polygon[0].y);
		context.lineTo(this.polygon[1].x, this.polygon[1].y);
		context.lineTo(this.polygon[2].x, this.polygon[2].y);
		context.lineTo(this.polygon[3].x, this.polygon[3].y);

		context.fill();
		if (this.sensor) {
			this.sensor.draw(context);
		}
	}
}
