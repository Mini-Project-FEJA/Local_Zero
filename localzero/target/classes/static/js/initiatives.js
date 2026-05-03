
async function initialize() {
    await fetchMyInitiatives();
    await fetchAllInitiatives();
}

async function fetchAllInitiatives() {
    try {
        const response = await fetch("http://localhost:8081/initiatives/get-all-initiatives")
        const containerID = "all-initiatives-container";

        if (!response.ok) {
            throw new Error("Error fetching all initiatives")
        }
        const allInitiatives = await response.json();

        const userString = localStorage.getItem("user");
        const user = JSON.parse(userString);

        allInitiatives.forEach(initiative => {
            const isHost = (user.id === initiative.user.id);
            const isParticipant = initiative.participants?.some(p => p.id === user.id);

            if (!(isHost || isParticipant)) {
                createInitiativeCard(initiative, containerID);
            }
        })

        console.log(allInitiatives);

    } catch (error) {
        console.log(error);
    }
}

async function fetchMyInitiatives() {

    const user = JSON.parse(localStorage.getItem("user"));
    const containerID = "my-initiatives-container";

    if (!user) {
        console.log("No user or user ID found in localStorage");
        return;
    }
    const userID = user.id;

    try {
        const [hostedResponse, joinedResponse] = await Promise.all([
            fetch(`http://localhost:8081/initiatives/hosted/${userID}`),
            fetch(`http://localhost:8081/initiatives/joined/${userID}`)
        ])

        if (!hostedResponse.ok || !joinedResponse.ok) {
            throw new Error("Error fetching initiatives by ID")
        }

        const hosted = await hostedResponse.json();
        const joined = await joinedResponse.json();

        hosted.forEach(initiative => {
            const card = createInitiativeCard(initiative, containerID);
            card.querySelector(".card-header").classList.add("hosted-initiatives-header");
        })

        joined.forEach(initiative => {
            const card = createInitiativeCard(initiative, containerID);
            card.querySelector(".card-header").classList.add("joined-initiatives-header");
        })

    } catch (error) {
        console.log(error);
    }
}

function createInitiativeCard(initiative, containerID) {

    const initiativeContainer = document.getElementById(containerID);

    const card = document.createElement("div");
    card.className = "initiative-card";

    card.innerHTML = `
        <div class="card-header">
            <h2 class="card-title"></h2>
        </div>
        <div class="card-middle">
            <h3 class="card-host"></h3>
            <h3 class="card-category"></h3>     
            <p class="card-description"></p>
        </div>
        <div class="card-footer">
            <span class="card-time"></span>
            <span class="card-visibility"></span>
            <span class="card-location"></span>
        </div>
    `

    const initiativeStarTime = formatDateTime(initiative.startTime);
    const initiativeEndTime = formatDateTime(initiative.endTime);

    card.querySelector(".card-title").textContent = initiative.title || "No title provided";
    card.querySelector(".card-host").textContent = `Host: ${initiative.user.username}`;
    card.querySelector(".card-category").textContent = initiative.category;
    card.querySelector(".card-description").textContent = initiative.description || "No description available";
    card.querySelector(".card-time").textContent = `${initiativeStarTime} - ${initiativeEndTime}`
    card.querySelector(".card-visibility").textContent = initiative.visibility;
    card.querySelector(".card-location").textContent = `Location: ${initiative.location || "Not specified"}`;


    const userString = localStorage.getItem("user")
    const user = JSON.parse(userString);

    const isHost = (user.id === initiative.user.id);
    const isParticipant = initiative.participants?.some(p => p.id === user.id);

    if (!(isHost || isParticipant)) {
        const joinButton = document.createElement("button");
        joinButton.className = "join-initiative-button";
        joinButton.textContent = "JOIN";
        joinButton.addEventListener("click", () => {
            joinInitiative(initiative.id);
        })

        card.querySelector(".card-header").appendChild(joinButton);
    }
    initiativeContainer.appendChild(card);

    return card;
}

function formatDateTime(date) {
    const dateObj = new Date(date);

    return dateObj.toLocaleString('sv-SE', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
    });
}

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

async function joinInitiative(initiativeID) {
    console.log("Join initiative: " , initiativeID);

    const currentUser = localStorage.getItem("user");
    const user = JSON.parse(currentUser);
    const userID = user.id;

    try {
        const response = await fetch(`http://localhost:8081/initiatives/${initiativeID}/join/${userID}`, {
            method: 'POST'
        })
        if (response.ok) {
            alert("You have joined initiative")
        }
    } catch (error) {
        console.error(error)
    }

}

initialize();

