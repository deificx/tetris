"use strict";

let css = document.createElement('style');
css.innerHTML = 'a:link {color:#fff} a:visited {color:#ddd} a:hover {color:orange}';
document.head.appendChild(css);

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

let arrow = 'Use the arrow keys to control <br />';
let enter = 'Press Enter/Space to start a new game <br />';
let link = '<a href="https://deificx.github.io/">https://deificx.github.io/</a>';

let footer = document.createElement('p');
footer.style.color = '#ddd';
footer.style.fontFamily = 'sans-serif';
footer.style.textAlign = 'center';
footer.innerHTML = arrow + enter + link;

document.body.appendChild(footer);

export default canvas;
