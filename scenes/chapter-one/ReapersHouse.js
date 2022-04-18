import eventsCentre from '../../assets/events/EventCentre.js';
import IsoPlugin, { IsoPhysics } from '../../lib/src/IsoPlugin.js';
import characterController from '../../assets/behaviours/characterController.js';
import ReaperSprite from '../../assets/prefabs/Reaper.js';
import tilesetBasic from '../../assets/tilestypes/tilesetBasic.js';
import DialogueSystem from '../../lib/DialogueSystem.js';
let a = 1.1171875;

let tileArray = [];
tileArray[0] = 'tilesetbasic3.png';
tileArray[1] = 'tilesetbasic3.png';
tileArray[2] = 'tilesetbasic1.png';
tileArray[3] = 'tilesetbasic2.png';
tileArray[4] = 'tilesetbasic4.png';
tileArray[5] = 'tilesetbasic5.png';
tileArray[6] = 'tilesetbasic6.png';
tileArray[7] = 'tilesetbasic7.png';
tileArray[8] = 'tilesetbasic8.png';
tileArray[9] = 'tilesetbasic9.png';

let size = 35.75;
let i = 0;
let layer1, layer2, layer3, layer4, layer5, layer6, layer7, layer8, layer9, layer10, map = [], water = [];
let Reaper, Door, Door2, Door3, stairs, stairs2, doorFrom;
export default class ReapersHouse extends Phaser.Scene {
  constructor() {
    const sceneConfig = {
      key: 'ReapersHouse',
      mapAdd: { isoPlugin: 'iso', isoPhysics: 'isoPhysics' }
    };

    super(sceneConfig);
  }

  init(data) {
    doorFrom = data.door;
  }

  preload() {
    this.load.scenePlugin({
      key: 'IsoPhysics',
      url: IsoPhysics,
      sceneKey: 'isoPhysics',
      systemKey: 'isoPhysics'
    });
  }

  initSystems() {
    this.isoPhysics.world.gravity.setTo(0, 0, -500);
    this.isoPhysics.world.bounds.setTo(0, 0, 0, 572, 572, 264);
    this.isoPhysics.world.checkCollision.frontX = true;
    this.isoPhysics.world.checkCollision.frontY = true;
    this.isoPhysics.world.checkCollision.backX = true;
    this.isoPhysics.world.checkCollision.backY = true;
    this.isoPhysics.world.skipTree = true;
    this.iso.projector.origin.setTo(0.5, 0.5);
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0x509dc0, 1.0);
  }

  isoWorld() {
    //eventsCentre.on('minus-life', () => { this.camera.shake(200, 0.005) });
    Reaper = new ReaperSprite(this, 508.5, 2, 136, this.charactersGroup, this.isoLayer, this.camera);
    this.add.existing(Reaper);
    Reaper.body.facing = 3;

    Door = this.add.isoSprite(500.5, -35.75, 132, 'door2', this.doorsGroup).setVisible(false);
    this.isoPhysics.world.enable(Door);
    Door.body.collideWorldBounds = true;
    Door.body.immovable = true;
    Door.body.allowGravity = false;
    Door.body.setSize(35.75, 1, 4, 0, 35.75, 0);

    Door2 = this.add.isoSprite(536.25, 35.75, 4, 'door', this.doorsGroup, 1);
    this.isoPhysics.world.enable(Door2);
    Door2.body.setSize(1, 35.75, 91, 35.75);
    Door2.body.collideWorldBounds = true;
    Door2.body.immovable = true;
    Door2.body.allowGravity = false;
    this.isoLayer.add(Door2)
    //this.children.swap(this.isoLayer, this.graphics);

    for (var yy = 0; yy < 128; yy += 8) {
      stairs = this.add.isoSprite(536.25, 0, yy, 'stairs2', this.stairsGroup);
      stairs.isoZ += 4;
      this.stairs = [stairs];
      this.isoPhysics.world.enable(this.stairs);
      stairs.body.collideWorldBounds = true;
      stairs.body.immovable = true;
      stairs.body.allowGravity = false;
      stairs.body.setSize(35.75, 35.75, 8, 0, 0, 0);
      map.push(stairs);
      this.isoLayer.add(stairs);

      stairs2 = this.add.isoSprite(500.5, 0, yy, 'stairs2', this.stairsGroup);
      stairs2.isoZ += 4;
      this.stairs2 = [stairs2];
      this.isoPhysics.world.enable(this.stairs2);
      stairs2.body.collideWorldBounds = true;
      stairs2.body.immovable = true;
      stairs2.body.allowGravity = false;
      stairs2.body.setSize(35.75, 35.75, 8, 0, 0, 0);
      map.push(stairs2);
      this.isoLayer.add(stairs2);
    }


    map.forEach((m) => {
      m.isoY = -(m.isoZ * 1.1171875);
      m.isoY += 182.75;
      //m.body.debugRender(this.graphics, 0xffffff, false);
    });

    let tiles1 = [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ];

    let tiles2 = [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    let walls1 = [
      2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    let walls2 = [
      2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 6,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    for (var y = 0; y <= this.isoPhysics.world.bounds.frontY - size; y += size) {
      for (var x = 0; x <= this.isoPhysics.world.bounds.frontX - size; x += size) {
        layer1 = new tilesetBasic(this, x, y, 0, 'tilesetbasic', this.objsGroup, tileArray[tiles1[i]], this.isoLayer, tiles1[i]);
        layer2 = new tilesetBasic(this, x, y, 132, 'tilesetbasic', this.objsGroup, tileArray[tiles2[i]], this.isoLayer, tiles2[i]);
        layer3 = new tilesetBasic(this, x, y, 4, 'tilesetbasic', this.objsGroup, tileArray[walls1[i]], this.isoLayer, walls1[i]);
        layer4 = new tilesetBasic(this, x, y, 36, 'tilesetbasic', this.objsGroup, tileArray[walls1[i]], this.isoLayer, walls1[i]);
        layer5 = new tilesetBasic(this, x, y, 68, 'tilesetbasic', this.objsGroup, tileArray[walls1[i]], this.isoLayer, walls1[i]);
        layer6 = new tilesetBasic(this, x, y, 100, 'tilesetbasic', this.objsGroup, tileArray[walls1[i]], this.isoLayer, walls1[i]);
        layer7 = new tilesetBasic(this, x, y, 136, 'tilesetbasic', this.objsGroup, tileArray[walls2[i]], this.isoLayer, walls2[i]);
        layer8 = new tilesetBasic(this, x, y, 168, 'tilesetbasic', this.objsGroup, tileArray[walls2[i]], this.isoLayer, walls2[i]);
        layer9 = new tilesetBasic(this, x, y, 200, 'tilesetbasic', this.objsGroup, tileArray[walls2[i]], this.isoLayer, walls2[i]);
        layer10 = new tilesetBasic(this, x, y, 232, 'tilesetbasic', this.objsGroup, tileArray[walls1[i]], this.isoLayer, walls1[i]);
        i++;
      }
    }
  }

  initUI() {
  }

  initGroups() {
    this.charactersGroup = this.add.group();
    this.doorsGroup = this.add.group();
    this.objsGroup = this.add.group();
    this.stairsGroup = this.add.group();
    this.isoLayer = this.add.layer();
  }

  initCamera() {
    this.camera = this.cameras.main;
    this.camera.fadeIn(2500, 17, 17, 25);
    this.camera.setZoom(1);
    //this.camera.setBounds(0, 80, 1280, 800);
  }

  create() {
    this.initUI();
    this.initSystems();
    this.initGroups();
    this.initCamera();
    this.isoWorld();
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      i = 0;
    });
    this.groupCull = this.add.group()
      .addMultiple(this.objsGroup.getChildren())
      .addMultiple(this.charactersGroup.getChildren())
      .addMultiple(this.stairsGroup.getChildren());
    if (doorFrom == 'ReapersToHouse') {
      Reaper.isoX = 508.5;
      Reaper.isoY = 2;
      Reaper.isoZ = 136;
      Reaper.body.facing = 3;
    } else if (doorFrom == 'InskirtsToHouse') {
      Reaper.isoX = 550.25;
      Reaper.isoY = 53.625;
      Reaper.isoZ = 4;
      Reaper.body.facing = 4;
    }
    this.input.keyboard.on('keydown-S', () => {
    });
    console.log(this.camera.cull(this.isoLayer.getChildren()))
  }

  initSort() {
    this.culled = this.camera.cull(this.groupCull.getChildren());
    this.isoLayer.setName('SortPanel');
    this.isoPhysics.projector.topologicalSort(this.culled);
    this.groupCull.getChildren().forEach((child) => {
      if (this.culled.includes(child)) {
        if (!this.isoLayer.getChildren().includes(child)) {
          child.addToDisplayList(this.isoLayer)
        }
      } else {
        child.removeFromDisplayList();
      }
    })
  }

  initCollider() {
    this.isoPhysics.world.collide(Door, Reaper, (a, b) => {
      b.body.position.y += 10;
      this.scene.start('Reapers', { door: 'HouseToReapers' });
      i = 0;
    });
    this.isoPhysics.world.collide(Door2, Reaper, (a, b) => {
      //this.scene.switch('Inskirts');
    });
    this.isoPhysics.world.collide(Reaper, this.stairsGroup, (obj1, obj2) => {
      console.log(true);
      if (this.cursors.up.isDown) {
        obj1.body.velocity.z = 100;
      }
    }, null, true);

    this.isoPhysics.world.collide(this.charactersGroup);
    this.isoPhysics.world.collide(this.charactersGroup, this.objsGroup);
  }

  update() {
    let game = this.game;
    this.cursors = this.input.keyboard.createCursorKeys()
    this.isUp = false;
    if (this.cursors.up.isDown) {
      this.isUp = true;
    }
    this.initSort();
    this.initCollider();
    Reaper.update(this);
    if (Reaper.characterController.interact) {
      //console.log('Dialogue Starting.....');
      if (this.isoPhysics.distanceBetween(Reaper, Door2) < 50) {
        //eventsCentre.emit('talk-to-mum');
        this.scene.start('Inskirts');
        i = 0;
      } else {
        this.dialogue.setText(this.cache.json.get('Dialogue(Chapter1)').ReapersHome1, true);
      }
    }
    let padding = 1.5;
    this.stairsGroup.getChildren().forEach(children => {
      let a = children;
      let b = Reaper;
      let bounds = a.body || a.isoBounds;
      if (b._isoPosition.x + padding < bounds.frontX - padding && b._isoPosition.y + padding < bounds.frontY - padding && b._isoPosition.z + padding < bounds.top - padding) {
        a.setAlpha(0.85);
      } else {
        a.setAlpha(1)
      }
    });
  }
}