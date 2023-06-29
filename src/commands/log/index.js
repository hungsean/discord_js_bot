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
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('property')
                        .setDescription('The user property to show info about')
                        .addChoices(
                            {name: 'accent color', value: 'accentColor'},
                            {name: 'avatar', value: 'avatar'},
                            {name: 'banner', value: 'banner'},
                            {name: 'banner url', value: 'bannerURL'},
                            {name: 'default avatar URL', value: 'defaultAvatarURL'},
                            {name: 'dm channel', value: 'dmChannel'},
                            {name: 'flags', value: 'flags'},
                            {name: 'hex accent color', value: 'hexAccentColor'},
                            {name: 'id', value: 'id'},
                            {name: 'partial', value: 'partial'},
                            {name: 'presence', value: 'presence'},
                            {name: 'system', value: 'system'},
                            {name: 'tag', value: 'tag'},
                            {name: 'username', value: 'username'},
                            {name: 'verified', value: 'verified'}
                        )
                ),
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
        .addSubcommand(subcommand =>
            subcommand
                .setName('online')
                .setDescription('log online')
        )
        ,
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'interaction')
        {
            await interaction.reply('logging')
            console.log(interaction);
            await interaction.channel.send('interaction log successful');
        }
        if (interaction.options.getSubcommand() === 'user')
        {
            const user = interaction.options.getUser('user');
            const property = interaction.options.getString('property');
            await interaction.reply('logging')
            const userProperty = user[property];
            console.log(userProperty);
            // await interaction.channel.send(userProperty);
            await interaction.channel.send('user log successful');
        }


        if (interaction.options.getSubcommand() === 'channel')
        {
            const channel = interaction.options.getChannel('channel');
            await interaction.reply('logging')
            console.log(channel);
            await interaction.channel.send('channel log successful');
        }
        if (interaction.options.getSubcommand() === 'online')
        {
            await interaction.reply('logging')
            try
            {
                const fetchedMembers = await interaction.guild.members.fetch(); 
                console.log(fetchedMembers);
                const onlineMembers = fetchedMembers.filter(member => member.presence?.status === 'online');
                console.log(onlineMembers);
                console.log(onlineMembers.size);
                let returnedMembers = ``;
                
                for (const member of onlineMembers)
                {
                    const guildMember = member[1];
                    returnedMembers += `${guildMember.user}\n`;
                }
                await interaction.channel.send(returnedMembers);

                await interaction.channel.send('online log successful');
            }
            catch (error)
            {
                console.log(error);
                await interaction.channel.send('online log failed');
            }
            
        }

        else
        {
            await interaction.reply('Building, please wait...')
        }  
	},
};