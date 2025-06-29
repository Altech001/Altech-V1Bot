const fs = require('fs');
const path = require('path');

const SETTINGS = {
    BOT_NAME: 'BOT_NAME',
    OWNER_NAME: 'OWNER_NAME',
    OWNER_NUMBER: 'OWNER_NUMBER',
    WATERMARK: 'WATERMARK',
    STICKER_AUTHOR: 'STICKER_AUTHOR',
    STICKER_PACK_NAME: 'STICKER_PACK_NAME',
    TIMEZONE: 'TIMEZONE',
    CONTEXT_LINK: 'CONTEXT_LINK',
    MENU_IMAGE: 'MENU_IMAGE',
    ANTICALL_MSG: 'ANTICALL_MSG',
    MENU: 'MENU',
    PREFIX: 'PREFIX',
    STATUS_EMOJI: 'STATUS_EMOJI',
    WARN: 'WARN'
};

function updateSetting(setting, value) {
    const envPath = path.join(__dirname, '..', '.env');
    let envContent = fs.readFileSync(envPath, 'utf8');
    envContent = envContent.replace(new RegExp(`${setting}=[^\n]*`), `${setting}=${value}`);
    fs.writeFileSync(envPath, envContent);
    return envContent;
}

function getSetting(setting) {
    const envPath = path.join(__dirname, '..', '.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(new RegExp(`${setting}=([^\n]*)`));
    return match ? match[1] : null;
}

function resetSettings() {
    const envPath = path.join(__dirname, '..', '.env');
    const defaultSettings = `
${Object.values(SETTINGS).map(setting => `${setting}=`).join('\n')}
`;
    fs.writeFileSync(envPath, defaultSettings);
    return defaultSettings;
}

module.exports = {
    SETTINGS,
    updateSetting,
    getSetting,
    resetSettings
};
