'use strict';

var InventorySlot = require('../prefabs/inventorySlot');

var Inventory = function(game, parent) {  
	Phaser.Group.call(this, game, parent);
	this.fixedToCamera = true;

	var self = this;

	var offsetX = (game.width/2) - ((96 * 2) / 2) + 16
	this.slots = [
		new InventorySlot(game, 0+offsetX+32, game.height - 96+32),
		new InventorySlot(game, 96+offsetX+32, game.height - 96+32)
	];

	this.slots.forEach(function(slot) {
		self.add(slot);
	});

	this.x = 200;
	this.visible = false;
};

Inventory.prototype = Object.create(Phaser.Group.prototype);
Inventory.prototype.constructor = Inventory;
Inventory.prototype.update = function() {};

Inventory.prototype.addItem = function(item) {
	this.visible = true;

	this.add(item);

	item.x = 50;
	item.y = 50;

	this.slots.forEach(function(slot) {
		if(slot.item === null && item) {
			slot.setItem(item);
			item = false;
		}
	});
};

module.exports = Inventory;
