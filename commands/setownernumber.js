const { SETTINGS, updateSetting } = require('../utils/settings');

module.exports = {
    name: 'setownernumber',
    description: 'Set the owner number.',
    async execute(socket, message, args) {
        try {
            if (!args[0]) {
                await socket.sendMessage(message.key.remoteJid, { 
                    text: '❌ Please provide an owner number.' 
                }, { quoted: message });
                return;
            }

            // Validate phone number format
            const number = args[0].replace(/[^0-9]/g, '');
            if (!number) {
                await socket.sendMessage(message.key.remoteJid, { 
                    text: '❌ Invalid phone number format.' 
                }, { quoted: message });
                return;
            }

            updateSetting(SETTINGS.OWNER_NUMBER, number);
            await socket.sendMessage(message.key.remoteJid, { 
                text: `✅ Owner number set to: ${number}` 
            }, { quoted: message });
        } catch (error) {
            console.error('Error in setownernumber command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to set owner number.' 
            }, { quoted: message });
        }
    }
};
