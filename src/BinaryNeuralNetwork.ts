export default class BinaryNeuralNetwork extends HTMLElement {
	public constructor() {
		super();
		console.log('Binary!');
	}
}
customElements.define('binary-neural-network', BinaryNeuralNetwork);