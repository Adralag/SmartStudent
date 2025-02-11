document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert('Email and password are required');
        console.log('Email or password is missing:', { email, password });
        return;
    }

    // Hash the password using crypto-js
    const hashedPassword = CryptoJS.SHA256(password).toString();

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: hashedPassword }) // Send hashed password
        });

        const data = await response.json();
        console.log('Response status:', response.status);
        console.log('Response data:', data);

        if (response.ok) {
            alert('Login successful!');
            console.log(data);
            // Redirect user or store token in localStorage/sessionStorage

            // Update profile information
                document.getElementById("profile-name").textContent = data.user.name;
                document.getElementById("profile-email").textContent = data.user.email;
                document.getElementById("profile-student-id").textContent = data.user.student_id;
                document.getElementById("profile-course").textContent = data.user.course_of_study;
                document.getElementById("profile-section").classList.remove("d-none");
        } else {
            alert('Login failed. Please check your email and password and try again.');
            console.log('Server error:', data.error);
            console.error('Server error:', data.error);
        }
    } catch (error) {
        console.error('Error during fetch:', error);
        alert('An error occurred. Please try again later.');
    }
});

// Removed redundant event listener for login button