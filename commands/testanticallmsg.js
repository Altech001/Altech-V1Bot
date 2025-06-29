const { SETTINGS, getSetting } = require('../utils/settings');

module.exports = {
    name: 'testanticallmsg',
    description: 'Test the anti-call message.',
    async execute(socket, message, args) {
        try {
            const message = getSetting(SETTINGS.ANTICALL_MSG);
            if (!message) {
                await socket.sendMessage(message.key.remoteJid, { 
                    text: '❌ No anti-call message set.' 
                }, { quoted: message });
                return;
            }

            // Send the message to self
            await socket.sendMessage(message.key.remoteJid, { 
                text: message
            });
            
            await socket.sendMessage(message.key.remoteJid, { 
                text: '✅ Anti-call message test sent.' 
            }, { quoted: message });
        } catch (error) {
            console.error('Error in testanticallmsg command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to test anti-call message.' 
            }, { quoted: message });
        }
    }
};
