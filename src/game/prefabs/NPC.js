/* 
* @Author: sebb
* @Date:   2014-10-18 20:55:28
* @Last Modified by:   sebb
* @Last Modified time: 2014-10-18 22:48:54
*/

'use strict';

var NPC = function(game, x, y, player) {
	Phaser.Sprite.call(this, game, x, y, 'player', 2);

	game.physics.enable(this, Phaser.Physics.ARCADE);

	this.player = player;
	this.body.setSize(42, 35, 0, 35);
	this.anchor.setTo(0.5, 0.5);

	this.animations.add('walk', [0, 1], 4, true);
	this.animations.add('stand', [2], 4, true);
	this.animations.play('stand');


	this.scale.x = 2;
	this.scale.y = 2;
};

NPC.prototype = Object.create(Phaser.Sprite.prototype);
NPC.prototype.constructor = NPC;
NPC.prototype.update = function() {
	if(this.exists) {
		var self = this;
		this.game.debug.body(this);

		this.game.physics.arcade.overlap(this.player, this, function() {
			console.log('i am done getting stabbed... oh noe!!');
			self.kill();
		});

	}
};

module.exports = NPC;
