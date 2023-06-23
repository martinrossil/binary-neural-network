import { Point } from './types';

export default interface ICar {
	x: number;
	y: number;
	angle: number;
	update(borders: Point[][]): void;
	draw(context: CanvasRenderingContext2D): void;
}
