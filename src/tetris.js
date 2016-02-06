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
let grid = new Grid(options);

const onPiece = (piece) => {
	grid.setPiece(piece);
};

const onPositions = (positions) => {
	grid.setPosition(positions);
};

const onTest = (position, scenario) => {
	if (grid.collision(position.positions)) {
		pieces[0].deny();
		if (scenario === 'update') {
			pieces[0].events.removeListener('piece', onPiece);
			pieces[0].events.removeListener('positions', onPositions);
			pieces[0].events.removeListener('test', onPiece);
			pieces.unshift(new Tetrimino(options));
			pieces[0].events.on('piece', onPiece);
			pieces[0].events.on('positions', onPositions);
			pieces[0].events.on('test', onTest);
			pieces[0].init();
		}
	} else {
		pieces[0].accept();
	}
};

let pieces = [];
pieces.unshift(new Tetrimino(options));
pieces[0].events.on('piece', onPiece);
pieces[0].events.on('positions', onPositions);
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
	if (timeout) {
		clearTimeout(timeout);
		timeout = null;
	}
	grid = new Grid(options);
	pieces = [];
	pieces.unshift(new Tetrimino(options));
	pieces[0].events.on('piece', onPiece);
	pieces[0].events.on('positions', onPositions);
	pieces[0].events.on('test', onTest);
	pieces[0].init();
	update();
});
