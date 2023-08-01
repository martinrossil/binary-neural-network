import ILevel from './ILevel';
import INeuralNetwork from './INeuralNetwork';
import Level from './Level';

export default class NeuralNetwork {
	public readonly levels: ILevel[];

	public static feedForward(givenInputs: number[], network: INeuralNetwork) {
		let outputs = Level.feedForward(givenInputs, network.levels[0]);
		for (let i = 1; i < network.levels.length; i++) {
			outputs = Level.feedForward(outputs, network.levels[i]);
		}

		return outputs;
	}

	public constructor(neuronCounts: number[]) {
		this.levels = [];
		for (let i = 0; i < neuronCounts.length - 1; i++) {
			this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
		}
	}
}
