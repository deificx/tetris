"use strict";

export default class Tetrimino {
	constructor(shape) {
		this.size = 30;
		this.x = 0;
		this.y = 0;

		switch (shape) {
		case 'I':
			this.color = 'cyan';
			this.shape = [
				[1, 1, 1, 1,],
			];
			break;
		case 'J':
			this.color = 'blue';
			this.shape = [
				[1, 1, 1,],
				[0, 0, 1,],
			];
			break;
		case 'L':
			this.color = 'orange';
			this.shape = [
				[1, 1, 1,],
				[1, 0, 0,],
			];
			break;
		case 'O':
			this.color = 'yellow';
			this.shape = [
				[1, 1,],
				[1, 1,],
			];
			break;
		case 'S':
			this.color = 'lime';
			this.shape = [
				[0, 1, 1,],
				[1, 1, 0,],
			];
			break;
		case 'T':
			this.color = 'purple';
			this.shape = [
				[1, 1, 1,],
				[0, 1, 0,],
			];
			break;
		case 'Z':
		default:
			this.color = 'red';
			this.shape = [
				[1, 1, 0,],
				[0, 1, 1,],
			];
			break;
		}
	}

	rotate() {
		let i, j, shape = [];
		for (i = this.shape.length - 1; i >= 0; i--) {
			for (j = 0; j < this.shape[i].length; j++) {
				if (typeof shape[j] === 'undefined') {
					shape[j] = [];
				}
				shape[j].push(this.shape[i][j]);
			}
		}
		this.shape = shape;
	}

	update() {
		this.y += this.size;
	}

	render(context) {
		let i, j, x = this.x, y = this.y;
		for (i = 0; i < this.shape.length; i++) {
			for (j = 0; j < this.shape[i].length; j++) {
				if (this.shape[i][j]) {
					context.beginPath();
					context.rect(x, y, this.size, this.size);
					context.fillStyle = this.color;
					context.fill();
					context.stroke();
					context.closePath();
				}
				x += this.size;
			}
			x = 0;
			y += this.size;
		}
	}
}