import config from './config.js';

// Define the validatePassword function
function validatePassword(password) {
    // Add your password validation logic here
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
        alert("Password must be at least 6 characters long and contain both letters and numbers.");
        return false;
    }
    return true;
}

document.getElementById("signupForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form submission

    // Get user input
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Basic validation (Ensure all fields are filled)
    if (username.trim() === "" || email.trim() === "" || password.trim() === "") {
        alert("All fields are required!");
        return;
    }

    // Password length validation
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    // Register User
    const courseElement = document.getElementById("reg-course");
    const courseOfStudy = courseElement ? courseElement.value : "";

    const userData = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        student_id: document.getElementById("reg-student-id").value,
        course_of_study: courseOfStudy,
        password: password
    };

    if (!validatePassword(userData.password)) {
        return;
    }

    try {
        let response = await fetch(`${config.apiUrl}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        let result = await response.json();
        alert(result.message);

        if (response.ok) {
            // Simulate successful registration
            alert("Registration successful! Redirecting to login page...");

            // Redirect to login page
            window.location.href = "login.html";
        }
    } catch (error) {
        console.error("Error during registration:", error);
        alert("An error occurred during registration. Please try again later.");
    }
console.log("signup.js is connected successfully!");
    console.log("signup.js is connected successfully!");
});