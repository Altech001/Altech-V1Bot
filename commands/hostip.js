const os = require('os');

module.exports = {
    name: 'hostip',
    description: 'Show host IP addresses.',
    async execute(socket, message, args) {
        try {
            const networkInterfaces = os.networkInterfaces();
            let ipInfo = 'Host IP Addresses:\n\n';

            Object.keys(networkInterfaces).forEach(interfaceName => {
                networkInterfaces[interfaceName].forEach(details => {
                    if (details.family === 'IPv4' && !details.internal) {
                        ipInfo += `${interfaceName}: ${details.address}\n`;
                    }
                });
            });

            await socket.sendMessage(message.key.remoteJid, { 
                text: ipInfo 
            }, { quoted: message });
        } catch (error) {
            console.error('Error in hostip command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to get host IP addresses.' 
            }, { quoted: message });
        }
    }
};
