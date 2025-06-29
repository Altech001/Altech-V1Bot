const utils = require('../utils.js');

module.exports = {
    name: 'catbox',
    description: 'Upload a file to Catbox and get a shareable URL.',
    async execute(socket, message, args) {
        try {
            // Check if message has media
            if (!message.message?.documentMessage && !message.message?.imageMessage && !message.message?.videoMessage) {
                await socket.sendMessage(message.key.remoteJid, {
                    text: utils.addFooter('Please reply to a message with a file to upload.')
                }, { quoted: message });
                return;
            }

            // Get the file from the message
            const file = await socket.downloadMediaMessage(message);

            // Upload to Catbox using utils function
            const url = await utils.uploadToCatbox(file);

            await socket.sendMessage(message.key.remoteJid, {
                text: utils.addFooter(`✅ File uploaded successfully!\n\nURL: ${url}`)
            }, { quoted: message });
        } catch (error) {
            console.error('Error in catbox command:', error);
            await socket.sendMessage(message.key.remoteJid, {
                text: utils.addFooter('❌ Failed to upload file.')
            }, { quoted: message });
        }
    }
};
