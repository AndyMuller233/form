// Check if the user is logged in
if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = '../register/index.html'; // Redirect to login if not logged in
}

// Logout Button Click
document.getElementById('logout').onclick = () => {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isLoggedIn'); // Remove login flag
        window.location.href = '../register/index.html'; // Redirect to login
    }
};

// Show Home Content when clicking 'Home'
document.getElementById('home').onclick = () => {
    document.getElementById('home-content').classList.remove('hidden');
};
