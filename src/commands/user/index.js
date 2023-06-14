const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('user')
		// .setDescription('Provides information about the user.')
		.setType(ApplicationCommandType.User),
	async execute(interaction) {
		console.log(interaction);
	},
};