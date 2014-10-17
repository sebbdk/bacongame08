'use strict';

function Boot() {
}

Boot.prototype = {
	preload: function() {
		this.load.image('preloader', 'assets/preloader.gif');
	},
	create: function() {
		var self = this;
		self.game.input.maxPointers = 1;
		self.game.state.start('preload');
		self.resizeGame();

		$(window).resize(function() { self.resizeGame(); } );
	},
	resizeGame:function() {
		var height = $(window).height();
		var width = $(window).width();

		this.game.width = width;
		this.game.height = height;
		this.game.stage.bounds.width = width;
		this.game.stage.bounds.height = height;

		if (this.game.renderType === Phaser.WEBGL) {
			this.game.renderer.resize(width, height);
		}

		//var left = $(window).outerWidth()/2 - ($('.dialog').outerWidth()/2);
		//$('.dialog').css('left', left+'px');
	}
};

module.exports = Boot;
