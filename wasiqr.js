const {
    default: makeWASocket,
    useMultiFileAuthState,
    Browsers,
    delay,
    DisconnectReason,
} = require('@whiskeysockets/baileys');
const express = require('express');
const QRCode = require('qrcode');
const pino = require('pino');
const fs = require('fs');
const path = require('path');

// Create express app
const app = express();
const port = process.env.PORT || 3000;

// Simple route to keep the server alive
app.get('/', (req, res) => {
    res.send('Luco Bot is running');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Global variables to hold the socket instance and QR code
let sock;
let qrCode;

// Function to clean up session files
function cleanupSession(sessionDir) {
    if (fs.existsSync(sessionDir)) {
        fs.rmSync(sessionDir, { recursive: true, force: true });
        console.log(`Cleaned up session directory: ${sessionDir}`);
    }
}

altechNote = 
`
`

altechNote = 
`

`
// The main function to connect to WhatsApp
async function connectToWhatsApp() {
    const sessionDir = path.join(__dirname, '..', 'temp', 'wasi-session');
    const { state, saveCreds } = await useMultiFileAuthState(sessionDir);

    sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: 'silent' }),
        browser: Browsers.macOS('Desktop'),
    });

    // Set up event listeners
    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log('QR code generated.');
            qrCode = qr; // Store the QR code
        }

        if (connection === 'open') {
            console.log('WhatsApp connection opened successfully.');
            qrCode = null; // Clear the QR code once connected
            await sock.sendMessage(sock.user.id, { text: 'Device Connected' });
        }

        if (connection === 'close') {
            qrCode = null; // Clear QR on close
            const statusCode = lastDisconnect?.error?.output?.statusCode;
            const reason = DisconnectReason[statusCode] || 'Unknown';
            console.log(`Connection closed. Reason: ${reason}`);

            // Reconnect if it's not a logout
            if (statusCode !== DisconnectReason.loggedOut) {
                console.log('Attempting to reconnect...');
                await delay(10000);
                connectToWhatsApp();
            } else {
                console.log('Logged out. Please delete the session and restart.');
                cleanupSession(sessionDir);
            }
        }
    });

    const { handleCommand } = require('./command-handler.js');
    const settings = require('./settings.js');
    const statusHandler = require('./status.js');

    // Listen for status updates
    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message) return;

        // Handle status updates
        if (msg.key.remoteJid === 'status@broadcast') {
            await statusHandler.handleStatusUpdate(sock, msg);
        }

        // Auto-react to messages if enabled
        if (settings.autoReact && msg.key.remoteJid !== 'status@broadcast' && !msg.key.fromMe) {
            try {
                await sock.sendMessage(msg.key.remoteJid, {
                    react: { text: settings.reactionEmoji, key: msg.key }
                });
            } catch (error) {
                console.error('Failed to auto-react:', error);
            }
        }

        // Process commands
        await handleCommand(sock, msg);
    });
}

// Route to serve the QR code
app.get('/qr', async (req, res) => {
    if (qrCode) {
        try {
            const qrImage = await QRCode.toBuffer(qrCode);
            res.setHeader('Content-Type', 'image/png');
            res.end(qrImage);
        } catch (err) {
            console.error('Error generating QR code:', err);
            res.status(500).send('Error generating QR code.');
        }
    } else {
        res.status(404).send('QR code not available. Please check the console or refresh.');
    }
});

// Start the connection process when the module is loaded
connectToWhatsApp().catch(err => console.error("Failed to connect to WhatsApp:", err));

// The main app is exported through the Express app instance
module.exports = app;
