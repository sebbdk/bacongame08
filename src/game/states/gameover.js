
'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    this.game.input.keyboard.destroy();

    $('.scores').show();

    function createCookie(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function eraseCookie(name) {
        createCookie(name,"",-1);
    }


    if(readCookie('maxScore') === null) {
      createCookie('maxScore', 0, 31);
    }


    this.game.stage.backgroundColor = '#666666';
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text($(window).width()/2, 100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);


    if(window.score > readCookie('maxScore')) {
      createCookie('maxScore', window.score, 31);

      this.congratsText = this.game.add.text($(window).width()/2, 170, 'New highscore!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
      this.congratsText.anchor.setTo(0.5, 0.5);
    } else {
      this.congratsText = this.game.add.text($(window).width()/2, 170, 'You scored: ' + window.score, { font: '32px Arial', fill: '#ffffff', align: 'center'});
      this.congratsText.anchor.setTo(0.5, 0.5);
    }


    this.congratsText = this.game.add.text($(window).width()/2, 220, 'Your highscore is: ' + readCookie('maxScore'), { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text($(window).width()/2, 270, 'Tab/click here To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);


    $('.submit-score-btn').off('click');
    $('.submit-score-btn').on('click', function() {
        $.post('http://client.sebb.dk/highscore/highscores/highscores/add.json', 
          {data:{Highscore:{score:window.score, 'name':$('.submit-score').val()}}}, function() {
            if(confirm('Your score was added, play again?')) {
              this.game.state.start('testlevel');
            }
          });
    })


    $('.score-list').html('');
    $.get('http://client.sebb.dk/highscore/highscores.json', function(data) {
      $.each(data.data, function(index, score) {
        console.log(score.Highscore.score);
        $('.score-list').append('<div class="row"><span class="name">' + score.Highscore.name + '</span> ' + score.Highscore.score + '</div>')
      });
    }, 'json')
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('testlevel');
    }
  }
};
module.exports = GameOver;
