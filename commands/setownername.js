const { SETTINGS, updateSetting } = require('../utils/settings');

module.exports = {
    name: 'setownername',
    description: 'Set the owner name.',
    async execute(socket, message, args) {
        try {
            if (!args[0]) {
                await socket.sendMessage(message.key.remoteJid, { 
                    text: '❌ Please provide an owner name.' 
                }, { quoted: message });
                return;
            }

            updateSetting(SETTINGS.OWNER_NAME, args.join(' '));
            await socket.sendMessage(message.key.remoteJid, { 
                text: `✅ Owner name set to: ${args.join(' ')}` 
            }, { quoted: message });
        } catch (error) {
            console.error('Error in setownername command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to set owner name.' 
            }, { quoted: message });
        }
    }
};
