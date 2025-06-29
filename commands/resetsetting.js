const { resetSettings } = require('../utils/settings');

module.exports = {
    name: 'resetsetting',
    description: 'Reset all settings to default.',
    async execute(socket, message, args) {
        try {
            resetSettings();
            await socket.sendMessage(message.key.remoteJid, { 
                text: '✅ All settings reset to default.' 
            }, { quoted: message });
        } catch (error) {
            console.error('Error in resetsetting command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to reset settings.' 
            }, { quoted: message });
        }
    }
};
