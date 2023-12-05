const emailElement = document.querySelector('#email')
const usernameElement = document.querySelector('#username')
const passwordElement = document.querySelector('#password')
const loginBtn = document.querySelector('#login')



loginBtn.addEventListener('click', () => {

    const userDetail = {
        email: emailElement.value,
        username: usernameElement.value,
        password: passwordElement.value
    }

    if(!userDetail.email){
        alert("Please Input the email field!")
        return
    }
    else if(!userDetail.username){
        alert("Please Input the usename field!")
        return
    }
     else if(!userDetail.password){
        alert("Please Input the usename field!")
        return
    }

    // Store user information in local storage
    localStorage.setItem('username', userDetail.username);
    localStorage.setItem('email', userDetail.email);
    window.location.href = '/index.html';
    
})