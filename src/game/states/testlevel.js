/* 
* @Author: sebb
* @Date:   2014-09-18 00:04:27
* @Last Modified by:   sebb
* @Last Modified time: 2014-10-18 20:49:29
*/

var PlayState = require('./play');
var Info = require('../Info');

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

	/*this.speechbubble.say([
		'Hi there!',
		'And welcome to this game',
		'...',
		'Tutorial time!',
		'First',
		'Move by pressing the W, A, S, D keys',
	], 2000, function() {
		self.info.doneTutorialAnnoucing	=  new Date().getTime();	
	});*/
}

Level.prototype.checkConditions = function() {

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
}

module.exports = Level;