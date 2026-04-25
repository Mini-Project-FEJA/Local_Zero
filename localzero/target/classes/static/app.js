function navigate(id, url) {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener("click", () => {
            window.location.href = url;
        });
    }
}

navigate("admin-button", "loginpage.html");
navigate("resident-button", "loginpage.html");
navigate("go-to-register-button", "registerpage.html");
navigate("login-button", "frontpage.html");
navigate("register-button", "frontpage.html");
navigate("visit-resident-profile", "profilepage.html");