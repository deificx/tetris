"use strict";

import canvas from './html.js';
import controls from './controls';
import Grid from './Grid';
import Tetrimino from './Tetrimino';
import AnimationFrame from 'animation-frame';

let options = {
	height: 20,
	size: 30,
	width: 10,
};
const grid = new Grid(options);

const newPiece = (piece) => {
	grid.setPiece(piece);
};

const onTest = (position, scenario) => {
	if (grid.collision(position.position)) {
		pieces[0].deny();
		if (scenario === 'update') {
			pieces[0].events.removeListener('piece', newPiece);
			pieces[0].events.removeListener('test', newPiece);
			pieces.unshift(new Tetrimino(options));
			pieces[0].events.on('piece', newPiece);
			pieces[0].events.on('test', onTest);
			pieces[0].init();
		}
	} else {
		pieces[0].accept();
	}
};

let pieces = [];
pieces.unshift(new Tetrimino(options));
pieces[0].events.on('piece', newPiece);
pieces[0].events.on('test', onTest);
pieces[0].init();

let cooldown = 500, timeout;
const update = () => {
	if (timeout) {
		clearTimeout(timeout);
		timeout = null;
	}
	pieces[0].update();
	timeout = setTimeout(update, cooldown);
};
update();

const context = canvas.getContext('2d');
const animationFrame = new AnimationFrame();
const gameLoop = () => {
	animationFrame.request(gameLoop);
	context.beginPath();
	context.rect(0, 0, canvas.width, canvas.height);
	context.fillStyle = '#ddd';
	context.fill();
	grid.render(context);
	for (let i = pieces.length - 1; i >= 0; i--) {
		pieces[i].render(context);
	}
};

animationFrame.request(gameLoop);

controls.on('move', (direction) => {
	if (timeout) {
		clearTimeout(timeout);
		timeout = null;
	}
	timeout = setTimeout(update, cooldown);
	pieces[0].move(direction);
});

controls.on('rotate', () => {
	if (timeout) {
		clearTimeout(timeout);
		timeout = null;
	}
	timeout = setTimeout(update, cooldown);
	pieces[0].rotate();
});

controls.on('new_game', () => {
	pieces[0].events.removeListener('piece', newPiece);
	pieces.unshift(new Tetrimino(options));
	pieces[0].events.on('piece', newPiece);
	pieces[0].init();
});
