window.resizeTo(1296, 759);
/*
const initSqlJs = window.initSqlJs;
console.log(initSqlJs)

const SQL = await initSqlJs ({
	
})
var db = new SQL.DataBase()
console.log(db)
const jsonfile = globalThis.window.jsonfile;
console.log(jsonfile);
console.log(jsonfile.readFileSync('./jsconfig.json'))
console.log(fs.readFileSync('main.js', 'utf8'))

fs.mkdir('./data', { recursive: true }, (err, path) => {
	fs.writeFile('./data/data.json', '{ data: { id: 2 } }', 'utf8', () => {
		fs.readFile('./data/data.json', 'utf8', (err, data) => {
			console.log(data)
		})
	})
});
fs.writeFile('./require.js', 'class CONC {\n constructor() {\n\n}\n}', (err) => {
	if (err) throw err;
	console.log('The file has been saved!');
	fs.readFile('./require.js', 'utf-8', (err, data) => {
		console.log(data)
	});
  });
//const fs = require('fs');
/*const { createHmac } = await import('crypto');

const secret = 'abcdefg';
const hash = createHmac('sha256', secret)
			   .update('I love cupcakes')
			   .digest('hex');
console.log(hash);
//const fs = require('browserify-fs');
var indexDb = indexedDB.open('NoblesseData', 1);
indexDb.onupgradeneeded = () => {
	const db = indexDb.result;
	const store = db.createObjectStore('Noblesse', {keyPath: 'scene'});
	store.createIndex('sceneData', ['data'], {unique: false});
	store.createIndex('chars', ['chars'], {unique: false});
	store.createIndex('door', ['door'], {unique: false});
}
indexDb.onsuccess = () => {
	console.log(indexDb.result);
	const db = indexDb.result;
	const transaction = db.transaction('Noblesse', 'readwrite');
	const store = transaction.objectStore('Noblesse');
	store.put({scene: 'None', chars: 'Nothing Yet!'});
	const idquery = store.get('None');
	idquery.onsuccess = () => {
		console.log(idquery.result.chars)
	}
}*/
//window.resizeTo(656, 399);
import DialogueSystem from './lib/DialogueSystem.js'
import IsoPlugin, { IsoPhysics } from './lib/src/IsoPlugin.js';
import TitleScreen, { Menu, UI } from './scenes/TitleScreen.js';
import Reapers from './scenes/chapter-one/Reapers.js';
import Dialogue from './scenes/Dialogue.js';
import ReapersHouse from './scenes/chapter-one/ReapersHouse.js';
import Inputs from './scenes/Inputs.js';
import Misc from './scenes/Misc.js';
import Inskirts from './scenes/chapter-one/Inskirts.js';
let div = document.getElementById('noblesse');
div.style.height = window.innerHeight.toString() + 'px';
div.style.width = window.innerWidth.toString() + 'px';
console.log(window.innerWidth.toString() + 'x' + window.innerHeight.toString());
window.addEventListener('load', () => {
	let game = new Phaser.Game({
		width: 1280,
		height: 720,
		type: Phaser.WEBGL,
		title: 'Noblesse',
		version: '0.0.7',
		loader: {
			crossOrigin: 'anonymous'
		},
		backgroundColor: '#111119',
		render: {
			pixelArt: true,
		},
		scale: {
			parent: 'noblesse',
			mode: Phaser.Scale.NONE,
			autoCenter: Phaser.Scale.CENTER_BOTH,
			zoom: Phaser.Scale.MAX_ZOOM,
			fullscreenTarget: 'noblesse',
		},
		autoFocus: true,
		customEnvironment: true,
		scene: [Boot, Preload, Inputs, Reapers, ReapersHouse, Inskirts, TitleScreen, Dialogue, Menu, UI, Misc],
		input: {
			gamepad: true,
		},
		disableContextMenu: true,
		premultipliedAlpha: true,
		banner: {
			text: '#ffffff'
		},
		powerPreference: 'high-performance',
		fps: {
			smoothStep: true,
		},
		plugins: {
			scene: [
				{
					key: 'IsoPlugin',
					plugin: IsoPlugin,
					mapping: 'iso',
					sceneKey: 'iso',
					systemKey: 'iso',
					start: true
				},
				{
					key: 'DialogueSystem',
					plugin: DialogueSystem,
					mapping: 'dialogue',
					sceneKey: 'dialogue',
					start: false
				}
			]
		}
	});

});

class Boot extends Phaser.Scene {

	preload() {
		this.cam = this.cameras.main;
		this.cam.fadeIn(1000, 17, 17, 25);
		this.load.pack('pack', 'assets/preload-pack.json');
	}

	create() {
		this.input.keyboard.addCapture('ALT');
		this.input.keyboard.addCapture('CTRL,SHIFT,I');
		this.input.setDefaultCursor('none');
		this.input.on('pointerdown', () => {
			this.scale.toggleFullscreen()
		}, true);
	}

	update() {
		this.cam.fadeOut(1000, 17, 17, 25);
		this.scene.run('Inputs');
		this.scene.switch('Preload');
	}

}

class Preload extends Phaser.Scene {

	constructor() {
		super('Preload');
	}

	_preload() {
		this.load.pack('menu-pack', 'assets/menu.json');
	}

	_create() {
		this.cam = this.cameras.main;
		this.cam.roundPixels = false;
		this.logo = this.add.image(640, 360, 'phaser').setScale(0.5);
		this.logo.setInteractive();
		this.logo.on('pointerdown', () => {
			this.scale.startFullscreen();
		}, true);
		this.tweens.add({
			targets: this.logo,
			scaleX: 1,
			scaleY: 1,
			duration: 2250,
			ease: 'Quad.easeInOut',
			delay: 0,
			yoyo: true,
			repeat: null
		});
		this.input.on('pointerup', () => {
			this.scale.startFullscreen();
		}, true);
		this.input.gamepad.on('down', () => {
			this.scale.startFullscreen();
		}, true);
	}

	preload() {
		this._preload();
		this._create();
		this.cam.fadeIn(1000, 17, 17, 25);
		this.cam.roundPixels = false;
		this.time.addEvent({
			repeat: -1,
			delay: 2000,
			callback: () => {
				this.cam.fadeOut(1000, 17, 17, 25);
			}
		});
		this.load.on(Phaser.Loader.Events.COMPLETE, () => {
			this.time.addEvent({
				repeat: -1,
				delay: 3000,
				callback: () => {
					this.scene.start('TitleScreen');
				}
			});
		});
	}
}
