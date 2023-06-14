const { SlashCommandBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { ModalBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('favorite')
		.setDescription('Input favorite things.'),
	async execute(interaction) {
		const modal = new ModalBuilder()
            .setCustomId('modal')
            .setTitle('Favorite Things');

        const favoriteColor = new TextInputBuilder()
            .setCustomId('favoriteColor')
            .setLabel('Favorite Color')
            .setPlaceholder('Input your favorite color.')
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

        const reason = new TextInputBuilder()
            .setCustomId('reason')
            .setLabel('Reason')
            .setPlaceholder('Input your reason.')
            .setMaxLength(3454)
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph);

        const firstRow = new ActionRowBuilder().addComponents(favoriteColor);
        const secondRow = new ActionRowBuilder().addComponents(reason);

        modal.addComponents(firstRow, secondRow);

        await interaction.showModal(modal);

        const filter = (interaction) => interaction.customId === 'modal';
        const confirmation = await interaction.awaitModalSubmit({ filter, time: 15_000 })
        console.log(`${confirmation.customId} was submitted!`);
        const favoriteColor_reply = confirmation.fields.getTextInputValue('favoriteColor');
        const reason_reply = confirmation.fields.getTextInputValue('reason');
        // console.log({ favoriteColor, reason_reply });
        await confirmation.reply({ content: `Your favorite color is ${favoriteColor_reply} and your reason is ${reason_reply}` });
    },
};