//All JavaScript som berör flera olika sidor
//Funktioner som har "export" tag kan importeras till andra javascript filer
//Genom export/import samlar vi all javascript som behövs av flera olika sidor,
//sedan importerar man bara de funktioner som behövs på en viss sida.

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
navigate("back", "inbox.html");

//Laddar left-sidebar html på alla de HTML filer som har app.js script och
//element id "left-sidebar"
export async function loadLeftSidebar() {
    const sidebar = document.getElementById("left-sidebar");
    if (sidebar) {
        try {
            const response = await fetch('components/left-sidebar.html');
            const html = await response.text();

            sidebar.innerHTML = html;

            navigate("visit-resident-profile", "profile.html");
            navigate("visit-all-initiatives", "initiatives.html");
            navigate("visit-frontpage", "frontpage.html");
            navigate("visit-posts", "posts.html");
            loadUsername();
            loadLogoutButton();

        } catch (error) {
            console.error("Couldn't load left sidebar", error);
        }
    }
}

export async function loadRightSidebar() {
    const sidebar = document.getElementById("right-sidebar");
    if (sidebar) {
        try {
            const response = await fetch('components/right-sidebar.html');
            const html = await response.text();

            sidebar.innerHTML = html;

            navigate("my-profile", "profile.html");
            navigate("inbox-button", "inbox.html");
        } catch (error) {
            console.error("Couldn't load right sidebar ", error);
        }
    }
}

export async function loadInitiativePopup() {
    const popup = document.getElementById("initiative-popup");
    if (popup) {
        try {
            const response = await fetch('components/initiative-popup.html');
            const html = await response.text();

            popup.innerHTML = html;

        } catch (error) {
            console.error("Couldn't load popup ", error);
        }
    }
}

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

