const { SETTINGS, updateSetting } = require('../utils/settings');

module.exports = {
    name: 'setcontextlink',
    description: 'Set the context link.',
    async execute(socket, message, args) {
        try {
            if (!args[0]) {
                await socket.sendMessage(message.key.remoteJid, { 
                    text: '❌ Please provide a context link.' 
                }, { quoted: message });
                return;
            }

            updateSetting(SETTINGS.CONTEXT_LINK, args.join(' '));
            await socket.sendMessage(message.key.remoteJid, { 
                text: `✅ Context link set to: ${args.join(' ')}` 
            }, { quoted: message });
        } catch (error) {
            console.error('Error in setcontextlink command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to set context link.' 
            }, { quoted: message });
        }
    }
};
