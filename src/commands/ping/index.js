const { SlashCommandBuilder } = require('discord.js');

const wait = require('node:timers/promises').setTimeout;


module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		await interaction.editReply('Pong!');
		await wait(2000);
		await interaction.followUp({ content: 'Pong again!', ephemeral: true });
		const message = await interaction.fetchReply();
		await interaction.deleteReply();
		console.log(message);
		await interaction.channel.send('ping: ' + interaction.client.ws.ping + 'ms');
	},
};