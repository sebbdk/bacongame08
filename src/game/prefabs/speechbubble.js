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