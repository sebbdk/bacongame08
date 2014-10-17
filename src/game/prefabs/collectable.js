'use strict';

var Collectable = function(game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'collectable', frame);
	this.anchor.setTo(0.5, 0.5);

	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.setSize(64, 64);

	game.add.tween(this).to({ angle: 360 }, 4000, Phaser.Easing.Linear.None, true, 0, 1000);
};

Collectable.prototype = Object.create(Phaser.Sprite.prototype);
Collectable.prototype.constructor = Collectable;
Collectable.prototype.update = function() {};
Collectable.prototype.collect = function(player) {
	//this.parent.remove(this);
	this.game.add.tween(this).to({ x: player.x, y:player.y }, 300, Phaser.Easing.Linear.None, true, 0, 0);
	this.game.add.tween(this.scale).to({ x: 0, y:0 }, 300, Phaser.Easing.Linear.None, true, 0, 0);
};

module.exports = Collectable;
