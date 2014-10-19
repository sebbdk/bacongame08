/* 
* @Author: sebb
* @Date:   2014-10-18 20:55:28
* @Last Modified by:   sebb
* @Last Modified time: 2014-10-19 17:13:04
*/

'use strict';

var NPC = function(game, x, y, player) {
	Phaser.Sprite.call(this, game, x, y, 'npc1', 2);

	game.physics.enable(this, Phaser.Physics.ARCADE);

	this.player = player;
	this.lastStomp = 0;
	this.isDangerous = false;

	this.body.setSize(42, 35, 0, 35);
	this.anchor.setTo(0.5, 0.5);

	this.animations.add('fall', [2], 4, true);
	this.animations.add('stomp', [1], 4, true);
	this.animations.add('stand', [0], 4, true);

	this.animations.play('stand');

	this.scale.x = 1.5;
	this.scale.y = 1.5;
}; 

NPC.prototype = Object.create(Phaser.Sprite.prototype);
NPC.prototype.constructor = NPC;
NPC.prototype.update = function() {
	if(this.exists) {
		var self = this;
		//this.game.debug.body(this);

		this.game.physics.arcade.overlap(this.player, this, function() {
			if(self.isDangerous === true) {
				self.game.state.start('gameover');
			}
			window.score++;
			self.kill();
		});


		if(new Date().getTime() - this.lastStomp > 2000 + Math.random() * 1000) {
			var posY = this.y;

			var t = this.game.add.tween(this);
			self.animations.play('fall');
			t.to({ y: posY-50 }, 300, Phaser.Easing.Bounce.InOut, true, 0, 1, true);
			t.onComplete.add(function(arg, arg2) {
				this.animations.play('stomp');
				setTimeout(function() {
					self.animations.play('stand');
					self.isDangerous = false;
				}, 100)
			}, this);

			t.onLoop.add(function(arg, arg2) {
				self.animations.play('fall');
				this.isDangerous = true;
			}, this);

			this.lastStomp = new Date().getTime();
		}
	}

};

module.exports = NPC;
