/* 
* @Author: sebb
* @Date:   2014-10-18 20:55:28
* @Last Modified by:   sebb
* @Last Modified time: 2014-10-19 17:13:09
*/

'use strict';

var NPC = function(game, x, y, player) {
	Phaser.Sprite.call(this, game, x, y, 'derp', 2);

	game.physics.enable(this, Phaser.Physics.ARCADE);

	this.player = player;
	this.lastCharge = new Date().getTime();
	this.isDangerous = false;
	this.direction = (Math.round(Math.random()) === 1 ? 1:-1);

	this.body.setSize(42, 70, 0, 15);
	this.anchor.setTo(0.5, 0.5);

	this.animations.add('run', [1,2,3], 8, true);
	this.animations.add('stand', [0], 4, true);

	this.animations.play('stand');
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


		if(new Date().getTime() - this.lastCharge > 2000 + Math.random() * 1000) {
			this.direction = this.direction * -1;

			this.scale.x = this.direction*-1;
			self.isDangerous = true;

			var chargeTo = this.x + (200 * this.direction);
			var t = this.game.add.tween(this);
			self.animations.play('run');
			t.to({ x: chargeTo }, 500, Phaser.Easing.Bounce.InOut, true);
			t.onComplete.add(function(arg, arg2) {
				self.animations.play('stand');
				self.isDangerous = false;
			});

			this.lastCharge = new Date().getTime();
		}
	}

};

module.exports = NPC;
