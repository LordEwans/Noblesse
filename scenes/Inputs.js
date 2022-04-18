import eventsCentre from "../assets/events/EventCentre.js";
let up;
let div = document.getElementById('noblesse');
export default class Inputs extends Phaser.Scene {

	constructor() {
		super("Inputs");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	create() {
		//eventsCentre.on('hold-control', () => { this.input.keyboard.enabled = false, this.input.gamepad.enabled = false });
		//eventsCentre.on('play-control', () => { this.input.keyboard.enabled = true, this.input.gamepad.enabled = true });
		//this.input.keyboard.once('keydown', () => { this.scale.startFullscreen() });
		//this.input.gamepad.once('down', () => { this.scale.startFullscreen() });
		var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true);
		this.input.keyboard.on("keydown-TAB", () => {
			this.scale.toggleFullscreen();
		}, true);
		this.input.keyboard.on("keydown-BACKSPACE", () => {
			window.close();
		}, true);
		
		spaceBar.on('up', () => { console.log('Brave') });
		this.input.gamepad.once('connected', () => {
			if (this.input.gamepad.pad1.connected) {
				this.input.gamepad.pad1.isButtonDown(this.GamePad.UP);
				this.input.gamepad.pad1.isButtonDownOnce();
			}
		});

		/*if (Phaser.Scenes.Events.SHUTDOWN) {
			eventsCentre.destroy();
		}
		if (!Phaser.Scenes.Events.SHUTDOWN) {
			eventsCentre;
		}*/
	}

	update() {
		this.scale.setMaxZoom();
		div.style.height = window.innerHeight.toString() + 'px';
		div.style.width = window.innerWidth.toString() + 'px';
		if (this.input.keyboard.checkDown(this.input.keyboard.addKey(66))) {
			console.log('B')
		}
		//this.input.gamepad.pad1.isButtonDown();
		this.controllerBinds();
		this.keyBinds();
		this.keyBindings();
		this.keyOperations();
	}

	keyBinds() {
		this.KeyBoard = {
			A: Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A, true)),
			S: Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S, true)),
			X: Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X, true)),
			Z: Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z, true)),
			D: Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D, true)),
			C: Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C, true)),
			UP: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP, true),
			DOWN: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN, true),
			LEFT: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT, true),
			RIGHT: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT, true),
			SHIFT: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT, true),
			SPACE: Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true)),
			ENTER: Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER, true)),
			ALT: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT, true),
			TAB: Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB, true)),
		}
	}

	controllerBinds() {
		if (this.input.gamepad.total >= 1) {	
		this.GamePad = {
			UP: this.input.gamepad.pad1.isButtonDown(12),
			DOWN: this.input.gamepad.pad1.isButtonDown(13),
			LEFT: this.input.gamepad.pad1.isButtonDown(14),
			RIGHT: this.input.gamepad.pad1.isButtonDown(15),
			MENU: this.input.gamepad.pad1.isButtonDownOnce(16),
			A: this.input.gamepad.pad1.isButtonDownOnce(0),
			B: this.input.gamepad.pad1.isButtonDownOnce(1),
			X: this.input.gamepad.pad1.isButtonDownOnce(2),
			Y: this.input.gamepad.pad1.isButtonDownOnce(3),
			LB: this.input.gamepad.pad1.isButtonDownOnce(4),
			RB: this.input.gamepad.pad1.isButtonDownOnce(5),
			LT: this.input.gamepad.pad1.isButtonDownOnce(6),
			RT: this.input.gamepad.pad1.isButtonDownOnce(7),
			BACK: this.input.gamepad.pad1.isButtonDownOnce(8),
			START: this.input.gamepad.pad1.isButtonDownOnce(9),
			LS: 10,
			RS: 11,
			LEFT_STICK_H: 0,
			LEFT_STICK_V: 1,
			RIGHT_STICK_H: 2,
			RIGHT_STICK_V: 3
		}
		} else {
			this.GamePad = {
				UP: false,
				DOWN: false,
				LEFT: false,
				RIGHT: false,
				MENU: false,
				A: false,
				B: false,
				X: false,
				Y: false,
				LB: false,
				RB: false,
				LT: false,
				RT: false,
				BACK: false,
				START: false,
				LS: 10,
				RS: 11,
				LEFT_STICK_H: 0,
				LEFT_STICK_V: 1,
				RIGHT_STICK_H: 2,
				RIGHT_STICK_V: 3
			}
		}
	}

	keyOperations() {
		if (this.jump) {
			eventsCentre.emit('jump');
		}
		if (this.dash) {
			eventsCentre.emit('dash');
		}
		if (this.attack) {
			eventsCentre.emit('attack');
		}
		if (this.interact) {
			eventsCentre.emit('interact');
		}
		if (this.changeWeapon) {
			eventsCentre.emit('changeWeapon');
		}
		if (this.useObject) {
			eventsCentre.emit('useObject');
		}
		if (this.extra) {
			eventsCentre.emit('extra');
		} else if (this.removeExtra) {
			eventsCentre.emit('remove-extra');
		}
		if (this.aim) {
			eventsCentre.emit('aim');
		}
		if (this.start) {
			eventsCentre.emit('start');
		}
		if (this.up) {
			eventsCentre.emit('up');
		} else if (this.down) {
			eventsCentre.emit('down');
		} else if (this.left) {
			eventsCentre.emit('left');
		} else if (this.right) {
			eventsCentre.emit('right');
		}
		else {
			eventsCentre.emit('noCursor');
		}
	}

	controllerOperations() {

	}

	keyBindings() {
		this.jump = this.GamePad.Y || this.KeyBoard.Z || this.KeyBoard.SPACE,
		this.dash = this.GamePad.A || this.KeyBoard.A,
		this.attack = this.GamePad.X || this.KeyBoard.X,
		this.interact = this.GamePad.B || this.KeyBoard.S,
		this.changeWeapon = this.GamePad.LB || this.KeyBoard.C,
		this.useObject = this.GamePad.LT || this.KeyBoard.D,
		this.extra = this.GamePad.RB || this.KeyBoard.SHIFT.isDown,
		this.removeExtra = {
			keyboard: this.KeyBoard.SHIFT.isUp
		}
		this.aim = this.GamePad.RT || this.KeyBoard.ALT.isDown,
		this.start = this.GamePad.START || this.KeyBoard.ENTER,
		this.up = this.GamePad.UP || this.KeyBoard.UP.isDown,
		this.down = this.GamePad.DOWN || this.KeyBoard.DOWN.isDown,
		this.left = this.GamePad.LEFT || this.KeyBoard.LEFT.isDown,
		this.right = this.GamePad.RIGHT || this.KeyBoard.RIGHT.isDown,
		this.noCursor = {
			keyboard: this.KeyBoard.UP.isUp && this.KeyBoard.DOWN.isUp && this.KeyBoard.LEFT.isUp && this.KeyBoard.RIGHT.isUp,
		}
	}
	/*keyOperations() {
		this.input.keyboard.on(this.jump.keyboard, () => { eventsCentre.emit('jump') });
		this.input.gamepad.on(this.jump.gamepad, () => { eventsCentre.emit('jump') });

		this.input.keyboard.on(this.dash.keyboard, () => { eventsCentre.emit('dash') });
		this.input.gamepad.on(this.dash.gamepad, () => { eventsCentre.emit('dash') });

		this.input.keyboard.on(this.attack.keyboard, () => { eventsCentre.emit('attack') });
		this.input.gamepad.on(this.attack.gamepad, () => { eventsCentre.emit('attack') });

		this.input.keyboard.on(this.interact.keyboard, () => { eventsCentre.emit('interact') });
		this.input.gamepad.on(this.interact.gamepad, () => { eventsCentre.emit('interact') });

		this.input.keyboard.on(this.extra.keyboard, () => { eventsCentre.emit('extra') });
		this.input.gamepad.on(this.extra.gamepad, () => { eventsCentre.emit('extra') });

		this.input.keyboard.on(this.aim.keyboard, () => { eventsCentre.emit('aim') });
		this.input.gamepad.on(this.aim.gamepad, () => { eventsCentre.emit('aim') });

		this.input.keyboard.on(this.changeWeapon.keyboard, () => { eventsCentre.emit('changeWeapon') });
		this.input.gamepad.on(this.changeWeapon.gamepad, () => { eventsCentre.emit('changeWeapon') });

		this.input.keyboard.on(this.useObject.keyboard, () => { eventsCentre.emit('useObject') });
		this.input.gamepad.on(this.useObject.gamepad, () => { eventsCentre.emit('useObject') });
	}

	keyBinds() {
		this.jump = 'down-Y' || 'keydown-Z',
		this.dash = 'down-A' || 'keydown-A',
		this.attack = 'down-X' || 'keydown-X',
		this.interact = 'down-B' || 'keydown-S',
		this.changeWeapon = 'down-L1' || 'keydown-C',
		this.useObject = 'down-L2' || 'keydown-D',
		this.extra = 'down-R1' || 'keydown-Shift',
		this.aim = 'down-R2' || 'keydown-Alt',
	}*/
}