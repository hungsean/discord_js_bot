const { SlashCommandBuilder } = require('discord.js');
// const {ChannelType} = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Replies with your input!')
		.addStringOption(option =>
			option
				.setName('input')
				.setDescription('The input to echo back')
				.setRequired(true)
		)
		.addStringOption(option =>
			option
				.setName('type')
				.setDescription('which type to choose')
				.setRequired(true)
				.addChoices(
					{ name: 'once', value: 'once' },
					{ name: 'twice', value: 'twice' },
				)
		)
		// .addChannelOption(option =>
        //         option
        //             .setName('channel')
        //             .setDescription('The channel to echo into')
		// 			.addChannelTypes(ChannelType.GuildText)
        //     )
        .addBooleanOption(option =>
			option
				.setName('ephemeral')
				.setDescription('Whetheo or nor the echo should be ephemeral')
		),
	async execute(interaction) {
		const input = interaction.options.getString('input', true);
		const type = interaction.options.getString('type', true) ?? 'once';
		const ephemeral = interaction.options.getBoolean('ephemeral', false);
		// const channel = interaction.options.getChannel('channel', false);
		if (type == 'once')
		{
			await interaction.reply({ content: input, ephemeral: ephemeral });
		}
		else if (type == 'twice')
		{
			await interaction.reply({ content: input + '\n' + input, ephemeral: ephemeral });
		}
		else
		{
			await interaction.reply({ content: 'error type', ephemeral: ephemeral });
		}
	},
};