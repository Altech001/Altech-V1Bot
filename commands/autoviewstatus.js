const settings = require('../settings.js');

module.exports = {
    name: 'autoviewstatus',
    description: 'Toggles automatic viewing of status updates.',
    async execute(socket, message, args) {
        settings.autoViewStatus = !settings.autoViewStatus;
        const status = settings.autoViewStatus ? 'enabled' : 'disabled';
        await socket.sendMessage(message.key.remoteJid, { text: `✅ Auto status viewing has been ${status}.` }, { quoted: message });
    }
};
