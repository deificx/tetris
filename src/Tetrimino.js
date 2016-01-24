"use strict";

import EventEmitter from 'eventemitter3';

const shapes = [
	{
		symbol: 'I',
		color: 'cyan',
		shape: [
			[1, 1, 1, 1,],
		],
	},
	{
		symbol: 'J',
		color: 'blue',
		shape: [
			[1, 1, 1,],
			[0, 0, 1,],
		],
	},
	{
		symbol: 'L',
		color: 'orange',
		shape: [
			[1, 1, 1,],
			[1, 0, 0,],
		],
	},
	{
		symbol: 'O',
		color: 'yellow',
		shape: [
			[1, 1,],
			[1, 1,],
		],
	},
	{
		symbol: 'S',
		color: 'lime',
		shape: [
			[0, 1, 1,],
			[1, 1, 0,],
		],
	},
	{
		symbol: 'T',
		color: 'purple',
		shape: [
			[1, 1, 1,],
			[0, 1, 0,],
		],
	},
	{
		symbol: 'Z',
		color: 'red',
		shape: [
			[1, 1, 0,],
			[0, 1, 1,],
		],
	},
];

export default class Tetrimino {
	constructor(options) {
		this.events = new EventEmitter();
		this.size = options.size;
		this.width = options.width;
	}

	init() {
		this.x = Math.floor(this.width / 2) * this.size;
		this.y = 0 - this.size - this.size - this.size;

		this.piece = shapes[Math.floor(Math.random() * shapes.length)];
		this.events.emit('piece', this.piece);

		switch (this.piece.symbol) {
		case 'I':
			this.x -= this.size * 2;
			this.y += this.size;
			break;
		case 'J':
			this.x -= this.size * 2;
			break;
		case 'L':
			this.x -= this.size * 2;
			break;
		case 'O':
			this.x -= this.size;
			break;
		case 'S':
			this.x -= this.size * 2;
			break;
		case 'T':
			this.x -= this.size * 2;
			break;
		case 'Z':
		default:
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
			if (this.x + this.piece.shape[0].length * this.size < this.size * this.width) {
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
		for (i = this.piece.shape.length - 1; i >= 0; i--) {
			for (j = 0; j < this.piece.shape[i].length; j++) {
				if (typeof shape[j] === 'undefined') {
					shape[j] = [];
				}
				shape[j].push(this.piece.shape[i][j]);
			}
		}
		this.piece.shape = shape;
	}

	update() {
		this.y += this.size;
	}

	render(context) {
		let i, j, x = this.x, y = this.y;
		context.fillStyle = this.piece.color;
		context.strokeStyle = '#000';
		for (i = 0; i < this.piece.shape.length; i++) {
			for (j = 0; j < this.piece.shape[i].length; j++) {
				if (this.piece.shape[i][j]) {
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

	getPosition() {
		let i, j, positions = [], x = this.x, y = this.y;
		for (i = 0; i < this.piece.shape.length; i++) {
			for (j = 0; j < this.piece.shape[i].length; j++) {
				if (this.piece.shape[i][j]) {
					positions.push({
						x: x / this.size,
						y: y / this.size,
					});
				}
				x += this.size;
			}
			x = this.x;
			y += this.size;
		}
		return positions;
	}
}
