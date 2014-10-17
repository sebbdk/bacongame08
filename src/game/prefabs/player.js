'use strict';

var Player = function(game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'player', 2);

	game.physics.enable(this, Phaser.Physics.ARCADE);

	this.body.setSize(42, 48, 0, 20);

	this.anchor.setTo(0.5, 0.5);

	this.animations.add('walk', [0, 1], 4, true);
	this.animations.add('stand', [2], 4, true);
	this.animations.play('stand');
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function() {};

module.exports = Player;
