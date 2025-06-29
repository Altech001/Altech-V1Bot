const { SETTINGS, updateSetting } = require('../utils/settings');

module.exports = {
    name: 'setstickerauthor',
    description: 'Set the sticker author name.',
    async execute(socket, message, args) {
        try {
            if (!args[0]) {
                await socket.sendMessage(message.key.remoteJid, { 
                    text: '❌ Please provide sticker author name.' 
                }, { quoted: message });
                return;
            }

            updateSetting(SETTINGS.STICKER_AUTHOR, args.join(' '));
            await socket.sendMessage(message.key.remoteJid, { 
                text: `✅ Sticker author set to: ${args.join(' ')}` 
            }, { quoted: message });
        } catch (error) {
            console.error('Error in setstickerauthor command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to set sticker author.' 
            }, { quoted: message });
        }
    }
};
