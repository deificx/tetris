"use strict";

import canvas from './html.js';
import Tetra from './tetra';
import AnimationFrame from 'animation-frame';

window.piece = new Tetra('I');

const context = canvas.getContext('2d');
const animationFrame = new AnimationFrame();
const gameLoop = () => {
	animationFrame.request(gameLoop);
	context.beginPath();
	context.rect(0, 0, canvas.width, canvas.height);
	context.fillStyle = '#ddd';
	context.fill();
	context.closePath();
	window.piece.render(context);
};

animationFrame.request(gameLoop);
