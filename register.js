document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("form").addEventListener("submit", async (event) => {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const studentID = document.getElementById("studentID").value;
        const course = document.getElementById("course").value;
        const password = document.getElementById("password").value;

        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email, studentID, course, password })
        });

        const data = await response.json();
        alert(data.message);
        if (response.ok) window.location.href = "login.html";
    });

    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        hashPassword();
        this.submit();
    });

    function hashPassword() {
        const passwordField = document.getElementById('password');
        const hashedPasswordField = document.getElementById('hashed-password');
        const hashedPassword = CryptoJS.SHA256(passwordField.value).toString();
        hashedPasswordField.value = hashedPassword;
        passwordField.value = ''; // Clear the plain text password
    }

    document.getElementById('registerButton').addEventListener('click', function() {
        document.getElementById('registerForm').submit();
    });
});
