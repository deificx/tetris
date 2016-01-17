"use strict";

import canvas from './html.js';
import Grid from './Grid';
import Tetrimino from './Tetrimino';
import AnimationFrame from 'animation-frame';

window.grid = new Grid(10, 20);
window.piece = new Tetrimino('I');

let cooldown = 300, dt, now, time;

const context = canvas.getContext('2d');
const animationFrame = new AnimationFrame();
const gameLoop = () => {
	now = new Date().getTime();
	dt = now - (time || now);
	time = now;
	cooldown -= dt;

	animationFrame.request(gameLoop);
	context.beginPath();
	context.rect(0, 0, canvas.width, canvas.height);
	context.fillStyle = '#ddd';
	context.fill();
	if (cooldown < 0) {
		cooldown = 300;
		window.piece.update();
	}
	window.grid.render(context);
	window.piece.render(context);
};

animationFrame.request(gameLoop);
