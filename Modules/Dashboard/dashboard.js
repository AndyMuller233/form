// modules/dashboard/dashboard.js

// Check if the user is logged in
if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = '../../authentication/registration/index.html'; // Redirect to login if not logged in
}

// Redirect if not logged in
if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = '../../authentication/register/index.html';
}

// Logout
document.getElementById('logout').onclick = () => {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isLoggedIn');
        window.location.href = '../../authentication/register/index.html';
    }
};

// Show Home Content
document.getElementById('home').onclick = () => {
    document.getElementById('home-content').classList.remove('hidden');
};


