"use strict";

document.body.style.backgroundColor = '#333';
document.body.style.margin = '0px';

let header = document.createElement('h1');
header.style.color = '#ddd';
header.style.fontFamily = 'sans-serif';
header.style.textAlign = 'center';
header.innerHTML = 'Tetris';
document.body.appendChild(header);

let canvas = document.getElementById('tetris');
if (!canvas) {
	canvas = document.createElement('canvas');
	canvas.id = 'tetris';
	document.body.appendChild(canvas);
}

export default canvas;
