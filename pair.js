const { default: makeWASocket, useMultiFileAuthState, Browsers } = require('@whiskeysockets/baileys');
const express = require('express');
const pino = require('pino');
const path = require('path');

const router = express.Router();

router.get('/', async (req, res) => {
    const phoneNumber = req.query.number;
    if (!phoneNumber) {
        return res.status(400).json({ error: 'Phone number is required. Use format: /code?number=123456789' });
    }

    const sock = makeWASocket({
        printQRInTerminal: false,
        logger: pino({ level: 'silent' }),
        browser: Browsers.macOS('Desktop'),
    });

    try {
        // Delay to ensure the socket is ready
        await new Promise(resolve => setTimeout(resolve, 2000));
        const pairingCode = await sock.requestPairingCode(phoneNumber);
        res.json({ code: pairingCode });
    } catch (error) {
        console.error('Failed to request pairing code:', error);
        res.status(500).json({ error: 'Failed to request pairing code. Please check the phone number and try again.' });
    }
});

module.exports = router;
