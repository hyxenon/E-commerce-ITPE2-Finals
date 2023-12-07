const updateBtn = document.querySelector('#update');
const deleteBtn = document.querySelector('#delete');

const formatName = (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
document.querySelector('#firstName').value = formatName(currentUser.firstName);
document.querySelector('#lastName').value = formatName(currentUser.lastName);
document.querySelector('#email').value = currentUser.email || '';

updateBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users')) || [];


    const userIndex = users.findIndex((user) => user.email === currentUser.email);


    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirmPassword').value;
    if (password !== confirmPassword) {
        alert('Password and Confirm Password do not match.');
        return;
    }


    users[userIndex] = {
        ...users[userIndex],
        firstName: formatName(document.querySelector('#firstName').value),
        lastName: formatName(document.querySelector('#lastName').value),
        email: document.querySelector('#email').value,
        password: password, 
    };


    localStorage.setItem('users', JSON.stringify(users));


    localStorage.setItem(
        'currentUser',
        JSON.stringify({
            ...currentUser,
            firstName: formatName(document.querySelector('#firstName').value),
            lastName: formatName(document.querySelector('#lastName').value),
            email: document.querySelector('#email').value,
        })
    );


    currentUser.firstName = formatName(document.querySelector('#firstName').value);
    currentUser.lastName = formatName(document.querySelector('#lastName').value);
    currentUser.email = document.querySelector('#email').value;
    alert('Update Success')
});


deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

   
    const userIndex = users.findIndex((user) => user.email === currentUser.email);

    if (userIndex !== -1) {
        
        users.splice(userIndex, 1);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.removeItem('currentUser');
        window.location.href = '/index.html';
        
    }

    
})



