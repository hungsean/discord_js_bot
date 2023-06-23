const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('react')
		.setDescription('React me!'),
	async execute(interaction) {
		const reactMessages = await interaction.reply('Please reply on me!');
        reactMessages.react('👍');
        reactMessages.react('👎');
        
	},
};