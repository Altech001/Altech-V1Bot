const { SETTINGS, updateSetting } = require('../utils/settings');

module.exports = {
    name: 'setstickerpackname',
    description: 'Set the sticker pack name.',
    async execute(socket, message, args) {
        try {
            if (!args[0]) {
                await socket.sendMessage(message.key.remoteJid, { 
                    text: '❌ Please provide sticker pack name.' 
                }, { quoted: message });
                return;
            }

            updateSetting(SETTINGS.STICKER_PACK_NAME, args.join(' '));
            await socket.sendMessage(message.key.remoteJid, { 
                text: `✅ Sticker pack name set to: ${args.join(' ')}` 
            }, { quoted: message });
        } catch (error) {
            console.error('Error in setstickerpackname command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to set sticker pack name.' 
            }, { quoted: message });
        }
    }
};
