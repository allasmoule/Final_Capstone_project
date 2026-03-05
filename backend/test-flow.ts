import axios from 'axios';

async function test() {
    try {
        console.log("1. Logging in...");
        const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'admin@test.com', // Assuming an admin exists. If not, this fails.
            password: 'password123'
        });

        console.log("Logged in. Token:", loginRes.data.token.substring(0, 15) + "...");

        const config = { headers: { Authorization: `Bearer ${loginRes.data.token}` } };

        console.log("2. Creating course...");
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

        const courseRes = await axios.post('http://localhost:5000/api/courses', payload, config);
        console.log("SUCCESS! Created course:", courseRes.data);
    } catch (e: any) {
        console.error("FAILED.");
        if (e.response) {
            console.error("Status:", e.response.status);
            console.error("Data:", e.response.data);
        } else {
            console.error(e.message);
        }
    }
}

test();
