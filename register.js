
document.addEventListener("DOMContentLoaded", () => {
    // Include the CryptoJS library for hashing passwords
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js";
    script.onload = () => {
        document.querySelector("form").addEventListener("submit", async (event) => {
            event.preventDefault();

            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const ID = document.getElementById('ID').value;
            const course = document.getElementById('course').value;
            const passwordField = document.getElementById('password');
            const hashedPassword = CryptoJS.SHA256(passwordField.value).toString();
            const response = await fetch(`${BASE_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullname,
                    email,
                    ID,
                    course,
                    password: hashedPassword
                })
            });

            if (response.ok) {
                alert(`Registration successful! Welcome, ${fullname}. Please check your email (${email}) for further instructions.`);
                passwordField.value = ''; // Clear the plain text password
                window.location.href = "login.html";
            }
        });
    };
    document.head.appendChild(script);
});

const BASE_URL = "http://localhost:3000";
