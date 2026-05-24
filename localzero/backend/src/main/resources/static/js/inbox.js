import {loadLeftSidebar, loadRightSidebar} from "./app.js";

async function initialize() {
    await loadLeftSidebar();
    await loadRightSidebar();
}

initialize();

document.addEventListener("DOMContentLoaded", () => {

    const userRaw = localStorage.getItem("user");

    if (!userRaw) {
        console.error("No user in localStorage");
        return;
    }

    const user = JSON.parse(userRaw);

    const userId = user?.id;

    if (!userId) {
        console.error("Missing user.id:", user);
        return;
    }

    fetch(`http://localhost:8081/my-inbox/${userId}`)
        .then(async res => {

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text);
            }

            return res.json();
        })
        .then(messages => {

            console.log("Messages:", messages);

            const list = document.getElementById("messages-list");

            if (!list) {
                console.error("#messages-list not found");
                return;
            }

            list.innerHTML = "";

            messages.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));

            const latestConversations = new Map();

            messages.forEach(msg => {

                if (!msg.sender) return;

                const otherUser =
                    msg.sender.id === userId
                        ? msg.receiver
                        : msg.sender;

                if (!otherUser) return;

                const conversationId = otherUser.id;

                if (!latestConversations.has(conversationId)) {
                    latestConversations.set(conversationId, msg);
                }
            });

            latestConversations.forEach(msg => {

                const otherUser =
                    msg.sender.id === userId
                        ? msg.receiver
                        : msg.sender;

                if (!otherUser) return;

                const btn = document.createElement("button");

                let sender = otherUser.username;

                if (msg.sender.id === user.id) {
                    sender = "You";
                }

                btn.classList.add("message-item");

                btn.innerHTML = `
            <strong>Chat with ${otherUser.username ?? "Unknown"}</strong><br>
            <strong>${sender}:</strong> ${msg.content ?? ""}<br>
            <strong>${formatDate(msg.sentAt)}</strong>
        `;

                btn.addEventListener("click", () => {
                    window.location.href =
                        `privatemessage.html?sender_id=${otherUser.id}`;
                });

                list.appendChild(btn);
            });

        })
        .catch(err => console.error("Error loading inbox:", err));
});
document.addEventListener("DOMContentLoaded", () => {

    const userRaw = localStorage.getItem("user");

    if (!userRaw) {
        console.error("No user in localStorage");
        return;
    }

    const user = JSON.parse(userRaw);

    const communityId = user.community.id;

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

            const menu = document.getElementById("resident-menu");
            const btn = document.getElementById("new-message-btn");

            btn.addEventListener("click", () => {

                if (menu.style.display === "block") {
                    menu.style.display = "none";
                } else {
                    menu.style.display = "block";
                }
            });

            users.forEach(u => {

                if (u.username === user.username) {
                    return;
                }

                const resident = document.createElement("div");

                resident.classList.add("resident-item");

                resident.textContent = u.username;

                resident.addEventListener("click", () => {

                    window.location.href =
                        `privatemessage.html?user_id=${u.id}`;
                });

                menu.appendChild(resident);
            });

        })

        .catch(err => {
            console.error("Error loading users:", err);
        });
    console.log(user);

});

function formatDate(isoString) {
    const date = new Date(isoString);

    return (
        date.getFullYear() + "-" +
        String(date.getMonth() + 1).padStart(2, "0") + "-" +
        String(date.getDate()).padStart(2, "0") + " " +
        String(date.getHours()).padStart(2, "0") + ":" +
        String(date.getMinutes()).padStart(2, "0")
    );
}