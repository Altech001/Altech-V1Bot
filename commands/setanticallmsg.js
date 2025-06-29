const { SETTINGS, updateSetting } = require('../utils/settings');

module.exports = {
    name: 'setanticallmsg',
    description: 'Set the anti-call message.',
    async execute(socket, message, args) {
        try {
            if (!args[0]) {
                await socket.sendMessage(message.key.remoteJid, { 
                    text: '❌ Please provide an anti-call message.' 
                }, { quoted: message });
                return;
            }

            updateSetting(SETTINGS.ANTICALL_MSG, args.join(' '));
            await socket.sendMessage(message.key.remoteJid, { 
                text: `✅ Anti-call message set to: ${args.join(' ')}` 
            }, { quoted: message });
        } catch (error) {
            console.error('Error in setanticallmsg command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to set anti-call message.' 
            }, { quoted: message });
        }
    }
};
