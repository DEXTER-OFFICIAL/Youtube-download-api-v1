const express = require('express');
const ytdl = require('node-yt-dl');

const app = express();
const port = 3000;

// Endpoint to search for videos
app.get('/search', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    try {
        const result = await ytdl.search(query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to download video as MP4
app.get('/ytmp4', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).json({ error: 'Query parameter "url" is required' });
    }

    try {
        const result = await ytdl.mp4(url);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to download audio as MP3
app.get('/ytmp3', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).json({ error: 'Query parameter "url" is required' });
    }

    try {
        const result = await ytdl.mp3(url);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
