const socket = new SockJS('/chat');
const stompClient = Stomp.over(socket);

stompClient.connect({}, function() {

    stompClient.subscribe('/topic/messages', function(message) {
        const msg = JSON.parse(message.body);
        addMessage(msg);
    });
});

document.getElementById("sendButton").addEventListener("click", function () {
    const input = document.getElementById("messageInput");
    const message = {
        sender: {
            id: 1,
            username: "User"
        },
        text: input.value
    };

    stompClient.send("/app/send", {}, JSON.stringify(message));

    input.value = "";
});

function addMessage(msg) {

    const chatBox = document.querySelector(".chat-box");

    const div = document.createElement("div");

    div.classList.add("message", "received");

    div.innerText = msg.sender + ": " + msg.content;

    chatBox.appendChild(div);
}