const axios = require('axios');
const ytdl = require('ytdl-core');

module.exports = {
    name: 'ytsearch',
    description: 'Search YouTube videos.',
    async execute(socket, message, args) {
        try {
            if (!args[0]) {
                await socket.sendMessage(message.key.remoteJid, { 
                    text: '❌ Please provide a search query.' 
                }, { quoted: message });
                return;
            }

            const query = args.join(' ');
            const apiKey = process.env.YOUTUBE_API_KEY;
            
            if (!apiKey) {
                await socket.sendMessage(message.key.remoteJid, { 
                    text: '❌ YouTube API key not found. Please contact the bot owner.' 
                }, { quoted: message });
                return;
            }

            await socket.sendMessage(message.key.remoteJid, { 
                text: `🔍 Searching YouTube for: "${query}"...`
            }, { quoted: message });

            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
                params: {
                    part: 'snippet',
                    type: 'video',
                    maxResults: 5,
                    q: query,
                    key: apiKey
                }
            });

            const videos = response.data.items.map((item, index) => {
                return `${index + 1}. ${item.snippet.title}
   🔗 https://youtube.com/watch?v=${item.id.videoId}
   🕒 ${item.snippet.publishedAt}
   💬 ${item.snippet.channelTitle}`;
            }).join('\n\n');

            await socket.sendMessage(message.key.remoteJid, { 
                text: `🔍 Found videos for: "${query}"

${videos}

Use .ytdownload [number] to download a video.`
            }, { quoted: message });

        } catch (error) {
            console.error('Error in ytsearch command:', error);
            const errorMessage = error.response?.data?.error?.message || 'Unknown error';
            await socket.sendMessage(message.key.remoteJid, { 
                text: `❌ Failed to search YouTube: ${errorMessage}` 
            }, { quoted: message });
        }
    }
};
