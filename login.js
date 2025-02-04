document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
        alert('Login successful!');
        console.log(data);
        // Redirect user or store token in localStorage/sessionStorage

        // Update profile information
        if (data.user) {
            document.getElementById("profile-name").innerText = data.user.name;
            document.getElementById("profile-email").innerText = data.user.email;
            document.getElementById("profile-student-id").innerText = data.user.student_id;
            document.getElementById("profile-course").innerText = data.user.course_of_study;
            document.getElementById("profile-section").classList.remove("d-none");
        }
    } else {
        alert(data.error);
    }

    const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

});
