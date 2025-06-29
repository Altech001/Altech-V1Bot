const settings = require('../settings.js');

module.exports = {
    name: 'autoreact',
    description: 'Toggles automatic reactions to messages.',
    async execute(socket, message, args) {
        settings.autoReact = !settings.autoReact;
        const status = settings.autoReact ? 'enabled' : 'disabled';
        await socket.sendMessage(message.key.remoteJid, { text: `✅ Auto-react has been ${status} with the emoji: ${settings.reactionEmoji}` }, { quoted: message });
    }
};
