module.exports = {
    name: 'delete',
    description: 'Delete a message.',
    async execute(socket, message, args) {
        try {
            // Delete the quoted message
            await socket.deleteMessage(message.key.remoteJid, message.key.id);
            await socket.sendMessage(message.key.remoteJid, { text: '✅ Message deleted.' }, { quoted: message });
        } catch (error) {
            console.error('Error in delete command:', error);
            await socket.sendMessage(message.key.remoteJid, { text: '❌ Failed to delete message.' }, { quoted: message });
        }
    }
};
