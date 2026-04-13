fetch('/index')
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(err => console.error(err));


const loginButton = document.querySelector('#login-button');
loginButton.addEventListener('click', function (){
    console.log("login clicked")
    window.location.href = '/localzero/frontpage'
})

const registerButton = document.querySelector('#register-button');
registerButton.addEventListener('click', function (){
    window.location.href = '/localzero/frontpage'
})



// const signUpButton = document.querySelector('#sign-up-button');
//
// signUpButton.addEventListener('click', function (){
//     window.location.href = '/localzero/signup'
// })
//
// const signInButton = document.querySelector('#sign-in-button');
//
// signInButton.addEventListener('click', function (){
//     console.log("already have account")
//     window.location.href = '/localzero/login'
// })
