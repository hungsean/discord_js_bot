const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('guide')
		.setDescription('Search discordjs.guide!')
		.addStringOption(option =>
			option.setName('query')
				.setDescription('Phrase to search for')
				.setAutocomplete(true)
		)
		.addStringOption(option =>
			option.setName('version')
				.setDescription('Version to search in')
				.addChoices(
					{ name: 'v9', value: 'v9' },
					{ name: 'v11', value: 'v11' }
				)
		),
	async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused(true);
		let choices;


		if (focusedOption.name === 'query') {
			choices = ['Popular Topics: Threads', 'Sharding: Getting started', 'Library: Voice Connections', 'Interactions: Replying to slash commands', 'Popular Topics: Embed preview'];
		}

		const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	},
	async execute(interaction)
	{
		const query = interaction.options.getString('query');
		const version = interaction.options.getString('version');

		await interaction.reply(`query: ${query}, version: ${version}`);
	}
};
