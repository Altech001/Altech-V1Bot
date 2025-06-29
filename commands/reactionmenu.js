module.exports = {
    name: 'reactionmenu',
    description: 'Show available reaction options.',
    async execute(socket, message, args) {
        const reactionMenu = `
┏▣ ◈ *REACTION MENU* ◈
│➽ 🤝 Handshake
│➽ 👍 Like
│➽ 😍 Love
│➽ 😂 Laugh
│➽ 😱 Surprise
│➽ 🤔 Think
│➽ 🤬 Angry
│➽ ❌ Remove Reaction
┗▣

*Usage:*
.react <contact> <emoji>

*Example:*
.react 1234567890 👍
        `;

        await socket.sendMessage(message.key.remoteJid, { text: reactionMenu }, { quoted: message });
    }
};
