module.exports = {
    name: 'ping',
    description: 'Checks the bot\'s responsiveness.',
    async execute(socket, message, args) {
        const startTime = Date.now();
        // Simulate a small delay to get a more realistic speed reading
        await new Promise(resolve => setTimeout(resolve, 50));
        const speed = (Date.now() - startTime) + ' ms';
        await socket.sendMessage(message.key.remoteJid, { text: `Pong! 🏓\nSpeed: ${speed}` }, { quoted: message });
    }
};
