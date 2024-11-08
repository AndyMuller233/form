// modules/dashboard/dashboard.js


// Check if the user is logged in
if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = '../../authentication/registration/index.html'; // Redirect to login if not logged in
}

// Fetch users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Save updated users list to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Render Users in the table
function renderUsers() {
    const users = getUsers();
    const tbody = document.querySelector('#user-table tbody');
    tbody.innerHTML = ''; // Clear existing rows

    // Loop through each user and add them to the table
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Attach event listeners to delete and edit buttons dynamically
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            deleteUser(index);
        });
    });

    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            editUser(index);
        });
    });
}

// Add User
function addUser(event) {
    event.preventDefault();

    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const users = getUsers();

    users.push({ name, email });
    saveUsers(users);
    renderUsers();  // Re-render the users list
    document.getElementById('user-form').reset();  // Reset the form fields
}

// Delete User
function deleteUser(index) {
    const users = getUsers();
    users.splice(index, 1);  // Remove user at specified index
    saveUsers(users);
    renderUsers();  // Re-render after deletion
}

// Edit User
function editUser(index) {
    const users = getUsers();
    const user = users[index];

    // Populate the edit form with the user's current data
    document.getElementById('edit-name').value = user.name;
    document.getElementById('edit-email').value = user.email;

    // Show the edit form
    document.getElementById('edit-user-form').classList.remove('hidden');

    // Handle saving the changes
    document.getElementById('save-btn').onclick = (event) => {
        event.preventDefault();

        // Update the user's details with new values
        users[index].name = document.getElementById('edit-name').value;
        users[index].email = document.getElementById('edit-email').value;

        // Save the updated user list to localStorage
        saveUsers(users);
        renderUsers();  // Re-render the users list

        // Hide the edit form after saving
        document.getElementById('edit-user-form').classList.add('hidden');
    };

    // Handle canceling the edit
    document.getElementById('cancel-btn').onclick = () => {
        // Hide the edit form without saving
        document.getElementById('edit-user-form').classList.add('hidden');
    };
}

// Event Listeners
document.getElementById('add-btn').addEventListener('click', addUser);

// Handle User section visibility
document.getElementById('user').onclick = () => {
    document.getElementById('home-content').classList.add('hidden');
    document.getElementById('user-content').classList.remove('hidden');
    renderUsers();  // Render users when User section is accessed
};

// Handle Logout
document.getElementById('logout').onclick = () => {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isLoggedIn');
        window.location.href = '../../authentication/register/index.html';
    }
};

// Handle Home section visibility
document.getElementById('home').onclick = () => {
    document.getElementById('user-content').classList.add('hidden');
    document.getElementById('home-content').classList.remove('hidden');
};


// Render users when the page loads
renderUsers();

