document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get user input
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Dummy credentials (Replace with actual backend validation)
    var correctEmail = "user@example.com";
    var correctPassword = "password123";

    // Check if details are correct
    if (email === correctEmail && password === correctPassword) {
        alert("Login successful! Redirecting...");
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
        alert("Invalid email or password. Please try again.");
    }
});