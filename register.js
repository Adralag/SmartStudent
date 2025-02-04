document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("form").addEventListener("submit", async (event) => {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const studentID = document.getElementById("studentID").value;
        const course = document.getElementById("course").value;
        const password = document.getElementById("password").value;

        const response = await fetch("http://localhost:5000/submit-signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email, studentID, course, password })
        });

        const data = await response.json();
        alert(data.message);
        if (response.ok) window.location.href = "login.html";
    });
});
