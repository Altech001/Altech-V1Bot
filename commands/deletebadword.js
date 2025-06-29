const utils = require('../utils.js');
const fs = require('fs');

module.exports = {
    name: 'deletebadword',
    description: 'Remove a word from the bad words list.',
    async execute(socket, message, args) {
        if (args.length < 1) {
            await socket.sendMessage(message.key.remoteJid, {
                text: utils.addFooter('Usage: .deletebadword <word>')
            }, { quoted: message });
            return;
        }

        const word = args[0];
        try {
            // Load existing bad words
            let badWords = JSON.parse(fs.readFileSync('badwords.json', 'utf8')) || [];
            
            // Remove word if present
            const index = badWords.indexOf(word);
            if (index > -1) {
                badWords.splice(index, 1);
                fs.writeFileSync('badwords.json', JSON.stringify(badWords, null, 2));
                
                await socket.sendMessage(message.key.remoteJid, {
                    text: utils.addFooter(`✅ Removed '${word}' from bad words list.`)
                }, { quoted: message });
            } else {
                await socket.sendMessage(message.key.remoteJid, {
                    text: utils.addFooter(`❌ '${word}' is not in the bad words list.`)
                }, { quoted: message });
            }
        } catch (error) {
            console.error('Error in deletebadword command:', error);
            await socket.sendMessage(message.key.remoteJid, {
                text: utils.addFooter('❌ Failed to delete bad word.')
            }, { quoted: message });
        }
    }
};
