(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Info = {
	"convos":{
		"weird":{

			"0":{
				"text":function(conditions, game) {
					game.speechbubble.say('Oohh, whats this?!', 3000);
					return "You picked upsomething rather weird";
				},
				"actions":[
					{
						"text":"Eat it!",
						"link":"eat"
					},
					{
						"text":"Stash it",
						"link":"stashit"
					}
				]
			},

			"stashit":{
				"run":function() {
					//DO SOMETHING WHEN THIS IS INTIATED
				},
				"text":function(conditions, game) {
					game.collectable.collect(game.player);
					game.collectable.collected = true;
					setTimeout(function() {
						game.inventory.addItem(game.collectable);
					}, 500);
					return "You stash the weird looking thing in your...eh.. well, somewhere on your person.";
				},
				"actions":[
					{
						"text":"Move on"
					}
				]
			},

			"eat":{
				"text":function(conditions, game){
					conditions.eatCount = conditions.eatCount ? conditions.eatCount+1:1;
					game.speechbubble.say('Ohm nohm nohm..!', 3000);
					if(conditions.eatCount > 3) {
						return "You are not too clever it would seem, eating this thing is not really working out for you...";
					}

					return "You stuff it in your mouth, the taste triggers your gag reflexe and you spit it out again..";
				},
				"actions":[
					{
						"text":"Search for more treasure!",
						"link":"stashit"
					},
					{
						"text":"Eat it!",
						"link":"eat"
					}
				]
			}
		}
	}
}

module.exports = Info;
},{}],2:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game($(window).outerWidth(), $(window).outerHeight(), Phaser.AUTO, 'memorobelia');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  game.state.add('testlevel', require('./states/testlevel'));
  

  game.state.start('boot');
};
},{"./states/boot":9,"./states/gameover":10,"./states/menu":11,"./states/play":12,"./states/preload":13,"./states/testlevel":14}],3:[function(require,module,exports){
'use strict';

var Collectable = function(game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'collectable', frame);
	this.anchor.setTo(0.5, 0.5);

	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.setSize(64, 64);

	game.add.tween(this).to({ angle: 360 }, 4000, Phaser.Easing.Linear.None, true, 0, 1000);
};

Collectable.prototype = Object.create(Phaser.Sprite.prototype);
Collectable.prototype.constructor = Collectable;
Collectable.prototype.update = function() {};
Collectable.prototype.collect = function(player) {
	//this.parent.remove(this);
	this.game.add.tween(this).to({ x: player.x, y:player.y }, 300, Phaser.Easing.Linear.None, true, 0, 0);
	this.game.add.tween(this.scale).to({ x: 0, y:0 }, 300, Phaser.Easing.Linear.None, true, 0, 0);
};

module.exports = Collectable;

},{}],4:[function(require,module,exports){
/* 
* @Author: sebb
* @Date:   2014-09-08 16:58:31
* @Last Modified by:   sebb
* @Last Modified time: 2014-10-04 03:14:18
*/

var Dialog = function(conditions, game) {
	var self = this;
	this.conditions = conditions;

	this.active = false;
	this.game = game;

	$(document).on('click', '.dialog a', function(evt) {
		evt.preventDefault();
		self.doAction(this)
	});
}

Dialog.prototype.doAction = function(dom) {
	var action = $(dom).attr('href').replace('#', '');
	if(action != "" && action != "undefined") {
		this.converse(action, this.conversation, true);
	} else {
		$('.dialog-container').hide();
		this.active = false;
	}
}

Dialog.prototype.converse = function(id, conversation, force) {
	if(!this.active || force) {
		this.conversation = conversation;
		var text = typeof(conversation[id]['text']) === "function" ? conversation[id]['text'](this.conditions, this.game):conversation[id]['text'];
		var content = '<p>' + text + '</p>';
		
		if(conversation[id]['actions']) {
			conversation[id]['actions'].forEach(function(action) {
				content += '<a class="option" href="#' + action.link + '"> ' + action.text + ' </a>';
			});
		}
		
		$('.dialog-container').show();
		$('.dialog').html(content);
		this.active = true;
	}
}

module.exports = Dialog;
},{}],5:[function(require,module,exports){
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

},{"../prefabs/inventorySlot":6}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
'use strict';

var Player = function(game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'player', 2);

	game.physics.enable(this, Phaser.Physics.ARCADE);

	this.body.setSize(42, 48, 0, 20);

	this.anchor.setTo(0.5, 0.5);

	this.animations.add('walk', [0, 1], 4, true);
	this.animations.add('stand', [2], 4, true);
	this.animations.play('stand');
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function() {};

module.exports = Player;

},{}],8:[function(require,module,exports){
/* 
* @Author: sebb
* @Date:   2014-09-14 01:33:33
* @Last Modified by:   sebb
* @Last Modified time: 2014-09-17 02:10:26
*/

function SpeechBubble(target) {
	var self = this;
	var dom = $('.speech-bubble');
	var justSaying = null;
	self.timer = null;

	this.say = function(text, time, callback){
		time = time === undefined ? 3000:time;

		clearTimeout(self.timer);

		dom.fadeIn();

		if(typeof(text) == "object") {
			justSayingCallback = callback;
			justSaying = text;
			dom.html(text.shift());
		} else {
			justSaying = null;
			dom.html(text);
		}

		var x = (target.game.width/2) - (dom.outerWidth()/2);
		var y = (target.game.height/2) - (dom.outerHeight()/2) - target.height/2;
		dom.css({left: x, top: y});

		self.timer = setTimeout(function() {
			dom.fadeOut(300, function() {
				if(justSaying !== null && justSaying.length > 0) {
					self.say(justSaying, time, callback);
				} else if(callback) {
					callback();
				}
			});
		}, time);
	}

}



module.exports = SpeechBubble;
},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],11:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'yeoman');
    this.sprite.anchor.setTo(0.5, 0.5);

    this.titleText = this.game.add.text(this.game.world.centerX, 300, '\'Allo, \'Allo!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play "Click The Yeoman Logo"', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.sprite.angle = -20;
    this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  update: function() { 
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;

},{}],12:[function(require,module,exports){
'use strict';

var Player = require('../prefabs/player');
var Inventory = require('../prefabs/inventory');
var Dialog = require('../prefabs/dialog');
var Speechbubble = require('../prefabs/speechbubble');
var Info = require('../Info');

function Play() {}

Play.prototype = {
	info:{},
	create: function() {
		var self = this;

		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.add.sprite(0, 0, 'background');

		//create entity group to sort "dept"
		this.entities = new Phaser.Group(this.game);

		//make player
		this.game.stage.backgroundColor = '#dddddd';
		this.player = new Player(this.game,  1920/2, 1920/2);
		this.entities.add(this.player);

		//setup controls
		this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

		this.cursors = this.createCursorKeys();

		this.relateKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.relateKey.onDown.add(this.relate, this);

		//create some gui
		this.inventory = new Inventory(this.game);

		//setup camera
		this.game.world.setBounds(0, 0, 1920, 1920);
		//this.game.camera.follow(this.player);

		//setup dialog
		this.dialog = new Dialog(this.info, this);
		this.speechbubble = new Speechbubble(this.player);
	
		this.info.startTime = new Date().getTime();
	},
	lerp:function( amount, start, end ) {
		if ( start == end )  {
			return start ;
		}
		return ( ( 1 - amount ) * start ) + ( amount * end ) ;
	},
	checkConditions:function() {}, //filled in by child class
	relate:function() {
		console.log('relating to stuff!!');
	},
	update: function() {
		this.checkConditions();

		var speed = 150;
		var vel = {x:0, y:0};

		if(!this.dialog.active) {
			if(this.cursors.left.isDown) {
				vel.x -= speed;
			}
			if(this.cursors.right.isDown) {
				vel.x += speed;
			}
			if(this.cursors.up.isDown) {
				vel.y -= speed;
			}
			if(this.cursors.down.isDown) {
				vel.y += speed;
			}
		}

		if(vel.x > 0) {
			this.player.animations.play('walk');
			this.player.scale.x = -1;
		} else if(vel.x < 0) {
			this.player.animations.play('walk');
			this.player.scale.x= 1;
		} else if(vel.y !== 0) {
			this.player.animations.play('walk');
		} else {
			this.player.x = Math.round(this.player.x);
			this.player.y = Math.round(this.player.y);
			this.player.animations.play('stand');
		}

		if(vel.x != 0 || vel.y != 0) {
			this.info.hasMoved = true;
		}

		this.player.body.velocity.x = vel.x;
		this.player.body.velocity.y = vel.y;

		this.entities.sort('y');

		this.game.camera.x = this.lerp(0.4, this.game.camera.x, this.player.x - (this.game.width/2))
		this.game.camera.y = this.lerp(0.4, this.game.camera.y, this.player.y - (this.game.height/2))

	},
	clickListener: function() {
		this.game.state.start('gameover');
	},
	render: function() {
		if(this.debug === true) {
			this.game.debug.body(this.player);
		}
	},
    createCursorKeys: function () {
        return {
            up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.D)
        };

    },
};

module.exports = Play;
},{"../Info":1,"../prefabs/dialog":4,"../prefabs/inventory":5,"../prefabs/player":7,"../prefabs/speechbubble":8}],13:[function(require,module,exports){

'use strict';

function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('yeoman', 'assets/yeoman-logo.png');
    this.load.image('collectable', 'assets/m1.png');
    this.load.image('inventorySlot', 'assets/inventorySlot.png');
    this.load.image('background', 'assets/mosaic.png');

    this.game.load.atlasXML('player', 'assets/player.png', 'assets/player.xml');
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('testlevel');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}],14:[function(require,module,exports){
/* 
* @Author: sebb
* @Date:   2014-09-18 00:04:27
* @Last Modified by:   sebb
* @Last Modified time: 2014-09-18 00:27:24
*/

var PlayState = require('./play');
var Info = require('../Info');
var Collectable = require('../prefabs/collectable');

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

	this.game.physics.arcade.overlap(this.player, this.collectable, function() {
		if(self.collectable.collected !== true) {
			self.dialog.converse("0", Info.convos.weird);
		}
	});
}

Level.prototype.create = function() {
	self = this;

	PlayState.prototype.create.call(this);

	//make collectable
	this.game.stage.backgroundColor = '#dddddd';
	this.collectable = new Collectable(this.game,  (1920/2) - 200 , 1920/2);
	this.entities.add(this.collectable);

	this.speechbubble.say([
		'Hi there!',
		'And welcome to this game',
		'...',
		'Tutorial time!',
		'First',
		'Move by pressing the W, A, S, D keys',
	], 2000, function() {
		self.info.doneTutorialAnnoucing	=  new Date().getTime();	
	});
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
},{"../Info":1,"../prefabs/collectable":3,"./play":12}]},{},[2])