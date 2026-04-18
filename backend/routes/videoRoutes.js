import express from 'express';
import https from 'https';

const router = express.Router();

router.get('/search', (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ message: "Search query 'q' is required." });
    }

    const apiKey = process.env.SERPAPI_KEY;
    if (!apiKey) {
        return res.status(500).json({ message: "Server configuration error: SERPAPI_KEY missing." });
    }

    const encodedQuery = encodeURIComponent(query);
    const options = {
        hostname: 'serpapi.com',
        path: `/search.json?q=${encodedQuery}&tbm=vid&api_key=${apiKey}`,
        method: 'GET'
    };

    const request = https.request(options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            try {
                const parsedData = JSON.parse(data);
                res.status(response.statusCode).json(parsedData);
            } catch (err) {
                res.status(500).json({ message: "Error parsing SerpApi response." });
            }
        });
    });

    request.on('error', (error) => {
        console.error('Error fetching from SerpApi:', error);
        res.status(500).json({ message: "Error fetching data." });
    });

    request.end();
});

export default router;
