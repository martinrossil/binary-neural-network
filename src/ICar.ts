import { Point } from './types';

export default interface ICar {
	y: number;
	update(borders: Point[][]): void;
	draw(context: CanvasRenderingContext2D): void;
}
