const { SETTINGS, getSetting } = require('../utils/settings');

module.exports = {
    name: 'getsettings',
    description: 'Get all current settings.',
    async execute(socket, message, args) {
        try {
            const settingsText = `
*Current Settings:*

┏▣ *Bot Settings*
┃ *Bot Name* : ${getSetting(SETTINGS.BOT_NAME) || 'Not set'}
┃ *Owner Name* : ${getSetting(SETTINGS.OWNER_NAME) || 'Not set'}
┃ *Owner Number* : ${getSetting(SETTINGS.OWNER_NUMBER) || 'Not set'}
┗▣

┏▣ *Media Settings*
┃ *Watermark* : ${getSetting(SETTINGS.WATERMARK) || 'Not set'}
┃ *Sticker Author* : ${getSetting(SETTINGS.STICKER_AUTHOR) || 'Not set'}
┃ *Sticker Pack Name* : ${getSetting(SETTINGS.STICKER_PACK_NAME) || 'Not set'}
┗▣

┏▣ *System Settings*
┃ *Timezone* : ${getSetting(SETTINGS.TIMEZONE) || 'Not set'}
┃ *Context Link* : ${getSetting(SETTINGS.CONTEXT_LINK) || 'Not set'}
┃ *Menu Image* : ${getSetting(SETTINGS.MENU_IMAGE) || 'Not set'}
┃ *Anti-call Message* : ${getSetting(SETTINGS.ANTICALL_MSG) || 'Not set'}
┗▣

┏▣ *Menu Settings*
┃ *Menu* : ${getSetting(SETTINGS.MENU) || 'Not set'}
┃ *Prefix* : ${getSetting(SETTINGS.PREFIX) || 'Not set'}
┃ *Status Emoji* : ${getSetting(SETTINGS.STATUS_EMOJI) || 'Not set'}
┗▣

┏▣ *Warning Settings*
┃ *Warn Message* : ${getSetting(SETTINGS.WARN) || 'Not set'}
┗▣
`;

            await socket.sendMessage(message.key.remoteJid, { 
                text: settingsText 
            }, { quoted: message });
        } catch (error) {
            console.error('Error in getsettings command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to get settings.' 
            }, { quoted: message });
        }
    }
};
