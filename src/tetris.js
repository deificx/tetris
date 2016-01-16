"use strict";

import Tetra from './tetra';
import AnimationFrame from 'animation-frame';

let pieces = [];

const animationFrame = new AnimationFrame();
const gameLoop = () => {
	animationFrame.request(gameLoop);
};

animationFrame.request(gameLoop);
