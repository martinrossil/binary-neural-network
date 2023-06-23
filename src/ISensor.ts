import { Point } from './types';

export default interface ISensor {
	update(borders: Point[][]): void;
	draw(context: CanvasRenderingContext2D): void;
}
