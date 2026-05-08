//All JavaScript för frontpage
import {loadLeftSidebar} from "./app.js";
import {loadPopupWindowButtons, loadTogglePopupButtons} from "./initiatives.js";

async function initialize() {
    await loadLeftSidebar();
    loadPopupWindowButtons();
    loadTogglePopupButtons();
}
initialize();

document.querySelectorAll(".toggle-initiative-button").forEach(button => {
    button.addEventListener("click", function () {
        toggleInitiativePopup();
    })
});

function toggleInitiativePopup() {
    const popupBox = document.getElementById("initiative-popup");
    popupBox.classList.toggle("visible");
}

const createInitiativeButton = document.getElementById("create-initiative-button");

if (createInitiativeButton) {
    createInitiativeButton.addEventListener("click", async function(e) {

        const currentUser = localStorage.getItem("user");
        const user = JSON.parse(currentUser);

        const titleInput = document.getElementById("initiative-title");
        const startInput = document.getElementById("initiative-start");
        const endInput = document.getElementById("initiative-end");
        const categoryInput = document.getElementById("initiative-category");
        const locationInput = document.getElementById("initiative-location");
        const visibilityInput = document.getElementById("initiative-visibility");
        const descriptionInput = document.getElementById("initiative-description-field");

        const initiative = {
            user: user,
            title: titleInput.value,
            startTime: startInput.value,
            endTime: endInput.value,
            category: categoryInput.value,
            location: locationInput.value,
            visibility: visibilityInput.value,
            description: descriptionInput.value,
        }

        try {
            const response = await fetch("http://localhost:8081/initiatives/create-initiative", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(initiative)
            });

            if (response.ok) {
                toggleInitiativePopup();
            } else {
                console.log("Couldn't create initiative: " + response);
            }

        } catch (err) {
            console.error(err);
        }
    })
}

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