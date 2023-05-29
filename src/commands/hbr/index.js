const { SlashCommandBuilder } = require('discord.js');
const { timeToMicroSeconds } = require('./function');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hbr')
		.setDescription('Replies with your input!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('timer')
                .setDescription('Calculates the time')
                .addIntegerOption(option =>
                    option.setName('stone')
                        .setDescription('The amount of stone you have')
                        .setRequired(true)
                        .setMinValue(0)
                        .setMaxValue(4)
                )
                .addIntegerOption(option =>
                    option.setName('hour')
                        .setDescription('How many hours left')
                        .setRequired(true)
                        .setMinValue(0)
                        .setMaxValue(4)
                )
                .addIntegerOption(option =>
                    option.setName('minute')
                        .setDescription('How many minutes left')
                        .setRequired(true)
                        .setMinValue(0)
                        .setMaxValue(59)
                )
                .addIntegerOption(option =>
                    option.setName('second')
                        .setDescription('How many seconds left')
                        .setRequired(true)
                        .setMinValue(0)
                        .setMaxValue(59)
                )
        ),
	async execute(interaction) {
        const now = new Date();
        const timeStamp = now.getTime();
        const stone = interaction.options.getInteger('stone');
        const hour = interaction.options.getInteger('hour');
        const minute = interaction.options.getInteger('minute');
        const second = interaction.options.getInteger('second');
        const timeLeft = (4 - stone) * 4 * 3600 * 1000 + timeToMicroSeconds(hour, minute, second);
        const finishTime = new Date(timeStamp + timeLeft);

        if (now.getDate() === finishTime.getDate())
        {
            await interaction.reply(`Your HBR will finish at ${finishTime.getHours()}:${finishTime.getMinutes()}`);
        }
        else
        {
            await interaction.reply(`Your HBR will finish at ${finishTime.getHours()}:${finishTime.getMinutes()} tomorrow`);
        }

	},
};