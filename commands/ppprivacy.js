module.exports = {
    name: 'ppprivacy',
    description: 'Toggle profile privacy settings.',
    async execute(socket, message, args) {
        try {
            // Get current privacy settings
            const privacy = await socket.getPrivacy();
            
            // Toggle privacy
            await socket.setPrivacy({
                status: !privacy.status,  // Toggle status privacy
                profile: !privacy.profile // Toggle profile privacy
            });

            const newPrivacy = await socket.getPrivacy();
            const status = newPrivacy.status ? 'private' : 'public';
            const profile = newPrivacy.profile ? 'private' : 'public';

            await socket.sendMessage(message.key.remoteJid, { 
                text: `✅ Privacy settings updated:\nStatus: ${status}\nProfile: ${profile}`
            }, { quoted: message });
        } catch (error) {
            console.error('Error in ppprivacy command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to update privacy settings.' 
            }, { quoted: message });
        }
    }
};
