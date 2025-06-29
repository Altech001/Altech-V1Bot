module.exports = {
    name: 'setautoreactemoji',
    description: 'Set the emoji for auto-reactions.',
    async execute(socket, message, args) {
        try {
            if (!args[0]) {
                await socket.sendMessage(message.key.remoteJid, { 
                    text: '❌ Please provide an emoji to use for auto-reactions.' 
                }, { quoted: message });
                return;
            }

            // Update .env file
            const fs = require('fs');
            const path = require('path');
            const envPath = path.join(__dirname, '..', '.env');
            
            // Read current .env
            let envContent = fs.readFileSync(envPath, 'utf8');
            
            // Update AUTO_REACT_EMOJI
            envContent = envContent.replace(/AUTO_REACT_EMOJI=[^\n]*/, `AUTO_REACT_EMOJI=${args[0]}`);
            
            // Write back to .env
            fs.writeFileSync(envPath, envContent);
            
            await socket.sendMessage(message.key.remoteJid, { 
                text: `✅ Auto-react emoji changed to: ${args[0]}` 
            }, { quoted: message });
        } catch (error) {
            console.error('Error in setautoreactemoji command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to set auto-react emoji.' 
            }, { quoted: message });
        }
    }
};
