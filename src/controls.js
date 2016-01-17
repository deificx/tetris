"use strict";

import EventEmitter from 'eventemitter3';
const events = new EventEmitter();

import keypress from '../lib/keypress'; // eslint-disable-line
const listener = new keypress.Listener();

listener.register_many([
	{
		keys: 'up',
		'on_keydown': () => { events.emit('rotate'); },
		'prevent_repeat': true,
	},
	{
		keys: 'right',
		'on_keydown': () => { events.emit('move', 'RIGHT'); },
		'prevent_repeat': true,
	},
	{
		keys: 'down',
		'on_keydown': () => { events.emit('move', 'DOWN'); },
		'prevent_repeat': true,
	},
	{
		keys: 'left',
		'on_keydown': () => { events.emit('move', 'LEFT'); },
		'prevent_repeat': true,
	},
	{
		keys: 'enter',
		'on_keydown': () => { events.emit('new_game'); },
		'prevent_repeat': true,
	},
	{
		keys: 'space',
		'on_keydown': () => { events.emit('new_game'); },
		'prevent_repeat': true,
	},
]);

export default events;
