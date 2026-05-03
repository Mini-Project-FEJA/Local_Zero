function navigate(id, url) {
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
navigate("visit-resident-profile", "profile.html");
navigate("visit-all-initiatives", "initiatives.html")
navigate("visit-frontpage", "frontpage.html")