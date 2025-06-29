const axios = require('axios');

module.exports = {
    name: 'telesticker',
    description: 'Convert Telegram sticker to WhatsApp sticker.',
    async execute(socket, message, args) {
        try {
            if (!args[0]) {
                await socket.sendMessage(message.key.remoteJid, { 
                    text: '❌ Please provide a Telegram sticker URL.' 
                }, { quoted: message });
                return;
            }

            const url = args[0];
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(response.data, 'binary');

            await socket.sendMessage(message.key.remoteJid, { 
                sticker: buffer
            }, { quoted: message });
        } catch (error) {
            console.error('Error in telesticker command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to convert Telegram sticker.' 
            }, { quoted: message });
        }
    }
};
