module.exports = {
    name: 'online',
    description: 'Toggle online status.',
    async execute(socket, message, args) {
        try {
            // Get current online status
            const currentStatus = await socket.getOnlineStatus();
            const newStatus = !currentStatus;
            
            // Set new online status
            await socket.setOnline(newStatus);
            
            await socket.sendMessage(message.key.remoteJid, { 
                text: `✅ Online status is now ${newStatus ? 'enabled' : 'disabled'}`
            }, { quoted: message });
        } catch (error) {
            console.error('Error in online command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to toggle online status.' 
            }, { quoted: message });
        }
    }
};
