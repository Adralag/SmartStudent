document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get user input
    var email = document.getElementById("login-email").value;
    var password = document.getElementById("login-password").value;

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

document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    let credentials = {
        email: document.getElementById("login-email").value,
        password: document.getElementById("login-password").value
    };

    let response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
    });

    let result = await response.json();
    if (result.user) {
        document.getElementById("profile-name").innerText = result.user.name;
        document.getElementById("profile-email").innerText = result.user.email;
        document.getElementById("profile-student-id").innerText = result.user.student_id;
        document.getElementById("profile-course").innerText = result.user.course_of_study;
        document.getElementById("profile-section").classList.remove("d-none");
    } else {
        alert(result.error);
    }
});