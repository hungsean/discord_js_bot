const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('react')
		.setDescription('React me!'),
	async execute(interaction) {
        await interaction.reply({ content: 'commend successful', ephemeral: true });
		const reactMessages = await interaction.channel.send('Please reply on me!');
        reactMessages.react('👍');
        reactMessages.react('👎');

	},
};