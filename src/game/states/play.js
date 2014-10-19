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
		this.game.stage.backgroundColor = '#999999';
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