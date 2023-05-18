const { SlashCommandBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { ModalBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('favorate')
		.setDescription('Input favorate things.'),
	async execute(interaction) {
		const modal = new ModalBuilder()
            .setCustomId('modal')
            .setTitle('Favorate Things');

        const favorateColor = new TextInputBuilder()
            .setCustomId('favorateColor')
            .setLabel('Favorate Color')
            .setPlaceholder('Input your favorate color.')
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

        const reason = new TextInputBuilder()
            .setCustomId('reason')
            .setLabel('Reason')
            .setPlaceholder('Input your reason.')
            .setMaxLength(3454)
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph);

        const firstRow = new ActionRowBuilder().addComponents(favorateColor);
        const secondRow = new ActionRowBuilder().addComponents(reason);

        modal.addComponents(firstRow, secondRow);

        await interaction.showModal(modal);

        const filter = (interaction) => interaction.customId === 'modal';
        await interaction.awaitModalSubmit({ filter, time: 15_000 })
            .then(interaction => {
                console.log(`${interaction.customId} was submitted!`);
                const favoriteColor = interaction.fields.getTextInputValue('favorateColor');
                const reason = interaction.fields.getTextInputValue('reason');
                console.log({ favoriteColor, reason });
                interaction.reply({ content: `Your favorate color is ${favoriteColor} and your reason is ${reason}` });
            })
            .catch(console.error);
    },
};