
async function initialize() {

    await fetchAllInitiatives();
    await fetchInitiativesByUserID();

}

async function fetchAllInitiatives() {
    try {
        const response = await fetch("http://localhost:8081/initiatives/get-all-initiatives")

        if (!response.ok) {
            throw new Error("Error fetching all initiatives")
        }
        const allInitiatives = await response.json();

        const userString = localStorage.getItem("user");
        const user = JSON.parse(userString);

        allInitiatives.forEach(initiative => {
            if (user.id !== initiative.user.id) {
                createInitiativeCard(initiative, "all-initiatives-container");
            }
        })

        console.log(allInitiatives);

    } catch (error) {
        console.log(error);
    }
}

async function fetchInitiativesByUserID() {

    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);

    if (!user || !user.id) {
        console.log("No user or user ID found in localStorage");
        return;
    }
    const userID = user.id;

    try {
        const response = await fetch(`http://localhost:8081/initiatives/user/${userID}`);

        if (!response.ok) {
            throw new Error("Error fetching initiatives by ID")
        }

        const myInitiatives = await response.json();

        myInitiatives.forEach(initiative => {
            createInitiativeCard(initiative, "my-initiatives-container");
        })

        const headers = document.querySelectorAll("#my-initiatives-container > .initiative-card > .card-header");
        headers.forEach((header) => {
            header.classList.add("my-initiatives-header");
        });

        console.log(myInitiatives);

    } catch (error) {
        console.log(error);
    }
}

function createInitiativeCard(initiative, elementID) {
    const initiativeContainer = document.getElementById(elementID);

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

    const userString = localStorage.getItem("user")
    const user = JSON.parse(userString);
    if (user.id !== initiative.user.id ) {
        card.querySelector(".card-header").innerHTML +=
            `<button class="join-initiative-button">JOIN</button>`
    }

    initiativeContainer.appendChild(card);

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

initialize();
