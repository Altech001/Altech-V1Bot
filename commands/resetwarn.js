const { SETTINGS, updateSetting } = require('../utils/settings');

module.exports = {
    name: 'resetwarn',
    description: 'Reset all warning settings.',
    async execute(socket, message, args) {
        try {
            updateSetting(SETTINGS.WARN, '');
            await socket.sendMessage(message.key.remoteJid, { 
                text: '✅ Warning settings reset.' 
            }, { quoted: message });
        } catch (error) {
            console.error('Error in resetwarn command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to reset warning settings.' 
            }, { quoted: message });
        }
    }
};
