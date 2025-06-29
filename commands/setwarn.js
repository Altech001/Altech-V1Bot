const { SETTINGS, updateSetting } = require('../utils/settings');

module.exports = {
    name: 'setwarn',
    description: 'Set the warning message.',
    async execute(socket, message, args) {
        try {
            if (!args[0]) {
                await socket.sendMessage(message.key.remoteJid, { 
                    text: '❌ Please provide a warning message.' 
                }, { quoted: message });
                return;
            }

            updateSetting(SETTINGS.WARN, args.join(' '));
            await socket.sendMessage(message.key.remoteJid, { 
                text: `✅ Warning message set to: ${args.join(' ')}` 
            }, { quoted: message });
        } catch (error) {
            console.error('Error in setwarn command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to set warning message.' 
            }, { quoted: message });
        }
    }
};
