document.querySelector("form").addEventListener("submit", function(event) {
    const password = document.getElementById("password").value;
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        event.preventDefault();
    }

    console.log("signup.js is connected successfully!")
});

document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get user input
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Basic validation (Ensure all fields are filled)
    if (username.trim() === "" || email.trim() === "" || password.trim() === "") {
        alert("All fields are required!");
        return;
    }

    // Simulate successful registration
    alert("Registration successful! Redirecting to login page...");

    // Redirect to login page
    window.location.href = "login.html";
});
