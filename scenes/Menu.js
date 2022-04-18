import eventsCentre from '../assets/events/EventCentre.js';
let bg;
/* START OF COMPILED CODE */

export default class Menu extends Phaser.Scene {

	constructor() {
		super('Menu');

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	create() {
		bg = this.add.image(0, 0, 'pausebg').setOrigin(0, 0).setScrollFactor(0, 0);
		eventsCentre.addListener('start', () => {
			if (this.scene.systems.isActive()) {
				eventsCentre.emit('resume');
			}
		});
		const content = [
			"",
			"",
			"",
			"",
			"The sky above the port was the color of television, tuned to a dead channel.",
			"`It's not like I'm using,' Case heard someone say, as he shouldered his way ",
			"through the crowd around the door of the Chat. `It's like my body's developed",
			"this massive drug deficiency.' It was a Sprawl voice and a Sprawl joke.",
			"The Chatsubo was a bar for professional expatriates; you could drink there for",
			"a week and never hear two words in Japanese.",
			"",
			"Ratz was tending bar, his prosthetic arm jerking monotonously as he filled a tray",
			"of glasses with draft Kirin. He saw Case and smiled, his teeth a webwork of",
			"East European steel and brown decay. Case found a place at the bar, between the",
			"unlikely tan on one of Lonny Zone's whores and the crisp naval uniform of a tall",
			"African whose cheekbones were ridged with precise rows of tribal scars. `Wage was",
			"in here early, with two joeboys,' Ratz said, shoving a draft across the bar with",
			"his good hand. `Maybe some business with you, Case?'",
			"",
			"Case shrugged. The girl to his right giggled and nudged him.",
			"The bartender's smile widened. His ugliness was the stuff of legend. In an age of",
			"affordable beauty, there was something heraldic about his lack of it. The antique",
			"arm whined as he reached for another mug.",
			"",
			"",
			"From Neuromancer by William Gibson",
			"",
			"",
			"",
			"",
		];

		this.scroller = this.add.text(16, 719, content, { fontFamily: 'Bahnschrift Light' });
		//this.scroller.setSize(1024, 300);
	}

	update(time, delta) {
		this.cursor = this.input.keyboard.createCursorKeys();
		if (this.cursor.up.isDown) {
			this.scroller.y -= 0.3 * delta;
		} else if (this.cursor.down.isDown) {
			this.scroller.y += 0.3 * delta;
		}

		if (!this.cameras.main.cull([this.scroller]).includes(this.scroller) && this.scroller.y <= 10) {
			this.scroller.setOrigin(0, 0)
			this.scroller.x = 16;
			this.scroller.y = 719.99;
		} if (!this.cameras.main.cull([this.scroller]).includes(this.scroller) && this.scroller.y >= 720) {
			this.scroller.setOrigin(0, 1)
			this.scroller.x = 16;
			this.scroller.y = 0;
		} else {
			this.scroller.y -= 0.03 * delta;
		}
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
