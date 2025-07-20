const express = require('express');
const axios = require('axios');
const router = express.Router();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

router.get('/:topic', async (req, res) => {
  const { topic } = req.params;
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`, {
        params: {
          key: YOUTUBE_API_KEY,
          q: topic,
          part: 'snippet',
          maxResults: 6,
          type: 'video',
          videoEmbeddable: 'true' // ✅ Only embeddable videos
        }
      }
    );

    const videos = response.data.items.map((item) => ({
      title: item.snippet.title,
      videoId: item.id.videoId
    }));

    res.json({ videos });
  } catch (error) {
    console.error('YouTube API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

module.exports = router;
