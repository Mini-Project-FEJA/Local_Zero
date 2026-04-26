
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

const registerBtn = document.getElementById("register-button");
if (registerBtn) {
    registerBtn.addEventListener("click", async function(e) {
        e.preventDefault();
        const user = {
            email: document.getElementById("register-email").value,
            username: document.getElementById("register-username").value,

            password: document.getElementById("register-password").value,
            location: document.getElementById("register-location").value
        };

        try {
            const response = await fetch("http://localhost:8081/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                console.log("User registered!");
                window.location.href = "frontpage.html";

            } else {
                console.error("Register failed");
            }

        } catch (err) {
            console.error(err);
        }

    });
}

const loginBtn = document.getElementById("login-button");
if (loginBtn) {
    loginBtn.addEventListener("click", async function(e) {
        e.preventDefault();

        const loginData = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        };

        if (!loginData) {
            console.log("Login inputs not found on this page");
            return;
        }

        try {
            const response = await fetch("http://localhost:8081/users/login", {
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




