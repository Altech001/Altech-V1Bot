module.exports = {
    name: 'groupid',
    description: 'Get the group ID.',
    async execute(socket, message, args) {
        try {
            const chat = await socket.getChatById(message.key.remoteJid);
            if (!chat.isGroup) {
                await socket.sendMessage(message.key.remoteJid, { 
                    text: '❌ This command only works in groups.' 
                }, { quoted: message });
                return;
            }

            const groupId = chat.id;
            const groupName = chat.name;

            await socket.sendMessage(message.key.remoteJid, { 
                text: `Group ID: ${groupId}\nGroup Name: ${groupName}`
            }, { quoted: message });
        } catch (error) {
            console.error('Error in groupid command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to get group ID.' 
            }, { quoted: message });
        }
    }
};
