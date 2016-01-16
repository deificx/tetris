"use strict";

import canvas from './html.js';
import Tetra from './tetra';
import AnimationFrame from 'animation-frame';

let pieces = [];

const context = canvas.getContext('2d');
const animationFrame = new AnimationFrame();
const gameLoop = () => {
	animationFrame.request(gameLoop);
	context.fillStyle = '#ddd';
	context.rect(0,0,canvas.width,canvas.height);
	context.fill();
};

animationFrame.request(gameLoop);
