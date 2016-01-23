"use strict";

import canvas from './html.js';
import controls from './controls';
import Grid from './Grid';
import Tetrimino from './Tetrimino';
import AnimationFrame from 'animation-frame';

window.options = {
	height: 20,
	size: 30,
	width: 12,
};
window.grid = new Grid(window.options);
window.piece = new Tetrimino('I', window.options);

let cooldown = 500, dt, now, time;

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
		cooldown = 500;
		window.piece.update();
	}
	window.grid.render(context);
	window.piece.render(context);
};

animationFrame.request(gameLoop);

controls.on('move', (direction) => {
	cooldown = 500;
	window.piece.move(direction);
});

controls.on('rotate', () => {
	cooldown = 500;
	window.piece.rotate();
});

controls.on('new_game', () => {
	let pieces = [
		'I',
		'J',
		'L',
		'O',
		'S',
		'T',
		'Z',
	];
	window.piece = new Tetrimino(pieces[Math.floor(Math.random() * pieces.length)], window.options);
});
