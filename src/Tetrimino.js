"use strict";

export default class Tetrimino {
	constructor(shape, options) {
		this.size = options.size;
		this.width = options.width;
		this.x = Math.floor(options.width / 2) * this.size;
		this.y = 0 - this.size * 3;

		switch (shape) {
		case 'I':
			this.color = 'cyan';
			this.shape = [
				[1, 1, 1, 1,],
			];
			this.x -= this.size * 2;
			this.y += this.size;
			break;
		case 'J':
			this.color = 'blue';
			this.shape = [
				[1, 1, 1,],
				[0, 0, 1,],
			];
			this.x -= this.size * 2;
			break;
		case 'L':
			this.color = 'orange';
			this.shape = [
				[1, 1, 1,],
				[1, 0, 0,],
			];
			this.x -= this.size * 2;
			break;
		case 'O':
			this.color = 'yellow';
			this.shape = [
				[1, 1,],
				[1, 1,],
			];
			this.x -= this.size;
			break;
		case 'S':
			this.color = 'lime';
			this.shape = [
				[0, 1, 1,],
				[1, 1, 0,],
			];
			this.x -= this.size * 2;
			break;
		case 'T':
			this.color = 'purple';
			this.shape = [
				[1, 1, 1,],
				[0, 1, 0,],
			];
			this.x -= this.size * 2;
			break;
		case 'Z':
		default:
			this.color = 'red';
			this.shape = [
				[1, 1, 0,],
				[0, 1, 1,],
			];
			this.x -= this.size * 2;
			break;
		}
	}

	move(direction) {
		switch (direction) {
		case 'LEFT':
			if (this.x > 0) {
				this.x -= this.size;
			}
			break;
		case 'RIGHT':
			if (this.x + this.shape[0].length * this.size < this.size * this.width) {
				this.x += this.size;
			}
			break;
		case 'DOWN':
		default:
			this.y += this.size;
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
		context.fillStyle = this.color;
		context.strokeStyle = '#000';
		for (i = 0; i < this.shape.length; i++) {
			for (j = 0; j < this.shape[i].length; j++) {
				if (this.shape[i][j]) {
					context.beginPath();
					context.rect(x, y, this.size, this.size);
					context.fill();
					context.stroke();
				}
				x += this.size;
			}
			x = this.x;
			y += this.size;
		}
	}
}
