const { SETTINGS, updateSetting } = require('../utils/settings');

module.exports = {
    name: 'setbotname',
    description: 'Set the bot name.',
    async execute(socket, message, args) {
        try {
            if (!args[0]) {
                await socket.sendMessage(message.key.remoteJid, { 
                    text: '❌ Please provide a bot name.' 
                }, { quoted: message });
                return;
            }

            updateSetting(SETTINGS.BOT_NAME, args.join(' '));
            await socket.sendMessage(message.key.remoteJid, { 
                text: `✅ Bot name set to: ${args.join(' ')}` 
            }, { quoted: message });
        } catch (error) {
            console.error('Error in setbotname command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to set bot name.' 
            }, { quoted: message });
        }
    }
};
