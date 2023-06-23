import { Point } from './types';

export default interface IRoad {
	readonly borders: Point[][];
	getLaneCenter(laneIndex: number): number;
	draw(context: CanvasRenderingContext2D): void;
}
