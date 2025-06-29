const menus = require('../menu-structure.js');
const utils = require('../utils.js');

module.exports = {
    name: 'menu',
    description: 'Displays the main menu with all available commands.',
    async execute(socket, message, args, commands) {
        const prefix = '.';  // Ensure we use the same prefix as in command-handler
        let menuText = '';
        
        // Add header
        menuText += `
┏▣ ◈ *LUCO V1* ◈
┃ *ᴏᴡɴᴇʀ* : Altech
┃ *ᴘʀᴇғɪx* : [ . ]
┃ *ʜᴏsᴛ* : Panel
┃ *ᴘʟᴜɢɪɴs* : ${Object.keys(commands).length}
┃ *ᴍᴏᴅᴇ* : Public
┃ *ᴠᴇʀsɪᴏɴ* : 1.7.6
┗▣

`;

        // Add system stats
        const stats = utils.getSystemStats();
        menuText += `
┏▣ *sʏsᴛᴇᴍ sᴛᴀᴛs*
┃ *sᴘᴇᴇᴅ* : ${stats.speed}
┃ *ᴜsᴀɢᴇ* : ${stats.usage}
┃ *ʀᴀᴍ* : ${stats.ram}
┗▣

`;

        // Add each menu section
        for (const [category, commands] of Object.entries(menus.menus)) {
            menuText += `┏▣ ◈  *${category.toUpperCase()} MENU* ◈\n`;
            commands.forEach(cmd => {
                menuText += `│➽ .${cmd}\n`;
            });
            menuText += `┗▣\n\n`;
        }

        await socket.sendMessage(message.key.remoteJid, { 
            text: utils.addFooter(menuText.trim()), 
            quoted: message 
        });
    }
};
