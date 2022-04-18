let anim;
import eventsCentre from "../assets/events/EventCentre.js";
// You can write more code here

import DialogueSystem from "../lib/DialogueSystem.js";

/* START OF COMPILED CODE */

export default class Dialogue extends Phaser.Scene {

	constructor() {
		const sceneConfig = {
			key: 'Dialogue',
			mapAdd: { dialogueSystem: 'dialogue' }
		};

		super(sceneConfig);
	}

	preload() {
		this.load.scenePlugin({
			key: 'DialogSystem',
			url: DialogueSystem,
			sceneKey: 'dialogue',
			systemKey: 'dialogue'
		});
	}

	create() {
		/*eventsCentre.on("start", () => {
			if (this.scene.systems.isPaused()) {
				this.scene.systems.resume();
				this.scene.sleep('Menu')
			}
			else {
				this.scene.systems.pause();
				this.scene.run('Menu')
			}
		}, true);*/
		if (this) {
			
		} else {
			
		}
		//let text = "Aruna: My father's been gone into the cave at the outskirts..."
		//if (text.match(':')) {console.log('DDD')}
		eventsCentre.on('anim-true', () => {
			anim = true;
		});
		eventsCentre.on('anim-false', () => {
			anim = false;
		});
		eventsCentre.addListener('reaper-talk', () => { this.ReapersRoom() }, this);
		eventsCentre.addListener('talk-to-mum', () => { this.TalkToMum() }, this);
		//this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
		//	eventsCentre.off('talk-to-mum', this.TalkToMum, this);
		//	eventsCentre.off('reaper-talk', this.ReapersRoom, this);
		//})
	}

	ReapersRoom() {
		let text;
		let name;
		let cont;
		//this.dialogue.init('Reaper', true);
		if (text == undefined) text = "Oh...It's morning!", cont = true, name = 'Reaper';
		this.dialogue._setText(name, text, cont, anim);//\n
		eventsCentre.on('next', () => {
			if (text == "Oh...It's morning!") text = "I guess it was just a dream.", cont = false;
			//else if (text == "I guess it was just a dream.");// text = "AAA, innit?", name = 'John';
			//else if (text == "AAA, innit?") text = "I guess?", cont = false, name = 'Reaper';
			this.dialogue._setText(name, text, cont, anim);
		});
	}

	TalkToMum() {
		let text;
		let name;
		let cont;
		//this.dialogue.init('Reaper', false);
		if (text === undefined || cont == undefined) text = "Wait! I haven't said goodbye to mum yet!", cont = false, name = 'Reaper';
		this.dialogue._setText(name, text, cont, anim);
	}

	/* END-USER-CODE */
}

const lit = () => {

}
/* END OF COMPILED CODE */

// You can write more code here
