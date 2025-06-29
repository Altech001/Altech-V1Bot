const { SETTINGS, updateSetting } = require('../utils/settings');

module.exports = {
    name: 'setmenuimage',
    description: 'Set the menu image.',
    async execute(socket, message, args) {
        try {
            if (!args[0]) {
                await socket.sendMessage(message.key.remoteJid, { 
                    text: '❌ Please provide a menu image URL.' 
                }, { quoted: message });
                return;
            }

            updateSetting(SETTINGS.MENU_IMAGE, args.join(' '));
            await socket.sendMessage(message.key.remoteJid, { 
                text: `✅ Menu image set to: ${args.join(' ')}` 
            }, { quoted: message });
        } catch (error) {
            console.error('Error in setmenuimage command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to set menu image.' 
            }, { quoted: message });
        }
    }
};
