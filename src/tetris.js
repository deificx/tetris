"use strict";

import canvas from './html.js';
import controls from './controls';
import Grid from './Grid';
import Tetrimino from './Tetrimino';
import AnimationFrame from 'animation-frame';

const shapes = [
	'I',
	'J',
	'L',
	'O',
	'S',
	'T',
	'Z',
];

let options = {
	height: 20,
	size: 30,
	width: 10,
};
const grid = new Grid(options);
let pieces = [];
pieces.unshift(new Tetrimino(shapes[Math.floor(Math.random() * shapes.length)], options));

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
		pieces[0].update();
		if (grid.collision(pieces[0].getPosition())) {
			pieces.unshift(new Tetrimino(shapes[Math.floor(Math.random() * shapes.length)], options));
		}
	}
	grid.render(context);
	for (let i = pieces.length - 1; i >= 0; i--) {
		pieces[i].render(context);
	}
};

animationFrame.request(gameLoop);

controls.on('move', (direction) => {
	cooldown = 500;
	pieces[0].move(direction);
});

controls.on('rotate', () => {
	cooldown = 500;
	pieces[0].rotate();
});

controls.on('new_game', () => {
	pieces.unshift(new Tetrimino(shapes[Math.floor(Math.random() * shapes.length)], options));
});
