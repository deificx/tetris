"use strict";

import canvas from './html.js';
import Tetrimino from './Tetrimino';
import AnimationFrame from 'animation-frame';

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
	context.closePath();
	if (cooldown < 0) {
		cooldown = 300;
		window.piece.update();
	}
	window.piece.render(context);
};

animationFrame.request(gameLoop);
