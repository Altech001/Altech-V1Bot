const { SETTINGS, updateSetting } = require('../utils/settings');

module.exports = {
    name: 'delanticallmsg',
    description: 'Delete the anti-call message.',
    async execute(socket, message, args) {
        try {
            updateSetting(SETTINGS.ANTICALL_MSG, '');
            await socket.sendMessage(message.key.remoteJid, { 
                text: '✅ Anti-call message deleted.' 
            }, { quoted: message });
        } catch (error) {
            console.error('Error in delanticallmsg command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to delete anti-call message.' 
            }, { quoted: message });
        }
    }
};
