/* 
* @Author: sebb
* @Date:   2014-09-18 00:04:27
* @Last Modified by:   sebb
* @Last Modified time: 2014-10-19 17:23:59
*/

var PlayState = require('./play');
var Info = require('../Info');
var NPC = require('../prefabs/NPC');
var Derp = require('../prefabs/Derp');
var Knife = require('../prefabs/Knife');

function Level() {}

Level.prototype = Object.create(PlayState.prototype);
Level.prototype.constructor = Level;
Level.prototype.info = {
	hasMoved:false,
	startTime:0,
	doneTutorialAnnoucing:null
};

Level.prototype.update = function() {
	var self = this;

	PlayState.prototype.update.call(this);
}

Level.prototype.create = function() {
	self = this;

	PlayState.prototype.create.call(this);
	this.game.stage.backgroundColor = '#dddddd';

	this.knife = new Knife(this.game,  this.player);
	this.entities.add(this.knife);

	this.speechbubble.say([
		'Stabby time!'
	], 2000);


    var style = { font: '45px Arial', fill: '#333333', align: 'center'};
    this.titleText = this.game.add.text($(window).width()/2, 50, '', style);
    this.titleText.anchor.setTo(0.5, 0.5);
    this.titleText.fixedToCamera = true;
    window.score = 0;


    var clutter = [
    /*	'toft1',
    	'toft2',
    	'toft3',*/

    	'bush1',
    	'bush2',
    	'bush3',
    ];


    for(var c=0; c < 20; c++) {
    	var x = 2048 * Math.random();
    	var y = 2048 * Math.random();

    	var s = this.add.sprite(x, y, clutter[Math.floor(Math.random() * clutter.length-1)] );
    	this.entities.add(s);
    }
}

Level.prototype.renderScore = function() {
	this.titleText.text = "Score: " + window.score;
}

var lastAdd = 0;

Level.prototype.checkConditions = function() {
	var self = this;


	if(new Date().getTime() - lastAdd > 3000) {

		var types = [
			NPC,
			Derp
		];

		var amount = Math.round(Math.random() * 15) + 1;
		for(var x = 0; x <= amount; x++) {

			var poxX = (self.player.x-600) + Math.random() * 1200;
			var poxY = (self.player.y-600) + Math.random() * 1200;

			if(poxX < 0 || poxX > 2024) {
				continue;
			}

			if(poxY < 0 || poxY > 2024) {
				continue;
			}

			var npc = new types[Math.floor(Math.random() * types.length)](
				self.game, 
				poxX, 
				poxY, 
				self.player
			);
			self.entities.add(npc);
		}
		lastAdd = new Date().getTime();
	}

	this.renderScore();
}

module.exports = Level;