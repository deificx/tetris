export default class Grid {
	constructor(width, height) {
		let i, j;
		this.grid = [];
		this.size = 30;
		for (i = 0; i < height; i++) {
			this.grid[i] = [];
			for (j = 0; j < width; j++) {
				this.grid[i].push(0);
			}
		}
	}

	render(context) {
		let i, j;
		context.strokeStyle = '#f00';
		for (i = 0; i < this.grid.length; i++) {
			for (j = 0; j < this.grid[i].length; j++) {
				context.beginPath();
				context.rect(this.size * j, this.size * i, this.size, this.size);
				context.closePath();
				context.stroke();
			}
		}
	}
}
