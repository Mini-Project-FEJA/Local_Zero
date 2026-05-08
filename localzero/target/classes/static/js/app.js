//All JavaScript som berör flera olika sidor

export function navigate(id, url) {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener("click", () => {
            window.location.href = url;
        });
    }
}

navigate("admin-button", "login.html");
navigate("resident-button", "login.html");
navigate("go-to-register-button", "register.html");
navigate("login-button", "frontpage.html");
navigate("register-button", "frontpage.html");
navigate("my-profile", "profile.html");
navigate("inbox-button", "inbox.html");

//Laddar left-sidebar html på alla de HTML filer som har app.js script och
//element "left-sidebar"
export async function loadLeftSidebar() {
    const sidebar = document.getElementById("left-sidebar");
    if (sidebar) {
        try {
            const response = await fetch('left-sidebar.html');
            const html = await response.text();

            sidebar.innerHTML = html;

            navigate("visit-resident-profile", "profile.html");
            navigate("visit-all-initiatives", "initiatives.html");
            navigate("visit-frontpage", "frontpage.html");
            loadUsername();
            loadLogoutButton();

        } catch (error) {
            console.error("Couldn't load sidebar", error);
        }
    }
}

loadLeftSidebar();

function loadUsername() {

    const usernameField = document.getElementById("account-name");
    const savedUser = localStorage.getItem("user");

    if (usernameField && savedUser) {
        try {
        const userObject = JSON.parse(savedUser);
        const username = userObject.username;
        usernameField.textContent = `Welcome ${username}!`;
        } catch (error) {
            console.error("Couldn't fetch userdata" , error);
        }
    }
}

function loadLogoutButton() {

    const logoutButton = document.getElementById("account-logout-button");

    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("user");

            console.log("Du har loggat ut");
            window.location.href = "login.html";
        })
    }
}

