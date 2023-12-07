const emailElement = document.querySelector('#email');
const passwordElement = document.querySelector('#password');
const loginBtn = document.querySelector('#login');

loginBtn.addEventListener('click', () => {
    const email = emailElement.value;
    const password = passwordElement.value;

    if (!email || !password) {
        alert('Please fill in both email and password.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const currentUser = users.find(user => user.email === email);

    if (!currentUser) {
        alert('User not found. Please check your email.');
        return;
    }

    if (currentUser.password !== password) {
        alert('Incorrect password. Please try again.');
        return;
    }

    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    alert('Login successful! Redirecting to the dashboard.');
    window.location.href = '/index.html';
});





