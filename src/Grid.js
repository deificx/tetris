"use strict";

export default class Grid {
	constructor(options) {
		let i, j;
		this.grid = [];
		this.size = options.size;
		for (i = 0; i < options.height; i++) {
			this.grid[i] = [];
			for (j = 0; j < options.width; j++) {
				this.grid[i].push(0);
			}
		}
	}

	render(context) {
		let i, j;
		context.strokeStyle = '#bbb';
		for (i = 0; i < this.grid.length; i++) {
			for (j = 0; j < this.grid[i].length; j++) {
				context.beginPath();
				context.rect(this.size * j, this.size * i, this.size, this.size);
				context.stroke();
			}
		}
	}
}
