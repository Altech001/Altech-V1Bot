module.exports = {
    name: 'setautoreactrandom',
    description: 'Toggle random reactions for auto-react.',
    async execute(socket, message, args) {
        try {
            // Update .env file
            const fs = require('fs');
            const path = require('path');
            const envPath = path.join(__dirname, '..', '.env');
            
            // Read current .env
            let envContent = fs.readFileSync(envPath, 'utf8');
            
            // Get current value
            const currentValue = envContent.match(/AUTO_REACT_RANDOM=(true|false)/)?.[1] === 'true';
            
            // Toggle value
            const newValue = currentValue ? 'false' : 'true';
            
            // Update AUTO_REACT_RANDOM
            envContent = envContent.replace(/AUTO_REACT_RANDOM=[^\n]*/, `AUTO_REACT_RANDOM=${newValue}`);
            
            // Write back to .env
            fs.writeFileSync(envPath, envContent);
            
            await socket.sendMessage(message.key.remoteJid, { 
                text: `✅ Auto-react random reactions ${newValue === 'true' ? 'enabled' : 'disabled'}` 
            }, { quoted: message });
        } catch (error) {
            console.error('Error in setautoreactrandom command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to toggle auto-react random reactions.' 
            }, { quoted: message });
        }
    }
};
