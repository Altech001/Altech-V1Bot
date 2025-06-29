module.exports = {
    name: 'gcaddprivacy',
    description: 'Add privacy settings to a group.',
    async execute(socket, message, args) {
        if (args.length < 1) {
            await socket.sendMessage(message.key.remoteJid, { text: 'Usage: .gcaddprivacy <group_id>' }, { quoted: message });
            return;
        }

        const groupId = args[0];
        try {
            // Get the group
            const group = await socket.getGroup(groupId);
            
            // Set privacy settings
            await socket.setGroupPrivacy(groupId, {
                announce: true, // Only admins can send messages
                invite: true,   // Only admins can invite
                read_only: true // Group is read-only
            });

            await socket.sendMessage(message.key.remoteJid, { 
                text: `✅ Privacy settings added to group ${groupId}`
            }, { quoted: message });
        } catch (error) {
            console.error('Error in gcaddprivacy command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to add privacy settings. Make sure you are an admin.' 
            }, { quoted: message });
        }
    }
};
