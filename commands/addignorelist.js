const utils = require('../utils.js');

module.exports = {
    name: 'addignorelist',
    description: 'Add a contact to the ignore list.',
    async execute(socket, message, args) {
        if (args.length < 1) {
            await socket.sendMessage(message.key.remoteJid, {
                text: 'Usage: .addignorelist <contact>'
            }, { quoted: message });
            return;
        }

        const contact = args[0];
        try {
            // Load existing ignore list
            let ignoreList = JSON.parse(fs.readFileSync('ignorelist.json', 'utf8')) || [];
            
            // Add contact if not already present
            if (!ignoreList.includes(contact)) {
                ignoreList.push(contact);
                fs.writeFileSync('ignorelist.json', JSON.stringify(ignoreList, null, 2));
                
                await socket.sendMessage(message.key.remoteJid, {
                    text: `✅ Added ${contact} to ignore list.\n\n*By altech-v1*`
                }, { quoted: message });
            } else {
                await socket.sendMessage(message.key.remoteJid, {
                    text: `❌ ${contact} is already in the ignore list.\n\n*By altech-v1*`
                }, { quoted: message });
            }
        } catch (error) {
            console.error('Error in addignorelist command:', error);
            await socket.sendMessage(message.key.remoteJid, {
                text: '❌ Failed to add to ignore list.\n\n*By altech-v1*'
            }, { quoted: message });
        }
    }
};
