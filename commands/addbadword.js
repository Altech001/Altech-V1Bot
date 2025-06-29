const utils = require('../utils.js');

module.exports = {
    name: 'addbadword',
    description: 'Add a word to the bad words list.',
    async execute(socket, message, args) {
        if (args.length < 1) {
            await socket.sendMessage(message.key.remoteJid, {
                text: 'Usage: .addbadword <word>'
            }, { quoted: message });
            return;
        }

        const word = args[0];
        try {
            // Load existing bad words
            let badWords = JSON.parse(fs.readFileSync('badwords.json', 'utf8')) || [];
            
            // Add new word if not already present
            if (!badWords.includes(word)) {
                badWords.push(word);
                fs.writeFileSync('badwords.json', JSON.stringify(badWords, null, 2));
                
                await socket.sendMessage(message.key.remoteJid, {
                    text: `✅ Added '${word}' to bad words list.\n\n*By altech-v1*`
                }, { quoted: message });
            } else {
                await socket.sendMessage(message.key.remoteJid, {
                    text: `❌ '${word}' is already in the bad words list.\n\n*By altech-v1*`
                }, { quoted: message });
            }
        } catch (error) {
            console.error('Error in addbadword command:', error);
            await socket.sendMessage(message.key.remoteJid, {
                text: '❌ Failed to add bad word.\n\n*By altech-v1*'
            }, { quoted: message });
        }
    }
};
