"use strict";

export default class Tetra {
	constructor(shape) {
		this.shape = null;

		switch (shape) {
		case 'I':
			this.color = 'cyan';
			this.shape = [
				[1, 1, 1, 1,],
				[0, 0, 0, 0,],
			];
			break;
		case 'J':
			this.color = 'blue';
			this.shape = [
				[1, 1, 1, 0,],
				[0, 0, 1, 0,],
			];
			break;
		case 'L':
			this.color = 'orange';
			this.shape = [
				[1, 1, 1, 0,],
				[1, 0, 0, 0,],
			];
			break;
		case 'O':
			this.color = 'yellow';
			this.shape = [
				[1, 1, 0, 0,],
				[1, 1, 0, 0,],
			];
			break;
		case 'S':
			this.color = 'lime';
			this.shape = [
				[0, 1, 1, 0,],
				[1, 1, 0, 0,],
			];
			break;
		case 'T':
			this.color = 'purple';
			this.shape = [
				[1, 1, 1, 0,],
				[0, 1, 0, 0,],
			];
			break;
		case 'Z':
		default:
			this.color = 'red';
			this.shape = [
				[1, 1, 0, 0,],
				[0, 1, 1, 0,],
			];
			break;
		}
	}

	rotate() {
		let i, j;
		let shape = [];
		for (i = this.shape.length; i > 0; i--) {
			for (j = 0; j < this.shape[i].length; j++) {
				if (typeof shape[j] === 'undefined') {
					shape[j] = [this.shape[i][j]];
				} else {
					shape[j].push(this.shape[i][j]);
				}
			}
		}
		this.shape = shape;
	}

	update() {

	}

	render() {
		
	}
}
