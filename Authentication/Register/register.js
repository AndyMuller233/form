// authentication/register/register.js

// Check if the user is already logged in
if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = '../../modules/dashboard/index.html'; // Redirect to dashboard if logged in
}

// Retrieve users from local storage
function getStoredUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Store users in local storage
function setStoredUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Show Sign Up Form
document.getElementById('show-signup').onclick = () => {
    document.getElementById('login-container').classList.remove('active');
    document.getElementById('signup-container').classList.add('active');
};

// Show Login Form
document.getElementById('show-login').onclick = () => {
    document.getElementById('signup-container').classList.remove('active');
    document.getElementById('login-container').classList.add('active');
};

// Sign Up Button Click
document.getElementById('signup-btn').onclick = () => {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    let users = getStoredUsers();
    users.push({ username, password });
    setStoredUsers(users);

    alert('Sign up successful!');
    document.getElementById('signup-container').classList.remove('active');
    document.getElementById('login-container').classList.add('active');
};

// Login Button Click
document.getElementById('login-btn').onclick = () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    let users = getStoredUsers();
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        alert('Login successful!');
        localStorage.setItem('isLoggedIn', 'true'); 
        window.location.href = '../../modules/dashboard/index.html'; // Corrected path
    } else {
        alert('Invalid username or password.');
    }
};