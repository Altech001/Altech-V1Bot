const { SETTINGS, getSetting } = require('../utils/settings');

module.exports = {
    name: 'listwarn',
    description: 'List all warning settings.',
    async execute(socket, message, args) {
        try {
            const warnMessage = getSetting(SETTINGS.WARN);
            await socket.sendMessage(message.key.remoteJid, { 
                text: `*Warning Settings:*

Current warning message: ${warnMessage || 'Not set'}` 
            }, { quoted: message });
        } catch (error) {
            console.error('Error in listwarn command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to list warning settings.' 
            }, { quoted: message });
        }
    }
};
