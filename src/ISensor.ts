import { Points, TouchPoint, Traffic } from './types';

export default interface ISensor {
	rayCount: number;
	readings: Array<TouchPoint | null>;
	update(borders: Points[], traffic: Traffic): void;
	draw(context: CanvasRenderingContext2D): void;
}
