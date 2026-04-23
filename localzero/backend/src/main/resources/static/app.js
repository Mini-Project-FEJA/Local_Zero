fetch('/index')
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(err => console.error(err));

const adminBtn = document.getElementById("admin-button");
if (adminBtn) {
    adminBtn.addEventListener("click", function() {
        window.location.href = "loginpage.html";
    });
}

const residentBtn = document.getElementById("resident-button");
if (residentBtn) {
    residentBtn.addEventListener("click", function() {
        window.location.href = "loginpage.html";
    });
}

const goToRegisterBtn = document.getElementById("go-to-register-button");
if (goToRegisterBtn) {
    goToRegisterBtn.addEventListener("click", function() {
        window.location.href = "registerpage.html";
    });
}

const loginBtn = document.getElementById("login-button");
if (loginBtn) {
    loginBtn.addEventListener("click", function() {
        window.location.href = "frontpage.html";
    });
}

const registerBtn = document.getElementById("register-button");
if (registerBtn) {
    registerBtn.addEventListener("click", function() {
        window.location.href = "frontpage.html";
    });
}

