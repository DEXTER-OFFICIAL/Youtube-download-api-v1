const express = require('express');
const { search, ytmp3, channel } = require('@vreden/youtube_scraper');

const app = express();
app.use(express.json());

// Endpoint to convert YouTube video to MP3
app.post('/ytmp3', async (req, res) => {
    const { url, quality } = req.body;

    if (!url || !quality) {
        return res.status(400).json({ error: 'URL and quality are required' });
    }

    try {
        const result = await ytmp3(url, quality);
        if (result.status) {
            res.json({
                downloadLink: result.download,
                metadata: result.metadata,
            });
        } else {
            res.status(500).json({ error: result.result });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to search YouTube videos
app.post('/search', async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    try {
        const result = await search(query);
        if (result.status) {
            res.json({ results: result.results });
        } else {
            res.status(500).json({ error: result.result });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to fetch channel information
app.post('/channel', async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    try {
        const result = await channel(query);
        if (result.status) {
            res.json({ results: result.results });
        } else {
            res.status(500).json({ error: result.result });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
