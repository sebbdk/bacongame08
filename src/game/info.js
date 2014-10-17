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