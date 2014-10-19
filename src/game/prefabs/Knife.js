/* 
* @Author: sebb
* @Date:   2014-10-18 20:55:28
* @Last Modified by:   sebb
* @Last Modified time: 2014-10-19 17:07:48
*/

'use strict';

var Knife = function(game, player) {
	Phaser.Sprite.call(this, game, player.x, player.y, 'knife');

	game.physics.enable(this, Phaser.Physics.ARCADE);

	this.player = player;
	this.body.setSize(42, 10, 0, 0);
	this.anchor.setTo(0.5, 0.5);
};

Knife.prototype = Object.create(Phaser.Sprite.prototype);
Knife.prototype.constructor = Knife;
Knife.prototype.update = function() {
	//this.game.debug.body(this);

	if(this.player.body.velocity.x > 0) {
		this.scale.x= -1;
		this.x = this.player.body.x+32;
	} else if(this.player.body.velocity.x < 0) {
		this.scale.x= 1;
		this.x = this.player.body.x-14;
	}
	

	
	this.y = this.player.body.y+16;
};

module.exports = Knife;
