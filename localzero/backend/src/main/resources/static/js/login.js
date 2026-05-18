//All JavaScript som rör Login + Register page

const BASE_URL = "https://aqua-animating-molecule.ngrok-free.dev";

const adminBtn = document.getElementById("admin-button");
if (adminBtn) {
    adminBtn.addEventListener("click", function() {
        window.location.href = "login.html";
    });
}

const residentBtn = document.getElementById("resident-button");
if (residentBtn) {
    residentBtn.addEventListener("click", function() {
        window.location.href = "login.html";
    });
}

const goToRegisterBtn = document.getElementById("go-to-register-button");
if (goToRegisterBtn) {
    goToRegisterBtn.addEventListener("click", function() {
        window.location.href = "register.html";
    });
}

const loginBtn = document.getElementById("login-button");

if (loginBtn) {
    loginBtn.addEventListener("click", async function(e) {
        e.preventDefault();

        const usernameInput = document.getElementById("login-username");
        const passwordInput = document.getElementById("login-password");

        if (!usernameInput || !passwordInput) {
            console.log("Login inputs not found on this page");
            return;
        }

        const loginData = {
            username: usernameInput.value,
            password: passwordInput.value
        };

        if (!loginData) {
            console.log("Login inputs not found on this page");
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                const user = await response.json();
                console.log("Logged in:", user);

                // spara user (enkelt sätt)
                localStorage.setItem("user", JSON.stringify(user));

                window.location.href = "frontpage.html";
            } else {
                console.error("Login failed");
            }

        } catch (err) {
            console.error(err);
        }
    });
}




