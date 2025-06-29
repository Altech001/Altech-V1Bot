module.exports = {
    name: 'autorecordtyping',
    description: 'Toggle auto-record typing indicator.',
    async execute(socket, message, args) {
        try {
            // Get current auto-record typing status
            const currentStatus = await socket.getAutoRecordTypingStatus();
            const newStatus = !currentStatus;
            
            // Set new auto-record typing status
            await socket.setAutoRecordTyping(newStatus);
            
            await socket.sendMessage(message.key.remoteJid, { 
                text: `✅ Auto-record typing is now ${newStatus ? 'enabled' : 'disabled'}`
            }, { quoted: message });
        } catch (error) {
            console.error('Error in autorecordtyping command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to toggle auto-record typing.' 
            }, { quoted: message });
        }
    }
};
