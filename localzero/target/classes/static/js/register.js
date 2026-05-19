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
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "frontpage.html";

      } else {
        console.error("Register failed");
      }

    } catch (err) {
      console.error(err);
    }

  });
}