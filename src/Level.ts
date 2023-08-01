import ILevel from './ILevel';

export default class Level implements ILevel {
	public readonly inputs: number[];
	public readonly outputs: number[];
	public readonly weights: number[][];

	public static randomize(level: ILevel) {
		for (let i = 0; i < level.inputs.length; i++) {
			for (let j = 0; j < level.outputs.length; j++) {
				// level.weights[i][j] = Math.random() * 2 - 1;
				level.weights[i][j] = Math.random() < 0.5 ? 0 : 1;
			}
		}
	}

	public static feedForward(givenInputs: number[], level: ILevel) {
		for (let i = 0; i < level.inputs.length; i++) {
			level.inputs[i] = givenInputs[i];
		}

		let inputWeight;

		for (let i = 0; i < level.outputs.length; i++) {
			let sum = 0;
			for (let j = 0; j < level.inputs.length; j++) {
				inputWeight = (level.inputs[j] + level.weights[j][i]);
				// console.log(level.inputs[j], level.weights[j][i], inputWeight);
				sum += inputWeight;
			}

			const average = sum / level.inputs.length;
			console.log(average);
			if (average > 1) {
				level.outputs[i] = 1;
			} else {
				level.outputs[i] = 0;
			}
		}

		return level.outputs;
	}

	public constructor(inputCount: number, outputCount: number) {
		this.inputs = new Array(inputCount);
		this.outputs = new Array(outputCount);
		this.weights = [];
		for (let i = 0; i < inputCount; i++) {
			this.weights[i] = new Array(outputCount);
		}

		Level.randomize(this);
	}
}
