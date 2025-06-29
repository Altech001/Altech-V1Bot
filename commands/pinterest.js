const axios = require('axios');

module.exports = {
    name: 'pinterest',
    description: 'Download image from Pinterest.',
    async execute(socket, message, args) {
        try {
            if (!args[0]) {
                await socket.sendMessage(message.key.remoteJid, { 
                    text: '❌ Please provide a Pinterest image URL.' 
                }, { quoted: message });
                return;
            }

            const url = args[0];
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(response.data, 'binary');

            await socket.sendMessage(message.key.remoteJid, { 
                image: buffer,
                caption: '✅ Here is your Pinterest image!' 
            }, { quoted: message });
        } catch (error) {
            console.error('Error in pinterest command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to download Pinterest image.' 
            }, { quoted: message });
        }
    }
};
