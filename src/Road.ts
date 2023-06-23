import IRoad from './IRoad';
import { Point } from './types';
import { lerp } from './utils';

export default class Road implements IRoad {
	private readonly x: number;
	private readonly width: number;
	private readonly laneCount: number;
	private readonly left: number;
	private readonly right: number;
	private readonly top = -1000000;
	private readonly bottom = 1000000;
	public readonly borders: Point[][];

	public constructor(x: number, width: number, laneCount = 3) {
		this.x = x;
		this.width = width;
		this.laneCount = laneCount;
		this.left = x - (width * 0.5);
		this.right = x + (width * 0.5);

		const topLeft = {x: this.left, y: this.top};
		const topRight = {x: this.right, y: this.top};
		const bottomLeft = {x: this.left, y: this.bottom};
		const bottomRight = {x: this.right, y: this.bottom};
		this.borders = [
			[topLeft, bottomLeft],
			[topRight, bottomRight],
		];
	}

	public getLaneCenter(laneIndex: number) {
		const laneWidth = this.width / this.laneCount;
		return this.left + (laneWidth * 0.5) + (Math.min(laneIndex, this.laneCount - 1) * laneWidth);
	}

	public draw(context: CanvasRenderingContext2D) {
		context.save();

		context.lineWidth = 5;
		context.strokeStyle = 'white';
		context.setLineDash([20, 20]);

		for (let i = 1; i <= this.laneCount - 1; i++) {
			const x = lerp(
				this.left,
				this.right,
				i / this.laneCount,
			);

			// context.setLineDash([20, 20]);
			context.beginPath();
			context.moveTo(x, this.top);
			context.lineTo(x, this.bottom);
			context.stroke();
		}

		context.setLineDash([]);

		this.borders.forEach(border => {
			context.beginPath();
			if (border[0] && border[1]) {
				context.moveTo(border[0].x, border[0].y);
				context.lineTo(border[1].x, border[1].y);
			}

			context.stroke();
		});

		context.restore();
	}
}
