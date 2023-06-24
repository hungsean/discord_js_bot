const { SlashCommandBuilder } = require('discord.js');

// contextcommandbuilder

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
		// .setType(ApplicationCommandType.Message),
	async execute(interaction) {
		await interaction.reply('logging')
		console.log(interaction);
		await interaction.channel.send('interaction log successful');
		const user = interaction.user;
		console.log(user);
		await interaction.channel.send('user log successful');
		const GuildMember = interaction.member;
		console.log(GuildMember);
		await interaction.channel.send('GuildMember log successful');
		const isMemberUser = (GuildMember.user === user);
		console.log(isMemberUser);
		await interaction.channel.send('isMemberUser log successful');
	},
};