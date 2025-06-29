module.exports = {
    name: 'join',
    description: 'Join a group using an invite link.',
    async execute(socket, message, args) {
        if (args.length < 1) {
            await socket.sendMessage(message.key.remoteJid, { text: 'Usage: .join <invite_link>' }, { quoted: message });
            return;
        }

        const inviteLink = args[0];
        try {
            // Join the group
            const group = await socket.acceptInvite(inviteLink);
            
            await socket.sendMessage(message.key.remoteJid, { 
                text: `✅ Joined group ${group.subject}`
            }, { quoted: message });
        } catch (error) {
            console.error('Error in join command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to join group. Make sure the link is valid.' 
            }, { quoted: message });
        }
    }
};
