const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		await interaction.reply('Please enter more input.');
		console.log("new one ---")
		const collectorFilter = m => {
			return interaction.user.id === m.author.id;
			// console.log(interaction.user.id);
			// console.log(m.author.id);
			// console.log(interaction.user.id === m.author.id);
		};
		try 
		{
			const messages = await interaction.channel.awaitMessages({ 
				filter: collectorFilter, 
				time: 10000, 
				max: 1, 
				errors: ['time'] 
			});
			console.log(messages.first());
			interaction.followUp(`You've entered: ${messages.first().content}`);

		} 
		catch (error) 
		{
			interaction.followUp('You did not enter any input!');
		}



		// await interaction.reply('Please enter more input.');

		// interaction.reply('Please enter more input.').then(() => {
		// 	const collectorFilter = m => {
		// 		interaction.user.id === m.author.id
		// 		console.log(interaction.user.id);
		// 		console.log(m.author.id);
		// 		console.log(interaction.user.id === m.author.id);
		// 	};
		
		// 	interaction.channel.awaitMessages({ filter: collectorFilter, time: 10000, max: 1, errors: ['time'] })
		// 		.then(messages => {
		// 			interaction.followUp(`You've entered: ${messages.first().content}`);
		// 		})
		// 		.catch(() => {
		// 			interaction.followUp('You did not enter any input!');
		// 		});
		// });
	},
};