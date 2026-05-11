//All JavaScript för frontpage
import {loadLeftSidebar, loadRightSidebar, loadInitiativePopup} from "./app.js";
import {loadPopupWindowButtons, loadTogglePopupButtons, setupCreateButton} from "./initiatives-utils.js";

async function initialize() {
    await loadLeftSidebar();
    await loadRightSidebar();
    await loadInitiativePopup();

    await loadPopupWindowButtons();
    await loadTogglePopupButtons();
    setupCreateButton();
}
initialize();


document.addEventListener("DOMContentLoaded", () => {

    console.log("Inbox script loaded");

    // 1. Hämta user från localStorage
    const userRaw = localStorage.getItem("user");

    if (!userRaw) {
        console.error("No user found in localStorage");
        return;
    }

    let user;

    try {
        user = JSON.parse(userRaw);
    } catch (e) {
        console.error("Failed to parse user JSON:", e);
        return;
    }

    console.log("User loaded:", user);

    // 2. Hämta communityId säkert
    const communityId = user?.community?.id;

    if (!communityId) {
        console.error("Missing communityId in user object:", user);
        return;
    }

    console.log("Community ID:", communityId);

    // 3. Fetch users i community
    fetch(`http://localhost:8081/users/my-community/${communityId}`)
        .then(async (res) => {

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`HTTP ${res.status} - ${text}`);
            }

            return res.json();
        })
        .then(users => {

            console.log("Users from API:", users);

            if (!Array.isArray(users)) {
                console.error("Expected array but got:", users);
                return;
            }

            const list = document.getElementById("resident-list");

            if (!list) {
                console.error("#resident-list not found in DOM");
                return;
            }

            list.innerHTML = "";

            users.forEach(u => {
                if (u.username === user.username) {
                    return;
                }

                const btn = document.createElement("button");
                btn.classList.add("resident-item");

                btn.textContent = u.username;

                btn.addEventListener("click", () => {
                    window.location.href = "profile.html";
                });

                list.appendChild(btn);
            });

        })
        .catch(err => {
            console.error("Error loading users:", err);
        });

});