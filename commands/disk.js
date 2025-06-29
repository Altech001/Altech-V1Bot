const os = require('os');

module.exports = {
    name: 'disk',
    description: 'Check disk usage.',
    async execute(socket, message, args) {
        try {
            const total = os.totalmem();
            const free = os.freemem();
            const used = total - free;
            const percentage = ((used / total) * 100).toFixed(2);
            
            const diskInfo = `
┏▣ ◈ *DISK USAGE* ◈
┃ *Total:* ${formatBytes(total)}
┃ *Used:* ${formatBytes(used)}
┃ *Free:* ${formatBytes(free)}
┃ *Usage:* ${percentage}%
┗▣
            `;
            
            await socket.sendMessage(message.key.remoteJid, { text: diskInfo }, { quoted: message });
        } catch (error) {
            console.error('Error in disk command:', error);
            await socket.sendMessage(message.key.remoteJid, { text: '❌ Failed to get disk usage.' }, { quoted: message });
        }
    }
};

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
