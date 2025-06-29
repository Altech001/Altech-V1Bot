const utils = require('../utils.js');

module.exports = {
    name: 'autoreactstatus',
    description: 'Toggle automatic reactions to status updates with random heart emojis.',
    async execute(socket, message, args) {
        try {
            // Get all chats
            const chats = await socket.loadAllChats();
            
            // Find the status broadcast chat
            const statusChat = chats.find(chat => chat.id === 'status@broadcast');
            if (!statusChat) {
                throw new Error('Could not find status broadcast');
            }

            // Get the latest status update
            const statusMessages = await socket.loadMessages(statusChat.id, 1);
            if (statusMessages.length === 0) {
                throw new Error('No status updates found');
            }

            const statusMessage = statusMessages[0];
            const hearts = ['❤️', '❤️‍🔥', '❤️‍🩹', '💕', '💖', '✨'];
            const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];

            // React to the status
            await socket.sendMessage(statusChat.id, {
                react: { text: randomHeart, key: statusMessage.key }
            });

            await socket.sendMessage(message.key.remoteJid, {
                text: utils.addFooter(`✅ Reacted to status with ${randomHeart}\nAvailable hearts: ${hearts.join(' ')}`)
            }, { quoted: message });
        } catch (error) {
            console.error('Error in autoreactstatus command:', error);
            await socket.sendMessage(message.key.remoteJid, {
                text: utils.addFooter('❌ Failed to react to status.')
            }, { quoted: message });
        }
    }
};
