document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const passwordField = document.getElementById('login-password');
    const password = passwordField.value;

    if (!email || !password) {
        alert('Email and password are required');
        console.log('Email or password is missing:', { email, password });
        return;
    }

    const hashedPassword = CryptoJS.SHA256(password).toString();
    passwordField.value = ''; // Clear the plain text password

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: hashedPassword })
    });

    const data = await response.json();

    console.log('Response status:', response.status);
    console.log('Response data:', data);

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

document.getElementById('loginButton').addEventListener('click', function() {
    document.getElementById('loginForm').submit();
});