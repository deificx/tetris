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
		this.storage = {};
	}

	_store(shape, x, y) {
		return {
			positions: this.getPosition(),
			shape: shape,
			x: x,
			y: y,
		};
	}

	_test(scenario) {
		this.events.emit('test', this._store(this.piece.shape, this.x, this.y), scenario);
	}

	accept() {
		this.storage = this._store(this.piece.shape, this.x, this.y);
		this.events.emit('positions', this.storage.positions);
	}

	deny() {
		this.piece.shape = this.storage.shape;
		this.x = this.storage.x;
		this.y = this.storage.y;
	}

	getPosition() {
		let i, j, positions = [], x = this.x, y = this.y;
		for (i = 0; i < this.piece.shape.length; i++) {
			for (j = 0; j < this.piece.shape[i].length; j++) {
				if (this.piece.shape[i][j]) {
					positions.push({
						x: x,
						y: y,
					});
				}
				x++;
			}
			x = this.x;
			y++;
		}
		return positions;
	}

	init() {
		const startPosition = -3;
		this.x = this.width / 2;
		this.y = 0 + startPosition;

		this.piece = shapes[Math.floor(Math.random() * shapes.length)];
		this.events.emit('piece', this.piece);

		switch (this.piece.symbol) {
		case 'I':
			this.x -= 2;
			this.y++;
			break;
		case 'J':
			this.x -= 2;
			break;
		case 'L':
			this.x -= 2;
			break;
		case 'O':
			this.x -= 1;
			break;
		case 'S':
			this.x -= 2;
			break;
		case 'T':
			this.x -= 2;
			break;
		case 'Z':
		default:
			this.x -= 2;
			break;
		}

		this.accept();
	}

	move(direction) {
		switch (direction) {
		case 'LEFT':
			this.x--;
			break;
		case 'RIGHT':
			this.x++;
			break;
		case 'DOWN':
		default:
			this.y++;
			break;
		}
		this._test();
	}

	render(context) {
		let i, j, x = this.x, y = this.y;
		context.fillStyle = this.piece.color;
		context.strokeStyle = '#000';
		for (i = 0; i < this.piece.shape.length; i++) {
			for (j = 0; j < this.piece.shape[i].length; j++) {
				if (this.piece.shape[i][j]) {
					context.beginPath();
					context.rect(x * this.size, y * this.size, this.size, this.size);
					context.fill();
					context.stroke();
				}
				x++;
			}
			x = this.x;
			y++;
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
		this._test();
	}

	update() {
		this.y++;
		this._test('update');
	}
}
