import ICar from './ICar';
import ISensor from './ISensor';
import { Borders, Point, Ray, Rays, TouchPoint, Traffic } from './types';
import { getIntersection, lerp } from './utils';

export default class Sensor implements ISensor {
	private readonly car: ICar;
	public readonly rayCount;
	private readonly rayLength;
	private readonly raySpread;
	private rays: Rays;
	public readings: Array<TouchPoint | null>;

	public constructor(car: ICar) {
		this.car = car;
		this.rayCount = 16;
		this.rayLength = 250;
		this.raySpread = Math.PI * 0.3;
		this.rays = [];
		this.readings = [];
	}

	public update(borders: Borders, traffic: Traffic) {
		this.castRays();
		this.readings = [];
		for (const ray of this.rays) {
			this.readings.push(this.getReading(ray, borders, traffic));
		}
	}

	public draw(context: CanvasRenderingContext2D) {
		let index = 0;
		let end: Point | null | undefined;
		for (const ray of this.rays) {
			end = ray[1];
			if (this.readings[index]) {
				end = this.readings[index];
			}

			if (end) {
				context.beginPath();
				context.lineWidth = 2;
				context.strokeStyle = 'yellow';
				context.moveTo(
					ray[0].x,
					ray[0].y,
				);
				context.lineTo(
					end.x,
					end.y,
				);
				context.stroke();

				context.beginPath();
				context.lineWidth = 2;
				context.strokeStyle = 'black';
				context.moveTo(
					ray[1].x,
					ray[1].y,
				);
				context.lineTo(
					end.x,
					end.y,
				);
				context.stroke();
			}

			index++;
		}
	}

	private castRays() {
		this.rays = [];
		for (let i = 0; i < this.rayCount; i++) {
			const rayAngle = lerp(
				this.raySpread / 2,
				-this.raySpread / 2,
				this.rayCount === 1 ? 0.5 : i / (this.rayCount - 1),
			) + this.car.angle;

			const start = {x: this.car.x, y: this.car.y};
			const end = {
				x: this.car.x - (Math.sin(rayAngle) * this.rayLength),
				y: this.car.y - (Math.cos(rayAngle) * this.rayLength),
			};
			this.rays.push([start, end]);
		}
	}

	private getReading(ray: Ray, borders: Borders, traffic: Traffic) {
		const touches = [];

		for (const border of borders) {
			const touch = getIntersection(ray[0], ray[1], border[0], border[1]);
			if (touch) {
				touches.push(touch);
			}
		}

		for (const car of traffic) {
			const { polygon } = car;
			for (let j = 0; j < polygon.length; j++) {
				const value = getIntersection(
					ray[0],
					ray[1],
					polygon[j],
					polygon[(j + 1) % polygon.length],
				);
				if (value) {
					touches.push(value);
				}
			}
		}

		if (touches.length === 0) {
			return null;
		}

		const offsets = touches.map(e => e.offset);
		const minOffset = Math.min(...offsets);
		const foundTouches = touches.find(e => e.offset === minOffset);

		if (foundTouches) {
			return foundTouches;
		}

		return null;
	}
}
