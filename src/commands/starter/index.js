const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder, ActionRowBuilder } = require('discord.js');
// const { UserSelectMenuBuilder } = require('discord.js');
const { ComponentType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('starter')
        .setDescription('this is a starter'),

	async execute(interaction) {
		const select = new StringSelectMenuBuilder()
			.setCustomId('selection')
			.setPlaceholder('Make a selection!')
			.addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Option')
                    .setValue('option')
                    .setDescription('A selectable option')
                    .setDefault(true),
				new StringSelectMenuOptionBuilder()
					.setLabel('Bulbasaur')
					.setDescription('The dual-type Grass/Poison Seed Pokémon.')
					.setValue('bulbasaur'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Charmander')
					.setDescription('The Fire-type Lizard Pokémon.')
					.setValue('charmander'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Squirtle')
					.setDescription('The Water-type Tiny Turtle Pokémon.')
					.setValue('squirtle'),
			);
        // const userSelect = new UserSelectMenuBuilder()
        //     .setCustomId('users')
        //     .setPlaceholder('Select mutiple users')
        //     .setMinValues(1)
		// 	.setMaxValues(2);


        const selectRow = new ActionRowBuilder()
			.addComponents(select);

		// const userRow = new ActionRowBuilder()
        //     .addComponents(userSelect);

		const response = await interaction.reply({
			content: 'Choose your starter!',
			components: [selectRow],
			ephemeral: true,
		});

		const collector = response.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 3_600_000 });
		console.log('collector complete');

		collector.on('collect', async i =>{
			console.log('collector into');
			const selection = i.values[0];
			await i.reply(`${i.user} has selected ${selection}!`);
		});
	},
};