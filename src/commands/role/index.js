const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('about role')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add a role')
                .addRoleOption(option => 
                    option.setName('role')
                    .setDescription('The role to add')
                    .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove a role')
                .addRoleOption(option =>
                    option.setName('role')
                    .setDescription('The role to remove')
                    .setRequired(true)
                )
        ),
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'add')
        {
            const role = interaction.options.getRole('role');
            const member_role = interaction.member.roles.cache.find(r => r.name === role.name);
            if (member_role)
            {
                await interaction.reply(`You already have the role ${role} !`);
                return;
            }
            await interaction.member.roles.add(role);
            await interaction.reply(`Role ${role} added!`);
        }
        else if (interaction.options.getSubcommand() === 'remove')
        {
            const role = interaction.options.getRole('role');
            const member_role = interaction.member.roles.cache.find(r => r.name === role.name);
            if (!member_role)
            {
                await interaction.reply(`You don't have the role ${role} !`);
                return;
            }
            await interaction.member.roles.remove(role);
            await interaction.reply(`Role ${role} removed!`);
        }
	},
};