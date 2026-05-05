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
                    <strong>From:</strong> ${msg.sender?.username ?? msg.sender.id ?? "Unknown"} <br>
                    <strong>Message:</strong> ${msg.content} <br>
                    <strong>${formatted}</strong>
                `;

                list.appendChild(btn);

                btn.addEventListener("click", function () {
                    const sender_id = msg.sender.id;
                    console.log("Sender ID:", sender_id);

                    window.location.href = `privatemessage.html?sender_id=${sender_id}`;
                })
            });

        })
        .catch(err => console.error("Error loading inbox:", err));
});
