const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('user')
		// .setDescription('Provides information about the user.')
		.setType(ApplicationCommandType.Message),
	async execute(interaction) {
		const { username } = interaction.targetMessage.author;
		console.log('interaction: ' + interaction);
		console.log('context: ' + username);
	},
};