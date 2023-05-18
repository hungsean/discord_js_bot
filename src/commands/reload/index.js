const { SlashCommandBuilder } = require('discord.js');
const { collection2array } = require('./function.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads a command.')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('The command to reload.')
				.setRequired(true)
				.setAutocomplete(true)
		),
	async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused(true);
		const commands = collection2array(interaction.client.commands);
		let choices;

		if (focusedOption.name === 'command') {
			choices = commands;
		}

		const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	},


	async execute(interaction) {
		const commandName = interaction.options.getString('command', true).toLowerCase();
		const command = interaction.client.commands.get(commandName);

		if (!command) {
			return interaction.reply(`There is no command with name \`${commandName}\`!`);
		}

		delete require.cache[require.resolve(`../${command.data.name}/index.js`)];

		try {
			interaction.client.commands.delete(command.data.name);
			const newCommand = require(`../${command.data.name}/index.js`);
			interaction.client.commands.set(newCommand.data.name, newCommand);
			await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
		} catch (error) {
			console.error(error);
			await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
		}
	},
};