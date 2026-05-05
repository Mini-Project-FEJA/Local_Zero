document.addEventListener("DOMContentLoaded", () => {

    const urlParams = new URLSearchParams(window.location.search);
    const sender_id = urlParams.get("sender_id");

    const userRaw = localStorage.getItem("user");

    if (!userRaw) {
        console.error("No user in localStorage");
        return;
    }

    const user = JSON.parse(userRaw);
    const user_id = user?.id;

    if (!user_id) {
        console.error("Missing user.id:", user);
        return;
    }

    fetch(`http://localhost:8081/private-messages/${user_id}/${sender_id}`)
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

            allMessages.innerHTML = "";

            messages.forEach(msg => {
                const formatted = msg.sentAt.split(".")[0].replace("T", " ");

                const messageElement = document.createElement("div");
                const isSentMessage = msg.sender.id === user_id;

                if (isSentMessage) {
                    messageElement.innerHTML = `
                        <div class="sent-message-box">
                                <div class="sent-message">
                                    <div class="sender">${msg.sender?.username ?? msg.sender_id ?? "Unknown"}</div> <br>
                                    ${msg.content} <br>
                                </div>
                            <div class="time">${formatted}</div>
                        </div>
                    `;
                } else {
                    messageElement.innerHTML = `
                        <div class="received-message-box">
                                <div class="received-message">
                                    <div class="receiver">${msg.sender?.username ?? msg.sender_id ?? "Unknown"}</div> <br>
                                    ${msg.content} <br>
                                </div>
                            <div class="time">${formatted}</div>
                        </div>
                    `;
                }

                allMessages.appendChild(messageElement);
                requestAnimationFrame(() => {
                    allMessages.scrollTop = allMessages.scrollHeight;
                });
            });
        })
        .catch(err => console.error("Error loading inbox:", err));
});

document.getElementById('save-message').addEventListener('click', function() {
    const messageContent = document.getElementById('messageInput').value;

    const userRaw = localStorage.getItem("user");

    if (!userRaw) {
        console.error("No user in localStorage");
        return;
    }

    const user = JSON.parse(userRaw);
    const receiverId = user?.id;

    if (!receiverId) {
        console.error("Missing user.id:", user);
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const senderId = urlParams.get("sender_id");

    // Skicka meddelandet som en vanlig textsträng
    fetch(`http://localhost:8081/private-messages/send/${receiverId}/${senderId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: messageContent
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to send message");
            }
            return response.text(); // du returnerar inget JSON från backend
        })
        .then(() => {
            console.log('Meddelandet skickades');
            location.reload();
        })
        .catch((error) => {
            console.error('Fel vid skickande av meddelande:', error);
        });
});