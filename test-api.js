const User = require('./backend/models/User.js');

async function test() {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@test.com', password: 'password123' })
        });
        const result = await response.json();
        console.log("Login result:", result);
    } catch (e) {
        console.log("Error:", e);
    }
}
test();
