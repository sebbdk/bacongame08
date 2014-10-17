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