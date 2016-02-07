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
	sidebar: 100,
};

canvas.width = options.width * options.size + options.sidebar;
canvas.height = options.height * options.size;
canvas.style.marginLeft = Math.round(window.innerWidth / 2 - canvas.width / 2) + 'px';

const context = canvas.getContext('2d');
const animationFrame = new AnimationFrame();

let cooldown,
	frameId,
	grid,
	padding = 25,
	pieces = [],
	points,
	timeout;

const gameLoop = () => {
	frameId = animationFrame.request(gameLoop);
	context.beginPath();
	context.rect(0, 0, canvas.width - options.sidebar, canvas.height);
	context.fillStyle = '#000';
	context.fill();
	context.beginPath();
	context.rect(canvas.width - options.sidebar, 0, options.sidebar, canvas.height);
	context.fillStyle = '#222';
	context.fill();
	context.beginPath();
	context.font = "16px sans-serif";
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	context.fillStyle = '#ddd';
	context.fillText('points', canvas.width - options.sidebar + options.sidebar / 2, padding);
	context.fillText(points, canvas.width - options.sidebar + options.sidebar / 2, padding * 2);
	grid.render(context);
};

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

const onScore = (lines) => {
	points += lines * lines;
};

const onEnd = () => {
	let boxHeight = 60;
	if (frameId) {
		animationFrame.cancel(frameId);
		frameId = null;
	}
	context.beginPath();
	context.rect(0, canvas.height / 2 - boxHeight / 2, canvas.width - options.sidebar, boxHeight);
	context.fillStyle = 'rgba(255,255,255,0.5)';
	context.fill();

	context.beginPath();
	context.font = "48px sans-serif";
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	context.fillStyle = '#f00';
	context.fillText("Game over", ( canvas.width - options.sidebar ) / 2, canvas.height / 2);
};

const update = () => {
	if (timeout) {
		clearTimeout(timeout);
		timeout = null;
	}
	pieces[0].update();
	timeout = setTimeout(update, cooldown);
};

const init = () => {
	if (frameId) {
		animationFrame.cancel(frameId);
		frameId = null;
	}

	if (timeout) {
		clearTimeout(timeout);
		timeout = null;
	}

	cooldown = 500;
	points = 0;

	if (grid) {
		grid.events.removeListener('score', onScore);
		grid.events.removeListener('end', onEnd);
	}
	grid = new Grid(options);
	grid.events.on('score', onScore);
	grid.events.on('end', onEnd);

	if (pieces[0]) {
		pieces[0].events.removeListener('piece', onPiece);
		pieces[0].events.removeListener('positions', onPositions);
		pieces[0].events.removeListener('test', onPiece);
		pieces = [];
	}
	pieces.unshift(new Tetrimino(options));
	pieces[0].events.on('piece', onPiece);
	pieces[0].events.on('positions', onPositions);
	pieces[0].events.on('test', onTest);
	pieces[0].init();

	frameId = animationFrame.request(gameLoop);
	update();
};

init();

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
	init();
});
