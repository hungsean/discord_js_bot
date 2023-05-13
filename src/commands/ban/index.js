const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Select a member and ban them or unban.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('unban')
				.setDescription('Select a member and unban them.')
				.addUserOption(option =>
					option
						.setName('target')
						.setDescription('The member to ban or unban')
						.setRequired(true)
				)
				.addStringOption(option =>
					option
						.setName('reason')
						.setDescription('The reason for banning')
				)
			)
		.addSubcommand(subcommand =>
			subcommand
				.setName('ban')
				.setDescription('Select a member and unban them.')
				.addUserOption(option =>
					option
						.setName('target')
						.setDescription('The member to ban or unban')
						.setRequired(true)
				)
				.addStringOption(option =>
					option
						.setName('reason')
						.setDescription('The reason for banning')
				)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') ?? 'No reason provided';
		if (interaction.options.getSubcommand() === 'ban')
		{
			await interaction.reply(`Banning ${target.username} for reason: ${reason}`);
			await interaction.guild.members.ban(target);
		}
		else if (interaction.options.getSubcommand() === 'unban')
		{
			await interaction.reply(`Unbanning ${target.username} for reason: ${reason}`);
			await interaction.guild.members.unban(target);
		}
    },
};