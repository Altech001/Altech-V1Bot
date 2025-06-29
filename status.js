const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    autoStatusSettings: {
        seen: process.env.AUTO_STATUS_SEEN === 'true',
        reply: process.env.AUTO_STATUS_REPLY === 'true',
        react: process.env.AUTO_STATUS_REACT === 'true',
        message: process.env.AUTO_STATUS_MSG
    },

    async handleStatusUpdate(socket, statusMessage) {
        try {
            const settings = this.autoStatusSettings;
            
            // Auto-react to status
            if (settings.react) {
                const hearts = ['❤️', '❤️‍🔥', '❤️‍🩹', '💕', '💖', '✨'];
                const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
                await socket.sendMessage('status@broadcast', {
                    react: { text: randomHeart, key: statusMessage.key }
                });
            }

            // Auto-reply to status
            if (settings.reply) {
                await socket.sendMessage('status@broadcast', {
                    text: settings.message
                });
            }

            // Auto-view status
            if (settings.seen) {
                await socket.readMessages([statusMessage.key]);
            }
        } catch (error) {
            console.error('Error handling status update:', error);
        }
    }
};
