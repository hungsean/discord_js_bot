const { Events, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity('有沒有bug', { type: ActivityType.watching });
		client.user.setAvatar('./avatar.png');

	},
};