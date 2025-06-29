module.exports = {
    name: 'autoread',
    description: 'Toggle auto-read messages.',
    async execute(socket, message, args) {
        try {
            // Get current auto-read status
            const currentStatus = await socket.getAutoReadStatus();
            const newStatus = !currentStatus;
            
            // Set new auto-read status
            await socket.setAutoRead(newStatus);
            
            await socket.sendMessage(message.key.remoteJid, { 
                text: `✅ Auto-read is now ${newStatus ? 'enabled' : 'disabled'}`
            }, { quoted: message });
        } catch (error) {
            console.error('Error in autoread command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to toggle auto-read.' 
            }, { quoted: message });
        }
    }
};
