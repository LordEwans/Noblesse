import eventsCentre from '../../assets/events/EventCentre.js';
import IsoPlugin, { IsoPhysics } from '../../lib/src/IsoPlugin.js';
import characterController from '../../assets/behaviours/characterController.js';
import ReaperSprite from '../../assets/prefabs/Reaper.js';
import tilesetBasic from '../../assets/tilestypes/tilesetBasic.js';
import DialogueSystem from '../../lib/DialogueSystem.js';
import { Cube } from '../../assets/prefabs/ObjectTypes.js';
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
tileArray[10] = 'tilesetbasic1.png';

let size = 35.75;
let i = 0;
let layer1, layer2, layer3, layer4, layer5, Slope;
let Reaper, Door, WallNE = [], doorFrom;
export default class Reapers extends Phaser.Scene {
  constructor() {
    const sceneConfig = {
      key: 'Reapers',
      mapAdd: { isoPlugin: 'iso', isoPhysics: 'isoPhysics' }
    };

    super(sceneConfig);
  }

  init(data) {
    doorFrom = data.door;
  }

  preload() {
    this.audio = this.sound.add('Discovery', {
      loop: true
    });

    this.load.scenePlugin({
      key: 'IsoPhysics',
      url: IsoPhysics,
      sceneKey: 'isoPhysics',
      systemKey: 'isoPhysics'
    });
  }

  initSystems() {
    this.isoPhysics.world.gravity.setTo(0, 0, -500);
    this.isoPhysics.world.bounds.setTo(0, 0, 0, 500.5, 393.25, 132);
    this.isoPhysics.world.checkCollision.frontX = true;
    this.isoPhysics.world.checkCollision.frontY = true;
    this.isoPhysics.world.checkCollision.backX = true;
    this.isoPhysics.world.checkCollision.backY = true;
    this.isoPhysics.world.skipTree = true;
    this.iso.projector.origin.setTo(0.5, 0.5);
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0x509dc0, 1.0);
  }

  initUI() {
    this.scene.launch("Dialogue");
  }

  isoWorld() {
    console.log(this.cache.json.get('Dialogue(Chapter1)').ReapersRoom)
    this.sys.settings.transitionAllowInput = false;
    //this.audio.play();
    Reaper = new ReaperSprite(this, this.isoPhysics.world.bounds.frontX / 2, 40, 4, this.charactersGroup, this.isoLayer, this.camera);
    this.add.existing(Reaper);
    Reaper.body.facing = 2;
    console.log(JSON.parse(JSON.stringify(Reaper)));
    console.log(Reaper);

    /*Slope = this.add.isoSprite(200, 100, 4, 'stair', this.charactersGroup);
    this.isoPhysics.world.enable(Slope);
    Slope.body.customSeparateX = true;
    Slope.body.customSeparateZ = true;
    Slope.body.collideWorldBounds = true;
    Slope.body.immovable = true;
    Slope.body.allowGravity = false;
    this.isoLayer.add(Slope);
    Slope.body.setSize(35.75, 35.75, 32);*/

    Door = this.add.isoSprite(429, 357.5, 0, 'tilesetbasic', this.doorsGroup, 'tilesetbasic3.png');
    this.isoPhysics.world.enable(Door);
    Door.body.collideWorldBounds = true;
    Door.body.immovable = true;
    Door.body.allowGravity = false;
    Door.body.setSize(20.109, 20.109, 4, 0, 0, 0);
    Door.visible = false;

    let tiles1 = [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 1, 10
    ];

    let tiles2 = [
      2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
      4, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 8,
      4, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 10
    ];

    let tiles3 = [
      2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 10
    ];
    var ap = this.make.tilemap({ key: 'map' }).createLayer('Tile Layer 1');

    for (let mx = 0; mx < 14; mx++) {
      for (let my = 0; my < 10; my++) {
        this.ap = ap.getTileAt(mx, my, true).index;
        console.log([this.ap])
      }
    }
    this.add.text(0, 0, '')
    console.log(ap)
    console.log(ap.getTilesWithin(0, 0));


    for (var y = 0; y <= this.isoPhysics.world.bounds.frontY - size; y += size) {
      for (var x = 0; x <= this.isoPhysics.world.bounds.frontX - size; x += size) {
        layer1 = new tilesetBasic(this, x, y, 0, 'tilesetbasic', this.objsGroup, tileArray[tiles1[i]], this.isoLayer, tiles1[i]);
        layer2 = new tilesetBasic(this, x, y, 4, 'tilesetbasic', this.objsGroup, tileArray[tiles2[i]], this.isoLayer, tiles2[i]);
        layer3 = new tilesetBasic(this, x, y, 36, 'tilesetbasic', this.objsGroup, tileArray[tiles3[i]], this.isoLayer, tiles3[i]);
        layer4 = new tilesetBasic(this, x, y, 68, 'tilesetbasic', this.objsGroup, tileArray[tiles3[i]], this.isoLayer, tiles3[i]);
        layer5 = new tilesetBasic(this, x, y, 100, 'tilesetbasic', this.objsGroup, tileArray[tiles3[i]], this.isoLayer, tiles3[i]);
        i++;
      }
    }
  }

  initGroups() {
    this.charactersGroup = this.add.group();
    this.doorsGroup = this.add.group();
    this.objsGroup = this.add.group();
    this.isoLayer = this.add.layer();
    this.stairLayer = this.add.layer();
    this.isoPhysics.world.enable(WallNE);
  }

  initCamera() {
    this.camera = this.cameras.main;
    this.camera.fadeIn(2500, 17, 17, 25);
    this.camera.setZoom(1);
    //this.camera.setBounds(0, 72, 1280, 720);
  }

  initDoor() {
    if (doorFrom == 'HouseToReapers') {
      Reaper.isoX = 429;
      Reaper.isoY = 330;
      Reaper.isoZ = 4;
      Reaper.body.facing = 5;
    }
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
      .addMultiple(this.charactersGroup.getChildren());
    console.log(doorFrom);
    this.initDoor();
    this.i = this.add.text(50, 50);
    this.j = this.add.text(50, 100);

    this.time.addEvent({
      repeat: 0,
      delay: 1,
      callback: () => {
        this.dialogue.setText(this.cache.json.get('Dialogue(Chapter1)').ReapersRoom, true);
        //eventsCentre.emit('reaper-talk');
        this.renderer.snapshot();
        this.renderer.snapshotState = {
          x: 0,
          y: 0,
          width: 1280,
          height: 720,
          type: 'image/png',
          callback: () => {
            console.log('Yeah')
          }
        }
      }
    });
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
      b.body.position.y -= 10;
      this.scene.start('ReapersHouse', { door: 'ReapersToHouse' });
      i = 0;
    });

    this.isoPhysics.world.collide(this.charactersGroup);
    this.isoPhysics.world.overlap(Reaper.meleeGroup, this.objsGroup, (a, b) => {
      a.body.destroy();
    });
    this.isoPhysics.world.collide(this.charactersGroup, this.objsGroup);
    /*this.isoPhysics.world.collide(Reaper, Slope);
    this.isoPhysics.world.overlap(Reaper, Slope, (a, b) => {
      a.body.touching.down = true;
      b.body.touching.up = true;
      //console.log(Reaper.body.touching.down);
      let dx = b.body.position.x / 2 + b.body.widthX - a.body.position.x / 2;

      if (a.state !== 'jump') {
        a.body.gravity.z = 0;
        a.body.position.z = -(b.body.position.z + b.body.height - a.body.height / 2 - dx);
      }
    })*/
  }

  update() {
    this.closestObj = this.isoPhysics.closestBody(Reaper, this.doorsGroup.getChildren())
    if (Reaper.aim) { this.isoPhysics.moveToObjectXY(Reaper, this.closestObj, 0.001, null) }
    this.initSort();
    this.initCollider();
    Reaper.update(this);
  }
  getEachofGroup(group) {
    var children = this.children.getChildren();
    var len = children.length;

    for (var i = 0; i < len; i++) {
      var target = children[i];
      var body = target.body || target;
    }
    return target;
  }
}