module.exports = {
    name: 'toviewonce',
    description: 'View a specific status update once.',
    async execute(socket, message, args) {
        if (args.length < 1) {
            await socket.sendMessage(message.key.remoteJid, { text: 'Usage: .toviewonce <contact>' }, { quoted: message });
            return;
        }

        const contact = args[0];

        try {
            // Get the status message (this is a placeholder - you'll need to implement the actual status fetching)
            const statusMessage = await socket.getStatusMessage(contact);
            if (statusMessage) {
                await socket.readMessages([statusMessage.key]);
                await socket.sendMessage(message.key.remoteJid, { text: `✅ Viewed ${contact}'s status once.` }, { quoted: message });
            } else {
                await socket.sendMessage(message.key.remoteJid, { text: '❌ Could not find the status update.' }, { quoted: message });
            }
        } catch (error) {
            console.error('Error in toviewonce command:', error);
            await socket.sendMessage(message.key.remoteJid, { text: '❌ Failed to view the status.' }, { quoted: message });
        }
    }
};
