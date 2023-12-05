    
    // Retrieve user information from local storage
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');

    // Update the content in the navbar
    const usernameElement = document.getElementById('username');
    const userEmailElement = document.getElementById('user-email');

    if (storedUsername && storedEmail) {
        usernameElement.textContent = storedUsername;
        userEmailElement.textContent = storedEmail;
    }