const utils = require('../utils.js');

module.exports = {
    name: 'antibug',
    description: 'Toggle anti-bug protection.',
    async execute(socket, message, args) {
        try {
            // Load settings
            const settings = JSON.parse(fs.readFileSync('settings.json', 'utf8')) || {};
            
            // Toggle antibug
            settings.antibug = !settings.antibug;
            fs.writeFileSync('settings.json', JSON.stringify(settings, null, 2));
            
            await socket.sendMessage(message.key.remoteJid, {
                text: `✅ Anti-bug protection is now ${settings.antibug ? 'enabled' : 'disabled'}.\n\n*By altech-v1*`
            }, { quoted: message });
        } catch (error) {
            console.error('Error in antibug command:', error);
            await socket.sendMessage(message.key.remoteJid, {
                text: '❌ Failed to toggle anti-bug protection.\n\n*By altech-v1*'
            }, { quoted: message });
        }
    }
};
