const ytdl = require('ytdl-core');
const axios = require('axios');

module.exports = {
    name: 'ytdownloadanime',
    description: 'Download anime video.',
    async execute(socket, message, args) {
        try {
            if (!args[0]) {
                await socket.sendMessage(message.key.remoteJid, { 
                    text: '❌ Please provide a video number or URL.' 
                }, { quoted: message });
                return;
            }

            let url;
            if (args[0].match(/^(http|https):\/\//)) {
                url = args[0];
            } else {
                // Get the video URL from the search results
                const videoNumber = parseInt(args[0]);
                if (isNaN(videoNumber) || videoNumber < 1 || videoNumber > 5) {
                    await socket.sendMessage(message.key.remoteJid, { 
                        text: '❌ Please provide a valid video number (1-5) or URL.' 
                    }, { quoted: message });
                    return;
                }

                // Get the search query from the previous search
                const searchQuery = message.message.extendedTextMessage?.contextInfo?.quotedMessage?.conversation;
                if (!searchQuery) {
                    await socket.sendMessage(message.key.remoteJid, { 
                        text: '❌ Please search for an anime video first using .ytsearchanime.' 
                    }, { quoted: message });
                    return;
                }

                // Get the video URL from the search results
                const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
                    params: {
                        part: 'snippet',
                        type: 'video',
                        maxResults: 5,
                        q: searchQuery + ' anime episode english subbed',
                        key: process.env.YOUTUBE_API_KEY
                    }
                });

                const videoId = response.data.items[videoNumber - 1].id.videoId;
                url = `https://youtube.com/watch?v=${videoId}`;
            }

            // Get video info
            const info = await ytdl.getInfo(url);
            const video = ytdl.chooseFormat(info.formats, { quality: 'highest' });

            // Download video
            const videoBuffer = await ytdl(url, { quality: 'highest' }).toBuffer();

            await socket.sendMessage(message.key.remoteJid, { 
                video: videoBuffer,
                caption: `✅ Downloaded: ${info.videoDetails.title}
Duration: ${info.videoDetails.lengthSeconds} seconds`
            }, { quoted: message });

        } catch (error) {
            console.error('Error in ytdownloadanime command:', error);
            await socket.sendMessage(message.key.remoteJid, { 
                text: '❌ Failed to download anime video. Please try again.' 
            }, { quoted: message });
        }
    }
};
