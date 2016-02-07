"use strict";

import EventEmitter from 'eventemitter3';

export default class Grid {
	constructor(options) {
		let i, j;
		this.events = new EventEmitter();
		this.grid = [];
		this.height = options.height;
		this.width = options.width;
		this.size = options.size;
		for (i = 0; i < this.height; i++) {
			this.grid[i] = [];
			for (j = 0; j < this.width; j++) {
				this.grid[i].push({
					color: null,
					hit: false,
				});
			}
		}
		this.prevPositions = [];
	}

	_checkLines() {
		let i, j, l = 0, n, p;
		for (i = 0; i < this.height; i++) {
			let full = true;
			for (j = 0; j < this.width; j++) {
				if (!this.grid[i][j].hit) {
					full = false;
				}
			}
			if (full) {
				l++;
				n = i + 1;
				while (n--) {
					this.grid[n] = this.grid[n-1];
				}
				this.grid[0] = [];
				for (p = 0; p < this.width; p++) {
					this.grid[0].push({
						color: null,
						hit: false,
					});
				}
			}
		}
		if (l) {
			this.events.emit('score', l);
		}
	}

	collision(positions) {
		let hit = false;
		positions.map((pos) => {
			if (pos.y < 0) {
				return;
			}
			if (pos.y >= this.height) {
				hit = true;
				return;
			}
			if (pos.x < 0 || pos.x >= this.width) {
				hit = true;
				return;
			}
			if (typeof this.grid[pos.y] === 'undefined') {
				hit = true;
				return;
			}
			if (this.grid[pos.y][pos.x].hit) {
				hit = true;
				return;
			}
		});
		return hit;
	}

	render(context) {
		let i, j;
		context.strokeStyle = '#111';
		for (i = 0; i < this.grid.length; i++) {
			for (j = 0; j < this.grid[i].length; j++) {
				context.beginPath();
				context.rect(this.size * j, this.size * i, this.size, this.size);
				if (this.grid[i][j].color) {
					context.fillStyle = this.grid[i][j].color;
					context.fill();
				} else {
					context.stroke();
				}
			}
		}
	}

	setPiece(piece) {
		this.prevPositions.map((pos) => {
			if (pos.y < 0) {
				return;
			}
			this.grid[pos.y][pos.x].hit = true;
		});
		this._checkLines();
		this.prevPositions = [];
		this.piece = piece;
	}

	setPosition(positions) {
		this.prevPositions.map((pos) => {
			if (pos.y < 0) {
				return;
			}
			this.grid[pos.y][pos.x].color = null;
		});
		this.prevPositions = positions;
		positions.map((pos) => {
			if (pos.y < 0) {
				return;
			}
			this.grid[pos.y][pos.x].color = this.piece.color;
		});
	}
}
