const { SETTINGS, getSetting } = require('../utils/settings');

module.exports = {
    name: 'showanticallmsg',
    description: 'Show the current anti-call message.',
    async execute(socket, message, args) {
        try {
            const message = getSetting(SETTINGS.ANTICALL_MSG);
            await socket.sendMessage(message.key.remoteJid, { 
                text: `Current anti-call message: ${message || 'Not set'}` 
            }, { quoted: message });
        } catch (error) {
            console.error('Error in showanticallmsg command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to show anti-call message.' 
            }, { quoted: message });
        }
    }
};
