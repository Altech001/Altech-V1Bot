module.exports = {
    name: 'deljunk',
    description: 'Delete junk messages.',
    async execute(socket, message, args) {
        try {
            // Get chat history
            const chat = await socket.getChatById(message.key.remoteJid);
            const messages = await chat.loadMessages(100); // Load last 100 messages
            
            // Filter and delete junk messages (this is a basic example - you might want to adjust the criteria)
            const messagesToDelete = messages.filter(msg => 
                !msg.key.fromMe && 
                (msg.message?.conversation?.length > 1000 || // Long messages
                 msg.message?.imageMessage || // Images
                 msg.message?.videoMessage) // Videos
            );

            for (const msg of messagesToDelete) {
                await socket.deleteMessage(msg.key.remoteJid, msg.key.id);
            }

            await socket.sendMessage(message.key.remoteJid, { 
                text: `✅ Deleted ${messagesToDelete.length} junk messages.` 
            }, { quoted: message });

        } catch (error) {
            console.error('Error in deljunk command:', error);
            await socket.sendMessage(message.key.remoteJid, { text: '❌ Failed to delete junk messages.' }, { quoted: message });
        }
    }
};
