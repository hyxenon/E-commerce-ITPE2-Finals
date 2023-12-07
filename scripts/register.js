const formatName = (name) => {
    if (!name) {
        return ''; 
    }

    return name.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
};


const validateAndCreateUser = () => {
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const rawFirstName = document.getElementById('firstName').value;
    const rawLastName = document.getElementById('lastName').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;


    if (!email || !username || !rawFirstName || !rawLastName || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Password and Confirm Password must match.');
        return;
    }


    const formattedFirstName = formatName(rawFirstName);
    const formattedLastName = formatName(rawLastName);


    const user = {
        email,
        username,
        firstName: formattedFirstName,
        lastName: formattedLastName,
        password,
        confirmPassword,
    };


    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];


    existingUsers.push(user);


    localStorage.setItem('users', JSON.stringify(existingUsers));


    alert('User data has been saved to local storage.');
};

document.getElementById('register').addEventListener('click', (event) => {
    
    event.preventDefault();
    validateAndCreateUser();
});
