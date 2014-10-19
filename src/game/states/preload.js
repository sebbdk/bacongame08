
'use strict';

function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('yeoman', 'assets/yeoman-logo.png');
    this.load.image('collectable', 'assets/m1.png');
    this.load.image('inventorySlot', 'assets/inventorySlot.png');
    this.load.image('background', 'assets/mosaic.png');
    this.load.image('knife', 'assets/knife.png');

    this.game.load.atlasXML('player', 'assets/player.png', 'assets/player.xml');
    this.game.load.atlasXML('npc1', 'assets/npc1.png', 'assets/npc1.xml');
    this.game.load.atlasXML('derp', 'assets/derp.png', 'assets/derp.xml');
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('testlevel');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
