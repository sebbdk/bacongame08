/* 
* @Author: sebb
* @Date:   2014-09-18 00:04:27
* @Last Modified by:   sebb
* @Last Modified time: 2014-10-19 05:10:33
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
}

Level.prototype.renderScore = function() {
	this.titleText.text = "Score: " + window.score;
}

var lastAdd = 0;

Level.prototype.checkConditions = function() {
	var self = this;


	if(new Date().getTime() - lastAdd > 4000) {

		var types = [
			NPC,
			Derp
		];

		var amount = Math.round(Math.random() * 5) + 1;
		for(var x = 0; x <= amount; x++) {
			var npc = new types[Math.floor(Math.random() * types.length)](
				self.game, 
				(self.player.x-300) + Math.random() * 600, 
				(self.player.y-300) + Math.random() * 600, 
				self.player
			);
			self.entities.add(npc);
		}
		lastAdd = new Date().getTime();
	}

	var self = this;
	var timeSinceTutDone = new Date().getTime() - this.info.doneTutorialAnnoucing;

	if(this.info.doneTutorialAnnoucing != null && 
		timeSinceTutDone > 8000 && 
		!this.info.remindToMove &&
		!this.info.hasMoved) {

		this.speechbubble.say([
			'That was hint...',
			'Move it bubblebuts!'
		], 4000);
		this.info.remindToMove = true;
	}

	if(this.info.doneTutorialAnnoucing && 
		this.info.hasMoved && 
		!this.info.mechanicTime && 
		timeSinceTutDone > 8000) {
		setTimeout(function() {
			self.speechbubble.say([
				'Mmm thats some good walking',
				'Now abuse this new power of yours!!'
			], 2000, function() {
				setTimeout(function() {
					self.speechbubble.say([
						'Ah yir, look those puny legs at work!',
						'Is this not the best walk animation ever?',
						'Walk som more, enjoy it, let it soak in!'
					]);
				}, 3000);
			});
		}, 3000);
		this.info.mechanicTime = true;
	}

	this.renderScore();
}

module.exports = Level;