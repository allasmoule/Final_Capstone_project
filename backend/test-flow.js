import fetch from 'node-fetch'; // Backend package.json has 'node-fetch'? If not, we use native fetch in node 18+

async function test() {
    try {
        console.log("1. Creating course directly (no auth via token, just hardcoded DB save if we wanted, but let's test API)");
        const payload = {
            title: "Integration Test Course",
            description: "Test",
            instructor: "Test",
            thumbnail: "http://example.com/thumb.jpg",
            price: 50,
            category: "General",
            level: "Beginner",
            videos: []
        };

        // Let's assume the user doesn't have an admin set up, or we don't know the password.
        // We can just verify if the route is returning 401 Unauthorized (working as expected)
        const courseRes = await fetch('http://localhost:5000/api/courses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        console.log("Status:", courseRes.status);
        const data = await courseRes.text();
        console.log("Data:", data);
    } catch (e) {
        console.error("FAILED.");
        console.error(e);
    }
}

test();
