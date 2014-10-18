/* 
* @Author: sebb
* @Date:   2014-10-18 20:55:28
* @Last Modified by:   sebb
* @Last Modified time: 2014-10-18 20:56:01
*/

'use strict';

var NPC = function(game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'player', 2);

	game.physics.enable(this, Phaser.Physics.ARCADE);

	this.body.setSize(42, 48, 0, 20);

	this.anchor.setTo(0.5, 0.5);

	this.animations.add('walk', [0, 1], 4, true);
	this.animations.add('stand', [2], 4, true);
	this.animations.play('stand');
};

NPC.prototype = Object.create(Phaser.Sprite.prototype);
NPC.prototype.constructor = NPC;
NPC.prototype.update = function() {};

module.exports = NPC;
