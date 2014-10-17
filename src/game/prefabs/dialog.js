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