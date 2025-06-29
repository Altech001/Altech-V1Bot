const { SETTINGS, updateSetting } = require('../utils/settings');

module.exports = {
    name: 'setwatermark',
    description: 'Set the watermark text.',
    async execute(socket, message, args) {
        try {
            if (!args[0]) {
                await socket.sendMessage(message.key.remoteJid, { 
                    text: '❌ Please provide watermark text.' 
                }, { quoted: message });
                return;
            }

            updateSetting(SETTINGS.WATERMARK, args.join(' '));
            await socket.sendMessage(message.key.remoteJid, { 
                text: `✅ Watermark set to: ${args.join(' ')}` 
            }, { quoted: message });
        } catch (error) {
            console.error('Error in setwatermark command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to set watermark.' 
            }, { quoted: message });
        }
    }
};
