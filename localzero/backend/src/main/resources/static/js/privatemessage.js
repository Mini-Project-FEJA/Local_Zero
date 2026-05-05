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
                const raw = msg.sentAt;
                const formatted = raw.replace("T", " ");

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
            });
        })
        .catch(err => console.error("Error loading inbox:", err));
});