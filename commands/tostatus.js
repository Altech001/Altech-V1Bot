module.exports = {
    name: 'tostatus',
    description: 'Send a message to status.',
    async execute(socket, message, args) {
        if (args.length < 1) {
            await socket.sendMessage(message.key.remoteJid, { 
                text: 'Usage: .tostatus <message>' 
            }, { quoted: message });
            return;
        }

        const statusMessage = args.join(' ');
        try {
            // Send to status
            await socket.setStatus(statusMessage);
            await socket.sendMessage(message.key.remoteJid, { 
                text: `✅ Status updated to: ${statusMessage}`
            }, { quoted: message });
        } catch (error) {
            console.error('Error in tostatus command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to update status.' 
            }, { quoted: message });
        }
    }
};
