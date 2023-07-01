const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildMemberUpdate,
    async execute(oldMember, newMember) {
        console.log(`[INFO] ${Events.GuildMemberUpdate} event fired.`);
        // console.log(`[INFO] interaction: \n${interaction}`);

        // const oldMember = interaction[0];
        // const newMember = interaction[1];

        console.log(`[INFO] oldMember: \n${oldMember}`);
        console.log(`[INFO] newMember: \n${newMember}`);

        if (oldMember.nickname !== newMember.nickname) 
        {
            console.log(`[INFO] ${oldMember.nickname} => ${newMember.nickname}`);
        }
        else
        {
            console.log('[INFO] Nickname not changed.')
        }
    },
};