import ICar from './ICar';

export interface Point {
	x: number;
	y: number;
}

export interface TouchPoint extends Point {
	offset: number;
}

export type Ray = Points;

export type Rays = Ray[];

export type Borders = Points[];

export type ControlType = 'DUMMY' | 'KEYS' | 'AI';

export type Points = Point[];

export type Traffic = ICar[];
