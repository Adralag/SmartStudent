document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    hashPassword();
    this.submit();
});

function hashPassword() {
    const passwordField = document.getElementById('login-password');
    const hashedPasswordField = document.getElementById('hashed-password');
    const hashedPassword = CryptoJS.SHA256(passwordField.value).toString();
    hashedPasswordField.value = hashedPassword;
    passwordField.value = ''; // Clear the plain text password
}

document.getElementById('loginButton').addEventListener('click', function() {
    document.getElementById('loginForm').submit();
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const passwordField = document.getElementById('login-password');
    const hashedPassword = CryptoJS.SHA256(passwordField.value).toString();
    passwordField.value = hashedPassword;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: hashedPassword })
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
});
