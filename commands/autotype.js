const utils = require('../utils.js');

module.exports = {
    name: 'autotype',
    description: 'Toggle auto-typing indicator.',
    async execute(socket, message, args) {
        try {
            // Get current auto-type status
            const currentStatus = await socket.getAutoTypeStatus();
            const newStatus = !currentStatus;
            
            // Set new auto-type status
            await socket.setAutoType(newStatus);
            
            await socket.sendMessage(message.key.remoteJid, {
                text: `✅ Auto-typing is now ${newStatus ? 'enabled' : 'disabled'}.\n\n*By altech-v1*`
            }, { quoted: message });
        } catch (error) {
            console.error('Error in autotype command:', error);
            await socket.sendMessage(message.key.remoteJid, {
                text: '❌ Failed to toggle auto-typing.\n\n*By altech-v1*'
            }, { quoted: message });
        }
    }
};
