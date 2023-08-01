import { Borders, Points, Traffic } from './types';

export default interface ICar {
	x: number;
	y: number;
	angle: number;
	polygon: Points;
	update(borders: Borders, traffic: Traffic): void;
	draw(context: CanvasRenderingContext2D, color: string): void;
}
