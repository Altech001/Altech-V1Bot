const fs = require('fs');
const path = require('path');

const prefix = '.';
const commands = {};

// Dynamically load all commands from the 'commands' folder
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    try {
        const command = require(`./commands/${file}`);
        if (command.name) {
            commands[command.name] = command;
            console.log(`Loaded command: ${command.name}`);
        } else {
            console.warn(`The command at ${file} is missing a "name" property.`);
        }
    } catch (error) {
        console.error(`Failed to load command at ${file}:`, error);
    }
}

console.log(`Successfully loaded ${Object.keys(commands).length} commands.`);

// The main handler function that gets called for each message
async function handleCommand(socket, message) {
    const messageText = message.message?.conversation || message.message?.extendedTextMessage?.text || '';

    if (!messageText.startsWith(prefix)) {
        return; // Not a command
    }

    const args = messageText.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = commands[commandName];

    if (command) {
        try {
            // Pass the full command list to the execute function
            await command.execute(socket, message, args, commands);
        } catch (error) {
            console.error(`Error executing command '${commandName}':`, error);
            await socket.sendMessage(message.key.remoteJid, { text: `❌ An error occurred while running the .${commandName} command.` }, { quoted: message });
        }
    } else {
        // Handle unknown commands
        await socket.sendMessage(message.key.remoteJid, { text: `❓ Unknown command: .${commandName}\nType .menu to see all available commands.` }, { quoted: message });
    }
}

module.exports = { handleCommand };
