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

            messages.forEach(msg => {
                const raw = msg.sentAt;
                const formatted = raw.replace("T", " ");

                const btn = document.createElement("button");
                btn.classList.add("message-item");


                btn.innerHTML = `
                    <strong>From:</strong> ${msg.sender?.username ?? msg.sender_id ?? "Unknown"} <br>
                    <strong>Message:</strong> ${msg.content} <br>
                    <strong>${formatted}</strong>
                `;

                btn.addEventListener("click", function () {
                    openPopup(msg);
                })

                list.appendChild(btn);
            });

        })
        .catch(err => console.error("Error loading inbox:", err));
});

function openPopup(msg) {
    const popup = document.getElementById("new-message-popup");
    const closePopup = document.getElementById("close-popup");
    const messageForm = document.getElementById("message-form");
    const sendMessageButton = document.getElementById("send-message");
    const messageContentField = document.getElementById("message-content");

    popup.style.display = "block";

    closePopup.addEventListener("click", function () {
        popup.style.display = "none"; // Stäng popupen
    });

    messageForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const messageContent = messageContentField.value;

        if (messageContent.trim() === "") {
            alert("Please type a message before sending.");
            return;
        }

        fetch("/api/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: messageContent,
                recipientId: msg.sender_id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Message sent successfully", data);
                popup.style.display = "none";
                messageContentField.value = "";
            })
            .catch((error) => {
                console.error("Error sending message:", error);
            });
    });
}