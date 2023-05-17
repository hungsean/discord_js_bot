const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { ButtonBuilder, ButtonStyle } = require('discord.js');
const { ActionRowBuilder } = require('discord.js');

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

	// ------------------------------

    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') ?? 'No reason provided';
		const confirm = new ButtonBuilder()
			.setCustomId('confirm')
			.setLabel('Confirm Ban')
			.setStyle(ButtonStyle.Danger);

		const cancel = new ButtonBuilder()
			.setCustomId('cancel')
			.setLabel('Cancel')
			.setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder()
			.addComponents(cancel, confirm);


		if (interaction.options.getSubcommand() === 'ban')
		{
			const response = await interaction.reply({
				content: `Are you sure you want to ban ${target} for reason: ${reason}?`,
				components: [row],
			});

			const collectorFilter = i => i.user.id === interaction.user.id;

			try
			{
				const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60000 });

				if (confirmation.costomId === 'comfirm')
				{
					await interaction.guild.members.ban(target);
					await confirmation.update({ content: `${target.username} has been banned for reason: ${reason}`, components: [] });
				}
				else if (confirmation.costomId === 'cancel')
				{
					await confirmation.update({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
				}
			}
			catch (e)
			{
				await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
			}
			// await interaction.editReply(`Banning ${target.username} for reason: ${reason}`);
			// await interaction.guild.members.ban(target);
		}
		else if (interaction.options.getSubcommand() === 'unban')
		{
			await interaction.reply(`Unbanning ${target.username} for reason: ${reason}`);
			await interaction.guild.members.unban(target);
		}
    },
};