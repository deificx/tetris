"use strict";

var canvas = document.getElementById('tetris');

document.body.style.margin = '0px';
document.body.style.height = window.innerHeight - 3 + 'px';

if (!canvas) {
	canvas = document.createElement('canvas');
	canvas.id = 'tetris';
	document.body.appendChild(canvas);
}

canvas.width = document.body.offsetWidth;
canvas.height = document.body.offsetHeight;

export default canvas;