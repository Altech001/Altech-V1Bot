const axios = require('axios');

module.exports = {
    name: 'tiktok',
    description: 'Download TikTok video.',
    async execute(socket, message, args) {
        try {
            if (!args[0]) {
                await socket.sendMessage(message.key.remoteJid, { 
                    text: '❌ Please provide a TikTok video URL.' 
                }, { quoted: message });
                return;
            }

            const url = args[0];
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(response.data, 'binary');

            await socket.sendMessage(message.key.remoteJid, { 
                video: buffer,
                caption: '✅ Here is your TikTok video!' 
            }, { quoted: message });
        } catch (error) {
            console.error('Error in tiktok command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to download TikTok video.' 
            }, { quoted: message });
        }
    }
};
