module.exports = {
    name: 'lastseen',
    description: 'Check when a contact was last seen.',
    async execute(socket, message, args) {
        if (args.length < 1) {
            await socket.sendMessage(message.key.remoteJid, { 
                text: 'Usage: .lastseen <contact>' 
            }, { quoted: message });
            return;
        }

        const contact = args[0];
        try {
            const lastSeen = await socket.getLastSeen(contact);
            const date = new Date(lastSeen * 1000);
            
            await socket.sendMessage(message.key.remoteJid, { 
                text: `Last seen: ${date.toLocaleString()}`
            }, { quoted: message });
        } catch (error) {
            console.error('Error in lastseen command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to get last seen time.' 
            }, { quoted: message });
        }
    }
};
