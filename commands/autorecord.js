module.exports = {
    name: 'autorecord',
    description: 'Toggle auto-record messages.',
    async execute(socket, message, args) {
        try {
            // Get current auto-record status
            const currentStatus = await socket.getAutoRecordStatus();
            const newStatus = !currentStatus;
            
            // Set new auto-record status
            await socket.setAutoRecord(newStatus);
            
            await socket.sendMessage(message.key.remoteJid, { 
                text: `✅ Auto-record is now ${newStatus ? 'enabled' : 'disabled'}`
            }, { quoted: message });
        } catch (error) {
            console.error('Error in autorecord command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to toggle auto-record.' 
            }, { quoted: message });
        }
    }
};
