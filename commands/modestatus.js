const { readFileSync } = require('fs');
const path = require('path');

// List of available reaction emojis
const REACTION_EMOJIS = ['❤️', '👍', '😂', '😢', '🎉', '🤔', '👀', '💪', '🤩', '😘'];

module.exports = {
    name: 'modestatus',
    description: 'Check the current mode and settings status.',
    async execute(socket, message, args) {
        try {
            // Get current mode
            const mode = await socket.getMode();
            
            // Read settings from .env
            const settings = {
                AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN === 'true',
                AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY === 'true',
                AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT === 'true',
                AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || 'Default status message',
                AUTO_REACT_EMOJI: process.env.AUTO_REACT_EMOJI || '❤️',
                AUTO_REACT_MESSAGES: process.env.AUTO_REACT_MESSAGES === 'true',
                AUTO_REACT_MEDIA: process.env.AUTO_REACT_MEDIA === 'true',
                AUTO_REACT_RANDOM: process.env.AUTO_REACT_RANDOM === 'true',
                AUTO_REACT_EMOJIS: process.env.AUTO_REACT_EMOJIS ? process.env.AUTO_REACT_EMOJIS.split(',') : REACTION_EMOJIS
            };

            // Build settings message
            let settingsText = `*Current Mode: ${mode}*

*Auto-Status Settings:*
`; 

            // Add auto-status settings
            settingsText += `
┏▣ *Auto-Status*
┃ *Seen* : ${settings.AUTO_STATUS_SEEN ? '✅ Enabled' : '❌ Disabled'}
┃ *Reply* : ${settings.AUTO_STATUS_REPLY ? '✅ Enabled' : '❌ Disabled'}
┃ *React* : ${settings.AUTO_STATUS_REACT ? '✅ Enabled' : '❌ Disabled'}
┃ *Message* : ${settings.AUTO_STATUS_MSG}
┗▣

*Auto-React Settings*
┏▣ *Reaction Type*
┃ *Random* : ${settings.AUTO_REACT_RANDOM ? '✅ Enabled' : '❌ Disabled'}
┃ *Current Emoji* : ${settings.AUTO_REACT_EMOJI}
┗▣

┏▣ *Available Emojis*
${settings.AUTO_REACT_EMOJIS.map(emoji => `┃ ${emoji}`).join('\n')}
┗▣

┏▣ *Message Reactions*
┃ *Enabled* : ${settings.AUTO_REACT_MESSAGES ? '✅ Enabled' : '❌ Disabled'}
┗▣

┏▣ *Media Reactions*
┃ *Enabled* : ${settings.AUTO_REACT_MEDIA ? '✅ Enabled' : '❌ Disabled'}
┗▣

*Other Settings*
`; 

            await socket.sendMessage(message.key.remoteJid, { 
                text: settingsText
            }, { quoted: message });
        } catch (error) {
            console.error('Error in modestatus command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to get settings status.' 
            }, { quoted: message });
        }
    }
};
