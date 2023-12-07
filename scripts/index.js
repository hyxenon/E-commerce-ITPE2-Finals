const usernameElement = document.querySelector('#username');
const userEmailElement = document.querySelector('#user-email');

// Retrieve the currentUser from local storage
const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};


// Update the elements with the user information
usernameElement.textContent = currentUser.username || 'Guest';
userEmailElement.textContent = currentUser.email || 'guest@example.com';










