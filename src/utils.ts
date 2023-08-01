import ILevel from './ILevel';
import { Point, Points } from './types';

export function lerp(a: number, b: number, t: number) {
	return a + ((b - a) * t);
}

export function getIntersection(a: Point, b: Point, c: Point, d: Point) {
	const tTop = ((d.x - c.x) * (a.y - c.y)) - ((d.y - c.y) * (a.x - c.x));
	const uTop = ((c.y - a.y) * (a.x - b.x)) - ((c.x - a.x) * (a.y - b.y));
	const bottom = ((d.y - c.y) * (b.x - a.x)) - ((d.x - c.x) * (b.y - a.y));

	if (bottom !== 0) {
		const t = tTop / bottom;
		const u = uTop / bottom;
		if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
			return {
				x: lerp(a.x, b.x, t),
				y: lerp(a.y, b.y, t),
				offset: t,
			};
		}
	}

	return null;
}

export function polysIntersect(points1: Points, points2: Points) {
	for (let i = 0; i < points1.length; i++) {
		for (let j = 0; j < points2.length; j++) {
			const touch = getIntersection(
				points1[i],
				points1[(i + 1) % points1.length],
				points2[j],
				points2[(j + 1) % points2.length],
			);
			if (touch) {
				return true;
			}
		}
	}

	return false;
}
