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
function Vector(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}

Vector.prototype = {
  negative: function() {
    return new Vector(-this.x, -this.y, -this.z);
  },
  add: function(v) {
    if (v instanceof Vector) return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
    else return new Vector(this.x + v, this.y + v, this.z + v);
  },
  subtract: function(v) {
    if (v instanceof Vector) return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
    else return new Vector(this.x - v, this.y - v, this.z - v);
  },
  multiply: function(v) {
    if (v instanceof Vector) return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);
    else return new Vector(this.x * v, this.y * v, this.z * v);
  },
  divide: function(v) {
    if (v instanceof Vector) return new Vector(this.x / v.x, this.y / v.y, this.z / v.z);
    else return new Vector(this.x / v, this.y / v, this.z / v);
  },
  equals: function(v) {
    return this.x == v.x && this.y == v.y && this.z == v.z;
  },
  dot: function(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  },
  cross: function(v) {
    return new Vector(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  },
  length: function() {
    return Math.sqrt(this.dot(this));
  },
  unit: function() {
    return this.divide(this.length());
  },
  min: function() {
    return Math.min(Math.min(this.x, this.y), this.z);
  },
  max: function() {
    return Math.max(Math.max(this.x, this.y), this.z);
  },
  toAngles: function() {
    return {
      theta: Math.atan2(this.z, this.x),
      phi: Math.asin(this.y / this.length())
    };
  },
  toArray: function(n) {
    return [this.x, this.y, this.z].slice(0, n || 3);
  },
  clone: function() {
    return new Vector(this.x, this.y, this.z);
  },
  init: function(x, y, z) {
    this.x = x; this.y = y; this.z = z;
    return this;
  }
};

Vector.negative = function(a, b) {
  b.x = -a.x; b.y = -a.y; b.z = -a.z;
  return b;
};
Vector.add = function(a, b, c) {
  if (b instanceof Vector) { c.x = a.x + b.x; c.y = a.y + b.y; c.z = a.z + b.z; }
  else { c.x = a.x + b; c.y = a.y + b; c.z = a.z + b; }
  return c;
};
Vector.subtract = function(a, b, c) {
  if (b instanceof Vector) { c.x = a.x - b.x; c.y = a.y - b.y; c.z = a.z - b.z; }
  else { c.x = a.x - b; c.y = a.y - b; c.z = a.z - b; }
  return c;
};
Vector.multiply = function(a, b, c) {
  if (b instanceof Vector) { c.x = a.x * b.x; c.y = a.y * b.y; c.z = a.z * b.z; }
  else { c.x = a.x * b; c.y = a.y * b; c.z = a.z * b; }
  return c;
};
Vector.divide = function(a, b, c) {
  if (b instanceof Vector) { c.x = a.x / b.x; c.y = a.y / b.y; c.z = a.z / b.z; }
  else { c.x = a.x / b; c.y = a.y / b; c.z = a.z / b; }
  return c;
};
Vector.cross = function(a, b, c) {
  c.x = a.y * b.z - a.z * b.y;
  c.y = a.z * b.x - a.x * b.z;
  c.z = a.x * b.y - a.y * b.x;
  return c;
};
Vector.unit = function(a, b) {
  var length = a.length();
  b.x = a.x / length;
  b.y = a.y / length;
  b.z = a.z / length;
  return b;
};
Vector.fromAngles = function(theta, phi) {
  return new Vector(Math.cos(theta) * Math.cos(phi), Math.sin(phi), Math.sin(theta) * Math.cos(phi));
};
Vector.randomDirection = function() {
  return Vector.fromAngles(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1));
};
Vector.min = function(a, b) {
  return new Vector(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
};
Vector.max = function(a, b) {
  return new Vector(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
};
Vector.lerp = function(a, b, fraction) {
  return b.subtract(a).multiply(fraction).add(a);
};
Vector.fromArray = function(a) {
  return new Vector(a[0], a[1], a[2]);
};

module.exports = Vector;
},{}],3:[function(require,module,exports){
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
},{"./states/boot":12,"./states/gameover":13,"./states/menu":14,"./states/play":15,"./states/preload":16,"./states/testlevel":17}],4:[function(require,module,exports){
/* 
* @Author: sebb
* @Date:   2014-10-18 20:55:28
* @Last Modified by:   sebb
* @Last Modified time: 2014-10-19 18:54:47
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
	this.animations.add('portal', [8,9,10,11], 4, true);
	this.poof = this.animations.add('poof', [4,5,6,7], 8, true);

	this.animations.play('portal', true).play('stand');
	this.killSound = game.add.audio('monsterkill');
}; 

NPC.prototype = Object.create(Phaser.Sprite.prototype);
NPC.prototype.constructor = NPC;
NPC.prototype.update = function() {
	if(this.exists && this.logic !== false) {
		var self = this;
		//this.game.debug.body(this);

		this.game.physics.arcade.overlap(this.player, this, function() {
			if(self.isDangerous === true) {
				self.game.state.start('gameover');
			}
			window.score++;
			self.killSound.play();

			self.animations.play('poof', true)
			setTimeout(function() {
				self.kill();
			}, 450)
			self.logic = false;
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
/* 
* @Author: sebb
* @Date:   2014-10-18 20:55:28
* @Last Modified by:   sebb
* @Last Modified time: 2014-10-19 18:54:13
*/

'use strict';

var NPC = function(game, x, y, player) {
	Phaser.Sprite.call(this, game, x, y, 'npc1', 2);

	game.physics.enable(this, Phaser.Physics.ARCADE);

	this.player = player;
	this.lastStomp = new Date().getTime() + 400;
	this.isDangerous = false;

	this.body.setSize(42, 35, 0, 35);
	this.anchor.setTo(0.5, 0.5);
	this.logic = true;

	this.animations.add('fall', [2], 4, true);
	this.animations.add('stomp', [1], 4, true);
	this.animations.add('stand', [0], 4, true);
	this.animations.add('portal', [7,8,9,10], 4, true);
	this.poof = this.animations.add('poof', [3,4,5,6], 8, true);

	this.animations.play('portal', true).play('stand');

	this.scale.x = 1.5;
	this.scale.y = 1.5;

	this.killSound = game.add.audio('monsterkill');
}; 

NPC.prototype = Object.create(Phaser.Sprite.prototype);
NPC.prototype.constructor = NPC;
NPC.prototype.update = function() {
	if(this.exists && this.logic !== false) {
		var self = this;
		//this.game.debug.body(this);

		this.game.physics.arcade.overlap(this.player, this, function() {
			self.logic = false;

			if(self.isDangerous === true) {
				self.game.state.start('gameover');
			}
			self.killSound.play();
			window.score++;

			self.animations.play('poof', true)
			setTimeout(function() {
				self.kill();
			}, 900)
		});


		if(new Date().getTime() - this.lastStomp > 2000 + Math.random() * 1000 && self.logic !== false) {
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

},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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

},{"../prefabs/inventorySlot":9}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
'use strict';

var Player = function(game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'player', 2);

	game.physics.enable(this, Phaser.Physics.ARCADE);

	this.body.setSize(42, 48, 0, 20);
	this.body.collideWorldBounds = true;

	this.anchor.setTo(0.5, 0.5);

	this.animations.add('walk', [0, 1], 4, true);
	this.animations.add('stand', [2], 4, true);
	this.animations.play('stand');
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function() {
	//this.game.debug.body(this);
};

module.exports = Player;

},{}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text($(window).width()/2, 100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text($(window).width()/2, 200, 'You scored: ' + window.score, { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text($(window).width()/2, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('testlevel');
    }
  }
};
module.exports = GameOver;

},{}],14:[function(require,module,exports){

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

},{}],15:[function(require,module,exports){
'use strict';

var Player = require('../prefabs/player');
var Inventory = require('../prefabs/inventory');
var Dialog = require('../prefabs/dialog');
var Speechbubble = require('../prefabs/speechbubble');
var Info = require('../Info');
var Vector = require('../Vector');

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
		//this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

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


		this.entities.custSort = function (a, b) {
	        if (a.y-(a.height*a.anchor.y) < b.y-(b.height*b.anchor.y)) {
	            return -1;
	        } else {
	            return 1;
	        }
		};

		this.entities.sort = function(index, order) {
		    if (this.children.length < 2)
		    {
		        return;
		    }

		    if (typeof index === 'undefined') { index = 'z'; }
		    if (typeof order === 'undefined') { order = Phaser.Group.SORT_ASCENDING; }

		    this._sortProperty = index;

		    this.children.sort(this.custSort.bind(this));
		    this.updateZ();
		}
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

		var speed = 800;
		var vel = {x:0, y:0};

		if(!this.dialog.active) {
			if(this.game.input.activePointer.isDown) {
				var vec = new Vector(
					this.player.body.x - this.game.input.worldX + (this.player.body.width/2),
					this.player.body.y - this.game.input.worldY + (this.player.body.height/2)
				);

				vec.x = (vec.x/vec.length()) * speed * -1;
				vec.y = (vec.y/vec.length()) * speed * -1; 

				vel.x = vec.x;
				vel.y = vec.y;
			}

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

		this.entities.sort();

		this.game.camera.x = this.lerp(0.3, this.game.camera.x, this.player.x - (this.game.width/2))
		this.game.camera.y = this.lerp(0.3, this.game.camera.y, this.player.y - (this.game.height/2))
	},
	render: function() {
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
},{"../Info":1,"../Vector":2,"../prefabs/dialog":7,"../prefabs/inventory":8,"../prefabs/player":10,"../prefabs/speechbubble":11}],16:[function(require,module,exports){

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
    this.load.image('knife', 'assets/knife.png');

    this.load.image('treestump', 'assets/treestump.png');

    this.load.image('toft1', 'assets/toft1.png');
    this.load.image('toft2', 'assets/toft1.png');
    this.load.image('toft3', 'assets/toft3.png');

    this.load.image('bush1', 'assets/bush1.png');
    this.load.image('bush2', 'assets/bush2.png');
    this.load.image('bush3', 'assets/bush3.png');

    this.game.load.atlasXML('player', 'assets/player.png', 'assets/player.xml');
    this.game.load.atlasXML('npc1', 'assets/npc1.png', 'assets/npc1.xml');
    this.game.load.atlasXML('derp', 'assets/derp.png', 'assets/derp.xml');
    this.game.load.atlasXML('clutter', 'assets/clutter.png', 'assets/clutter.xml');


    this.game.load.audio('monsterkill', 'assets/sfx/Hit_Hurt2.mp3')
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

},{}],17:[function(require,module,exports){
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
},{"../Info":1,"../prefabs/Derp":4,"../prefabs/Knife":5,"../prefabs/NPC":6,"./play":15}]},{},[3])