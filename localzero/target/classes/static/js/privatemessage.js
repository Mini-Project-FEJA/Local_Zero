document.addEventListener("DOMContentLoaded", () => {

    const userRaw = localStorage.getItem("user");

    if (!userRaw) {
        console.error("No user in localStorage");
        return;
    }

    const user = JSON.parse(userRaw);
    const currentUserId = user?.id;

    if (!currentUserId) {
        console.error("Missing user.id:", user);
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);

    const otherUserId =
        urlParams.get("sender_id") ||
        urlParams.get("user_id");

    if (!otherUserId) {
        console.error("Missing other user id in URL");
        return;
    }

    fetch(`http://localhost:8081/private-messages/${currentUserId}/${otherUserId}`)
        .then(async res => {
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text);
            }
            return res.json();
        })
        .then(messages => {

            messages.sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt));

            const allMessages = document.getElementById("messages");

            if (!allMessages) {
                console.error("#messages not found");
                return;
            }

            allMessages.innerHTML = "";

            messages.forEach(msg => {

                const formatted = msg.sentAt
                    .split(".")[0]
                    .replace("T", " ");

                const isSentMessage = msg.sender?.id === currentUserId;

                const messageElement = document.createElement("div");

                if (isSentMessage) {
                    messageElement.innerHTML = `
                        <div class="sent-message-box">
                            <div class="sent-message">
                                <div class="sender">
                                    ${msg.sender?.username ?? "Unknown"}
                                </div><br>
                                ${msg.content}<br>
                            </div>
                            <div class="time">${formatted}</div>
                        </div>
                    `;
                } else {
                    messageElement.innerHTML = `
                        <div class="received-message-box">
                            <div class="received-message">
                                <div class="receiver">
                                    ${msg.sender?.username ?? "Unknown"}
                                </div><br>
                                ${msg.content}<br>
                            </div>
                            <div class="time">${formatted}</div>
                        </div>
                    `;
                }

                allMessages.appendChild(messageElement);
            });

            requestAnimationFrame(() => {
                const allMessages = document.getElementById("messages");
                if (allMessages) {
                    allMessages.scrollTop = allMessages.scrollHeight;
                }
            });
        })
        .catch(err => console.error("Error loading messages:", err));

    const sendBtn = document.getElementById("save-message");

    if (!sendBtn) {
        console.error("#save-message not found");
        return;
    }

    sendBtn.addEventListener("click", () => {

        const input = document.getElementById("messageInput");

        if (!input) {
            console.error("#messageInput not found");
            return;
        }

        const messageContent = input.value.trim();

        if (!messageContent) return;

        const payload = {
            content: messageContent
        };

        fetch(`http://localhost:8081/private-messages/send/${currentUserId}/${otherUserId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then(async res => {
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text);
                }
                return res.text();
            })
            .then(() => {
                input.value = "";

                location.reload();
            })
            .catch(err => {
                console.error("Error sending message:", err);
            });
    });
});