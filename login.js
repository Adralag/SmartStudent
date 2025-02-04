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