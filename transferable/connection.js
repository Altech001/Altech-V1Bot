const {
    default: makeWASocket,
    useMultiFileAuthState,
    Browsers,
    DisconnectReason,
} = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');

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
            qrCode = qr;
        }

        if (connection === 'open') {
            qrCode = null;
            console.log('WhatsApp connection opened successfully.');
        }

        if (connection === 'close') {
            qrCode = null;
            const statusCode = lastDisconnect?.error?.output?.statusCode;
            const reason = DisconnectReason[statusCode] || 'Unknown';
            console.log(`Connection closed. Reason: ${reason}`);

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

    return sock;
}

// Function to send message to a contact
async function sendMessage(to, message) {
    if (!sock) {
        throw new Error('WhatsApp connection not established');
    }

    try {
        await sock.sendMessage(to, { text: message });
        return { success: true, message: 'Message sent successfully' };
    } catch (error) {
        console.error('Error sending message:', error);
        return { success: false, error: error.message };
    }
}

// Function to get the current QR code
async function getQRCode() {
    return qrCode;
}

// Function to check connection status
async function getConnectionStatus() {
    return {
        isConnected: sock?.user?.id ? true : false,
        qrCode: qrCode
    };
}

module.exports = {
    connectToWhatsApp,
    sendMessage,
    getQRCode,
    getConnectionStatus
};
