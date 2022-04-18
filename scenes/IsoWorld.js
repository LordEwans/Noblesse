import IsoPlugin, { IsoPhysics } from '../lib/src/IsoPlugin.js';
import ReaperSprite from '../assets/prefabs/Reaper.js';
export let cube;
export let cube2;
export let cube3;
export let cube4;
export let cube5;
export let stairs;
export let tile;
export let life = 5;
export let talk = false, map = [];

export default class IsoWorld extends Phaser.Scene {
  constructor() {
    const sceneConfig = {
      key: 'IsoWorld',
      mapAdd: { isoPlugin: 'iso', isoPhysics: 'isoPhysics', dialogModal: 'dialogue' }
    };

    super(sceneConfig);
  }

  preload() {
    this.load.scenePlugin({
      key: 'IsoPlugin',
      url: IsoPlugin,
      sceneKey: 'iso',
      systemKey: 'iso'
    });

    this.load.scenePlugin({
      key: 'IsoPhysics',
      url: IsoPhysics,
      sceneKey: 'isoPhysics',
      systemKey: 'isoPhysics'
    });
  }

  create() {
    this.isoWorld();
    this.initGroups();
    this.initCamera();
    this.initSystems();
    this.initUI();
    
    this.Reaper = new ReaperSprite(this, 40, 40, 4, this.isoGroup, this.isoLayer, this.camera);
    this.add.existing(this.Reaper);
    cube = this.Reaper.Reaper;
    
    this.charGroup = this.add.group([cube, cube4]);
    this.swimmer = [cube, cube4];
    this.isoObjects = [cube, cube2, cube3, cube4, cube5];
    this.isoPhysics.world.enable(this.swimmer);
    this.isoPhysics.world.enable(this.enemies);
  }

  update() {
    map.forEach(m => {
      m.body.position.z = -m.body.position.y;
      m.body.z += 252;
    })

    if (cube.body.enable) {
      console.log("Enabled");
    } else {
      console.log("Disabled")
    }
    console.log(life);
    this.initCollider();
    this.initSort();
    this.initBehaviour();
    this.Reaper.update();
    //this.events.emit("scene-awake");
    if (this.game.device.os.crosswalk) {
      console.log("true");
    }
  }

  initSystems() {
    this.isoPhysics.world.gravity.setTo(0, 0, -500);
    this.isoPhysics.world.bounds.setTo(0, 0, 0, 512, 512, 1024);
    this.isoPhysics.world.checkCollision.frontX = false;
    this.isoPhysics.world.checkCollision.frontY = false;
    this.isoPhysics.world.checkCollision.backX = true;
    this.isoPhysics.world.checkCollision.backY = true;
    this.iso.projector.origin.setTo(0.5, 0.3);
  }

  initBehaviour() {
    cube3.body.rotation = 0;
    //this.point1 = cube.body.position.x;
    //this.point2 = cube.body.position.y;
    //this.point3 = cube.body.position.z;
    //this.isoPhysics.moveToXYZ(cube4, this.point1, this.point2, 0, 60, 1000);
    this.isoPhysics.moveToObjectXY(cube4, cube, 60, 1500);
    new ControlSprite(cube);
  }

  initUI() {
    this.scene.launch("UI");
    this.input.keyboard.on("keydown-ENTER", () => {
      if (this.scene.isActive("IsoWorld")) {
        this.scene.run("Pause");
        this.scene.pause("UI");
        this.scene.pause("IsoWorld");
      }
    }, true);
    this.input.keyboard.on("keydown-TAB", () => {
      this.scale.toggleFullscreen();
    }, true);

    this.input.keyboard.on("keydown-BACKSPACE", () => {
      window.close();
    }, true);
  }

  isoWorld() {
    this.isoGroup = this.add.group();
    this.stairGroup = this.add.group();
    this.isoLayer = this.add.layer();

    /*cube = this.add.isoSprite(40, 40, 0, 'tileset', this.isoGroup, 'tilesetbasic5.png');
    this.isoPhysics.world.enable(cube);
    cube.body.setSize(18, 18, 32);
    new IsoBody(cube);
    cube.body.facing = 3;*/


    for (var xx = 0; xx < 256; xx += 8) {
      stairs = this.add.isoSprite(40, xx, 240, 'stairs2', this.stairGroup);
      //stairs.isoZ = xx;
      this.stairs = [stairs]
      this.isoPhysics.world.enable(this.stairs);
      new PlatformBody(stairs);
      stairs.body.allowGravity = false;
      map.push(stairs);
      this.tweens.add({
        targets: stairs.body.velocity,
        //z: -xx,
        duration: 1000,
        ease: 'Quad.easeInOut',
        delay: 0,
        yoyo: true,
        repeat: null,
      });
      stairs.body.position.x = 20;
      this.isoLayer.add(stairs);
      //stairs.body.customSeparateY = true;
      //stairs.body.customSeparateZ = true;
    }

    //for (var xx = 0; xx < 512; xx += 35.75) {
    for (var yy = 0; yy < 512; yy += 35.75) {
      tile = this.add.isoSprite(0, yy, -20, 'tileset', this.isoGroup, 'tilesetbasic.png');
      this.isoPhysics.world.enable(tile);
      new PlatformBody(tile)
      this.isoLayer.add(tile);
    }
    //}

    cube2 = this.add.isoSprite(40, 40, 95, 'tileset', this.isoGroup, 'tilesetbasic2.png');
    this.isoPhysics.world.enable(cube2);
    new PlatformBody(cube2);
    cube2.body.allowGravity = false;

    cube3 = this.add.isoSprite(80, 40, 4, 'tileset', this.isoGroup, 'tilesetbasic.png');
    this.isoPhysics.world.enable(cube3);
    new MovingPlatformUp(cube3);
    cube3.body.allowGravity = false;

    // Send the cubes off in random x and y directions! Wheee!
    //const randomX = Math.trunc((Math.random() * 100 - 50));
    //const randomY = Math.trunc((Math.random() * 100 - 50));
    //cube.body.velocity.setTo(randomX, randomY, 0);

    cube4 = this.add.isoSprite(150, 150, 0, 'tileset', this.isoGroup, 'tilesetbasic6.png');

    cube5 = this.add.isoSprite(80, 80, 10, 'tileset', this.waterGroup, 'tilesetbasic1.png');
    this.isoPhysics.world.enable(cube5);
    cube5.setTint(0xa1effc).alpha = 0.90;
    new IsoBody(cube5);
  }

  initCamera() {
    this.camera = this.cameras.main;
    this.camera.fadeIn(2500, 17, 17, 21);
    //this.camera.startFollow(cube, true, 1, 1, 0, 0);
    //this.camera.setBackgroundColor("#111115");
    this.camera.setZoom(1);
  }

  initGroups() {
    this.waterGroup = this.add.group();
    this.isoLayer.add([cube2, cube3, cube4, cube5]);
    this.enemyGroup = this.add.group([cube4]);

    //this.dialog();
    this.graphics = this.add.graphics();
    this.enemies = [cube4];

    new IsoBody(cube4);
    this.graphics.lineStyle(1, 0x509dc0, 1.0);
    //cube.body.setSize()
  }

  initCollider() {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.isUp = false;
    if (this.cursors.up.isDown) {
      this.isUp = true;
    }
    this.isoPhysics.world.overlap(cube, this.enemies, this.checkAgainstEnemies, null, true);
    this.isoPhysics.world.overlap(cube5, this.swimmer, this.float, null, true);
    this.isoPhysics.world.collideSpriteVsGroup(cube, this.stairGroup, (obj1, obj2) => {
      console.log(true);
      if (obj1.body.velocity.y < 0 || this.isUp) {
        obj1.body.velocity.z = 100;
      }
    }, null, true);
    this.isoPhysics.world.overlap(cube, this.isoObjects);
    //this.isoPhysics.world.collideSpriteVsGroup(cube, this.isoGroup, () => { }, null, true, false);
    this.isoPhysics.world.collideGroupVsGroup(this.isoGroup, this.stairGroup, () => {
      cube.body.allowGravity = false;
    }, null, true, false);
    this.isoPhysics.world.collideGroupVsSelf(this.isoGroup);
  }

  initSort() {
    this.isoLayer.setName('SortPanel');
    this.isoPhysics.projector.topologicalSort(this.isoLayer, 1);
    //stairs.body.debugRender(this.graphics, 0xffffff, false);
  }

  dialog() {
    this.dialogue.init();
    this.dialogue.setText('Hello there, welcome to the initial prototype for Noblesse. I guess this is just few of the basic mechanics, and just the beginning. I am still to add more coming on the way and definitely, better art work. Thank you!', true);
  }

  checkAgainstEnemies(obj1, obj2) {
    if (obj1.body.position.z > obj2.body.halfHeight) {
      new DestroyIsoSprite(obj2);
      obj1.body.velocity.z = 400;
      obj1.body.velocity.x = obj1.body.prev.x;
      obj1.body.velocity.y = obj1.body.prev.y;
    } else {
      life--;
      if (obj2.body.facing == 2) {
        obj1.body.position.x += 50;
      }
      if (obj2.body.facing == 4) {
        obj1.body.position.x -= 50;
      }
      if (obj2.body.facing == 3) {
        obj1.body.position.y += 50;
      }
      if (obj2.body.facing == 5) {
        obj1.body.position.y -= 50;
      }
    }
    if (life < 1) {
      new DestroyIsoSprite(obj1);
    }
  }

  float(obj1, obj2) {
    obj2.body.position.z = obj1.body.halfHeight;
  }
}