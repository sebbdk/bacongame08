'use strict';

var InventorySlot = function(game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'inventorySlot', frame);
	this.anchor.setTo(0.5, 0.5);
	this.item = null;
};

InventorySlot.prototype = Object.create(Phaser.Sprite.prototype);
InventorySlot.prototype.constructor = InventorySlot;
InventorySlot.prototype.update = function() {};
InventorySlot.prototype.setItem = function(item) {
	this.item = item;

	var self = this;
	item.x = self.x;
	item.y = self.y;
	self.game.add.tween(item.scale).to({ x: 0.5, y:0.5 }, 300, Phaser.Easing.Linear.None, true, 0, 0);
};
InventorySlot.prototype.clear = function(item) {};

module.exports = InventorySlot;
