const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('genshin')
		.setDescription('about genshin impact')
        .addSubcommand(subcommand =>
            subcommand.setName('redeem_multiple')
            .setDescription('redeem code to multiple accounts')
            .addStringOption(option =>
                option.setName('code')
                .setDescription('code to redeem')
                .setRequired(true)
            )
            .addUserOption(option => 
                option.setName('user')
                .setDescription('user to redeem code to')
                .setRequired(true)
            ),
        )
        .addSubcommand(subcommand =>
            subcommand.setName('set_user')
            .setDescription('to set user')
        ),
	async execute(interaction) {
        const code = interaction.options.getString('code');
        const user = interaction.options.getUser('user');
		await interaction.channel.send(`/redeem兌換 兌換碼: ${code} 遊戲: 原神 使用者: ${user}`);
	},
};