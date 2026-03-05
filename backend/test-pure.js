const http = require('http');

const payload = JSON.stringify({
    title: "Integration Test Course",
    description: "Test",
    instructor: "Test",
    thumbnail: "http://example.com/thumb.jpg",
    price: 50,
    category: "General",
    level: "Beginner",
    videos: []
});

const req = http.request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/courses',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length,
        // Missing Authorization header intentionally to see if it responds 401
    }
}, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('end', () => { console.log("BODY:", data); });
});

req.on('error', e => console.error("ERR:", e));
req.write(payload);
req.end();
