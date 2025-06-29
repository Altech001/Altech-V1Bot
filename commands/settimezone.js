const { SETTINGS, updateSetting } = require('../utils/settings');

module.exports = {
    name: 'settimezone',
    description: 'Set the timezone.',
    async execute(socket, message, args) {
        try {
            if (!args[0]) {
                await socket.sendMessage(message.key.remoteJid, { 
                    text: '❌ Please provide a timezone (e.g., Asia/Baghdad)' 
                }, { quoted: message });
                return;
            }

            updateSetting(SETTINGS.TIMEZONE, args.join(' '));
            await socket.sendMessage(message.key.remoteJid, { 
                text: `✅ Timezone set to: ${args.join(' ')}` 
            }, { quoted: message });
        } catch (error) {
            console.error('Error in settimezone command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to set timezone.' 
            }, { quoted: message });
        }
    }
};
