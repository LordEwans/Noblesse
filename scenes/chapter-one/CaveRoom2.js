import eventsCentre from '../../assets/events/EventCentre.js';
import IsoPlugin, { IsoPhysics } from '../../lib/src/IsoPlugin.js';
import ReaperSprite from '../../assets/prefabs/Reaper.js';
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
let layer1, layer2, layer3, layer4, layer5;
let Reaper, Door, WallNE = [], House, Block1, Block2;
export default class CaveRoom2 extends Phaser.Scene {
  constructor() {
    const sceneConfig = {
      key: 'CaveRoom2',
      mapAdd: { isoPlugin: 'iso', isoPhysics: 'isoPhysics', dialogModal: 'dialogue' }
    };

    super(sceneConfig);
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
    this.isoPhysics.world.bounds.setTo(0, 0, 0, 1859, 1501.5, 5000);
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
      
  }
  
  initGroups() {
    this.charactersGroup = this.add.group();
    this.doorsGroup = this.add.group();
    this.objsGroup = this.add.group();
    this.isoLayer = this.add.layer();
    this.isoPhysics.world.enable(WallNE);
  }

  initCamera() {
    this.camera = this.cameras.main;
    this.camera.fadeIn(2500, 17, 17, 25);
    //this.camera.setBackgroundColor("#111119");
    this.camera.setZoom(1);
    //this.camera.setBounds(-640, 80, 1280*2, 740*2);
    //this.camera.zoomEffect.switch(0.25, 2000)
  }

  create() {
    this.initSystems();
    this.initCamera();
    this.initGroups();
    this.isoWorld();
  }

  initSort() {
    this.isoLayer.setName('SortPanel');
    this.isoPhysics.projector.topologicalSort(this.isoLayer);
  }

  initCollider() {
    this.isoPhysics.world.collideGroupVsSelf(this.charactersGroup);
    //this.isoPhysics.world.collideGroupVsSelf(this.doorsGroup);
    //this.isoPhysics.world.collideGroupVsSelf(this.objsGroup);

    this.isoPhysics.world.collideGroupVsGroup(this.charactersGroup, this.objsGroup);
    //this.isoPhysics.world.collideGroupVsGroup(this.doorsGroup, this.objsGroup);
  }

  update() {
    this.initSort();
    this.initCollider();
    Reaper.update();
  }
}