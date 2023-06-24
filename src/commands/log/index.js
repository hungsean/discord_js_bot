const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('log')
		.setDescription('log anything')
        .addSubcommand(subcommand =>
            subcommand
                .setName('interaction')
                .setDescription('log interaction'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('log user')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('The user to show info about')
                        .setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('channel')
                .setDescription('log channel')
                .addChannelOption(option =>
                    option.setName('channel')
                        .setDescription('The channel to show info about')
                        .setRequired(true)),
        )
        
        
        ,
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'interaction')
        {
            await interaction.reply('logging')
            console.log(interaction);
            await interaction.channel.send('interaction log successful');
        }
        if (interaction.options.getSubcommand() === 'channel')
        {
            const channel = interaction.options.getChannel('channel');
            await interaction.reply('logging')
            console.log(channel);
            await interaction.channel.send('channel log successful');
        }

        else
        {
            await interaction.reply('Building, please wait...')
        }  
	},
};