module.exports = {
    name: 'leave',
    description: 'Leave the current group.',
    async execute(socket, message, args) {
        try {
            const chat = await socket.getChatById(message.key.remoteJid);
            if (!chat.isGroup) {
                await socket.sendMessage(message.key.remoteJid, { 
                    text: '❌ This command only works in groups.' 
                }, { quoted: message });
                return;
            }

            await socket.leaveGroup(chat.id);
            await socket.sendMessage(message.key.remoteJid, { 
                text: `✅ Left group ${chat.name}`
            }, { quoted: message });
        } catch (error) {
            console.error('Error in leave command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to leave group.' 
            }, { quoted: message });
        }
    }
};
