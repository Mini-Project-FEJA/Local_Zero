//All JavaScript för frontpage


const usernameField = document.getElementById("account-box-name");
const savedUser = localStorage.getItem("user");

if (usernameField && savedUser) {
    const userObject = JSON.parse(savedUser);
    var username = userObject.username;

    usernameField.textContent = "Logged in as: " + username;
}

const logoutButton = document.getElementById("account-box-logout-button");

logoutButton.addEventListener("click", function () {
    localStorage.removeItem("user");

    console.log("Du har loggat ut");
    window.location.href = "loginpage.html";
})