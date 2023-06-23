const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dm')
		.setDescription('dm you'),
	async execute(interaction) {
		interaction.user.send('hello');
        interaction.reply({ ephemeral: true, content: 'dm you' });
	},
};