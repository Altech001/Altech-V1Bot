module.exports = {
    name: 'block',
    description: 'Block a contact.',
    async execute(socket, message, args) {
        if (args.length < 1) {
            await socket.sendMessage(message.key.remoteJid, { text: 'Usage: .block <contact>' }, { quoted: message });
            return;
        }

        const contact = args[0];
        try {
            await socket.blockContact(contact);
            await socket.sendMessage(message.key.remoteJid, { text: `✅ Blocked ${contact}` }, { quoted: message });
        } catch (error) {
            console.error('Error in block command:', error);
            await socket.sendMessage(message.key.remoteJid, { text: '❌ Failed to block contact.' }, { quoted: message });
        }
    }
};
