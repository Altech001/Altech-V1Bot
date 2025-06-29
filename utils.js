const axios = require('axios');
const FormData = require('form-data');
const fileType = require('file-type');
const os = require('os');

module.exports = {
    // Catbox upload
    async uploadToCatbox(buffer, filename = 'file') {
        try {
            const formData = new FormData();
            formData.append('reqtype', 'fileupload');
            formData.append('userhash', '');
            formData.append('fileToUpload', buffer, filename);

            const response = await axios.post('https://catbox.moe/user/api.php', formData, {
                headers: formData.getHeaders()
            });

            return response.data;
        } catch (error) {
            console.error('Error uploading to Catbox:', error);
            throw error;
        }
    },

    // Add footer to message
    addFooter(message) {
        return `${message}\n\n*By altech-v1*`;
    },

    // Check if message contains media
    hasMedia(message) {
        return message.message?.imageMessage || message.message?.videoMessage || message.message?.documentMessage || message.message?.audioMessage;
    },

    // Get buffer from URL
    async getBuffer(url) {
        try {
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            return response.data;
        } catch (error) {
            console.error('Error fetching buffer:', error);
            throw error;
        }
    },

    // Get system stats
    getSystemStats() {
        const totalMem = os.totalmem() / (1024 * 1024 * 1024); // Convert to GB
        const freeMem = os.freemem() / (1024 * 1024 * 1024);
        const usedMem = totalMem - freeMem;
        const memPercentage = Math.round((usedMem / totalMem) * 100);
        
        const memBar = '█'.repeat(Math.round(memPercentage / 10)) + '░'.repeat(10 - Math.round(memPercentage / 10));
        
        return {
            speed: `${Date.now() - process.uptime() * 1000} ms`,
            usage: `${Math.round(usedMem)} MB of ${Math.round(totalMem)} GB`,
            ram: `[${memBar}] ${memPercentage}%`
        };
    }
};
