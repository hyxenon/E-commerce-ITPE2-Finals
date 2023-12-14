const usernameElement = document.querySelector('#username');
const userEmailElement = document.querySelector('#user-email');
const signoutBtn = document.querySelector('#signOut')

signoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
})

const isLoggedIn = localStorage.getItem('currentUser') !== null;

// If not logged in, redirect to the login page
if (!isLoggedIn) {
    window.location.href = '/pages/login.html';
}
// Retrieve the currentUser from local storage
const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};


// Update the elements with the user information
usernameElement.textContent = currentUser.username || 'Guest';
userEmailElement.textContent = currentUser.email || 'guest@example.com';










