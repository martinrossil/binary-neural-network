export interface Point {
	x: number;
	y: number;
}

export interface TouchPoint extends Point {
	offset: number;
}

export type Ray = [Point, Point];

export type Rays = Ray[];

export type Border = [Point, Point];

export type Borders = [Border, Border];
