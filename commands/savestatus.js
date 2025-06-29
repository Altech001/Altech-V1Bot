const axios = require('axios');

module.exports = {
    name: 'savestatus',
    description: 'Download WhatsApp status.',
    async execute(socket, message, args) {
        try {
            if (!args[0]) {
                await socket.sendMessage(message.key.remoteJid, { 
                    text: '❌ Please provide a status URL.' 
                }, { quoted: message });
                return;
            }

            const url = args[0];
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(response.data, 'binary');

            // Check if it's video or image
            const isVideo = url.toLowerCase().endsWith('.mp4');
            
            await socket.sendMessage(message.key.remoteJid, { 
                [isVideo ? 'video' : 'image']: buffer,
                caption: `✅ Here is your ${isVideo ? 'video' : 'image'}!` 
            }, { quoted: message });
        } catch (error) {
            console.error('Error in savestatus command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to download status.' 
            }, { quoted: message });
        }
    }
};
