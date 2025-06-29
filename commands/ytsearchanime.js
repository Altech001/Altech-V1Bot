const axios = require('axios');
const ytdl = require('ytdl-core');

module.exports = {
    name: 'ytsearchanime',
    description: 'Search YouTube for anime videos.',
    async execute(socket, message, args) {
        try {
            if (!args[0]) {
                await socket.sendMessage(message.key.remoteJid, { 
                    text: '❌ Please provide an anime search query.' 
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
                text: `🔍 Searching YouTube for anime: "${query}"...`
            }, { quoted: message });

            // Add anime-related keywords to improve search results
            const searchQuery = `${query} anime episode english subbed`;
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
                params: {
                    part: 'snippet',
                    type: 'video',
                    maxResults: 5,
                    q: searchQuery,
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
                text: `🔍 Found anime videos for: "${query}"

${videos}

Use .ytdownloadanime [number] to download an anime video.`
            }, { quoted: message });

        } catch (error) {
            console.error('Error in ytsearchanime command:', error);
            const errorMessage = error.response?.data?.error?.message || 'Unknown error';
            await socket.sendMessage(message.key.remoteJid, { 
                text: `❌ Failed to search YouTube for anime: ${errorMessage}` 
            }, { quoted: message });
        }
    }
};
