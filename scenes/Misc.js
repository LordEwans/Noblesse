import eventsCentre from '../assets/events/EventCentre.js';
import DialogueSystem from "../lib/DialogueSystem.js";

export default class Misc extends Phaser.Scene {

	constructor() {
		const sceneConfig = {
			key: 'Misc',
			mapAdd: { dialogueSystem: 'dialogue' }
		};

		super(sceneConfig);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	preload() {
	}

	create() {
		this.text = this.add.text(1000, 600, '', { fontSize: 40, fontFamily: 'Bahnschrift Light' }).setOrigin(0.5, 0.5);
		this.text.alpha = 0;
		this.details = this.add.text(1000, 625, '', { fontFamily: 'Bahnschrift Light' }).setOrigin(0.5, 0.5);
		this.details.alpha = 0;
		//this.scene.run('UI');
		this.fps = this.add.text(1200, 10, '--' + ' FPS', { fontFamily: 'Bahnschrift Light' }).setOrigin(0, 0).setScrollFactor(0, 0);
		this.input.keyboard.on('keydown-F2', () => this.fps.setVisible(false));
		this.input.keyboard.on('keydown-F1', () => this.fps.setVisible(true));
		eventsCentre.on('Inskirts', () => {
			this.text.setText('The Inskirts');
			this.details.setText('Inside Of Crestle');
			this.tweens.add({
				targets: this.text,
				alpha: 1,
				duration: 3000,
				ease: 'Quad.easeInOut',
				delay: 0,
				yoyo: true
			})
			this.tweens.add({
				targets: this.details,
				alpha: 1,
				duration: 3500,
				ease: 'Quad.easeInOut',
				delay: 0,
				yoyo: true
			})
		});
	}

	update() {
		this.fps.text = `${Math.ceil(this.game.loop.actualFps)} FPS` || '-- FPS';
	}
}