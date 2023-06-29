// import { MessageEmbed } from 'discord.js';

module.exports = {
    /*
    ['accent color', 'accentColor'],
    ['avatar', 'avatar'],
    ['banner', 'banner'],
    ['banner url', 'bannerURL'],
    ['default avatar URL', 'defaultAvatarURL'],
    ['dm channel', 'dmChannel'],
    ['flags', 'flags'],
    ['hex accent color', 'hexAccentColor'],
    ['id', 'id'],
    ['partial', 'partial'],
    ['presence', 'presence'],
    ['system', 'system'],
    ['tag', 'tag'],
    ['username', 'username'],
    ['verified', 'verified'],
    */
    userLog(user, property) {
        if (property === 'accentColor') {
            return user.accentColor;
        }
        else if (property === 'avatar') {
            return user.avatar;
        }
        else if (property === 'banner') {
            return user.banner;
        }
        else if (property === 'bannerURL') {
            return user.bannerURL();
        }
        else if (property === 'defaultAvatarURL') {
            return user.defaultAvatarURL();
        }
        else if (property === 'dmChannel') {
            return user.dmChannel;
        }
        else if (property === 'flags') {
            return user.flags;
        }
        else if (property === 'hexAccentColor') {
            return user.hexAccentColor;
        }
        else if (property === 'id') {
            return user.id;
        }
        else if (property === 'partial') {
            return user.partial;
        }
        else if (property === 'presence') {
            return user.presence;
        }
        else if (property === 'system') {
            return user.system;
        }
        else if (property === 'tag') {
            return user.tag;
        }
        else if (property === 'username') {
            return user.username;
        }
        else if (property === 'verified') {
            return user.verified;
        }
        else {
            return 'error';
        }

    }
}