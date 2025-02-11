// Include the CryptoJS library
const script = document.createElement('script');
document.head.appendChild(script);

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("form").addEventListener("submit", async (event) => {
        event.preventDefault();

        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const ID = document.getElementById('ID').value;
        const course = document.getElementById('course').value;
        const passwordField = document.getElementById('password');
        const hashedPasswordField = document.getElementById('hashed-password');
        const hashedPassword = CryptoJS.SHA256(passwordField.value).toString();
        hashedPasswordField.value = hashedPassword;
        passwordField.value = ''; // Clear the plain text password

            const response = await fetch("http://localhost:3000/register", {
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
    
            const data = await response.json();
            alert(data.message);
            if (response.ok) {
                passwordField.value = ''; // Clear the plain text password
                window.location.href = "login.html";
            }
        });
    });
