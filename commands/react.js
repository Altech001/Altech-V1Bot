module.exports = {
    name: 'react',
    description: 'React to a status update with a specific emoji.',
    async execute(socket, message, args) {
        if (args.length < 2) {
            await socket.sendMessage(message.key.remoteJid, { text: 'Usage: .react <contact> <emoji>' }, { quoted: message });
            return;
        }

        const contact = args[0];
        const emoji = args[1];

        try {
            // Get the status message (this is a placeholder - you'll need to implement the actual status fetching)
            const statusMessage = await socket.getStatusMessage(contact);
            if (statusMessage) {
                await socket.sendMessage(statusMessage.key.remoteJid, {
                    react: { text: emoji, key: statusMessage.key }
                });
                await socket.sendMessage(message.key.remoteJid, { text: `✅ Reacted to ${contact}'s status with ${emoji}` }, { quoted: message });
            } else {
                await socket.sendMessage(message.key.remoteJid, { text: '❌ Could not find the status update.' }, { quoted: message });
            }
        } catch (error) {
            console.error('Error in react command:', error);
            await socket.sendMessage(message.key.remoteJid, { text: '❌ Failed to react to the status.' }, { quoted: message });
        }
    }
};
