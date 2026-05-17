const BASE_URL = "http://localhost:8081";

export async function fetchAllInitiatives() {
    try {
        const containerID = "all-initiatives-container";
        const container = document.getElementById(containerID);
        container.innerHTML = "";

        const allInitiatives = await InitiativeProxy.getInitiatives("get-all-initiatives")

        const userString = localStorage.getItem("user");
        const user = JSON.parse(userString);

        console.log(allInitiatives);
        for(const initiative of allInitiatives) {
            const isHost = (user.id === initiative.user.id);
            const isParticipant = initiative.participants?.some(p => p.id === user.id);

            if (!(isHost || isParticipant)) {
                await createInitiativeCard(initiative, containerID);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export async function fetchMyInitiatives() {

    const user = JSON.parse(localStorage.getItem("user"));
    const containerID = "my-initiatives-container";
    const container = document.getElementById(containerID);
    container.innerHTML = "";

    if (!user) {
        console.log("No user or user ID found in localStorage");
        return;
    }
    const userID = user.id;

    try {
        const [hostedInitiatives, joinedInitiatives] = await Promise.all([
            InitiativeProxy.getInitiatives(`hosted/${userID}`),
            InitiativeProxy.getInitiatives(`joined/${userID}`)
        ])

        for(const hosted of hostedInitiatives) {
            const card = await createInitiativeCard(hosted, containerID);
            card.querySelector(".card-header").classList.add("hosted-initiatives-header");
        }

        for(const joined of joinedInitiatives) {
            const card = await createInitiativeCard(joined, containerID);
            card.querySelector(".card-header").classList.add("joined-initiatives-header");
        }

    } catch (error) {
        console.log(error);
    }
}

export const InitiativeProxy = {
    cache: {},

    async getInitiatives(endpoint,forceRefresh = false) {
        const storageKey = `initiatives_${endpoint}`;

        if (this.cache[endpoint] && !forceRefresh) {
            console.log("Hämtar initiatives från cache");
            return this.cache[endpoint];
        }

        if(!forceRefresh) {
            const sessionData = sessionStorage.getItem(storageKey);

            if (sessionData) {
                console.log("Hämtar initiatives från session storage");
                const parsedData = JSON.parse(sessionData);

                this.cache[endpoint] = parsedData;
                return parsedData;
            }
        }

        const response = await fetch(`${BASE_URL}/initiatives/${endpoint}`);

        if (!response.ok) {
            throw new Error("Kunde inte hämta initiative");
        }
        const data = await response.json();
        this.cache[endpoint] = data;
        sessionStorage.setItem(storageKey, JSON.stringify(data));
        return data;
    },

    invalidateCache() {
        console.log("Clear cache");
        this.cache = {};

        Object.keys(sessionStorage).forEach(key => {
            if (key.startsWith("initiatives_")) {
                sessionStorage.removeItem(key);
            }
        })
    }
}

async function createInitiativeCard(initiative, containerID) {

    const initiativeContainer = document.getElementById(containerID);

    const categories = await EnumProxy.getEnums("categories");
    const visibility = await EnumProxy.getEnums("visibility");

    const categoryObj = categories.find(cat => cat.name === initiative.category);
    const visibilityObj = visibility.find(vis => vis.name === initiative.visibility);

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
    card.querySelector(".card-category").textContent = categoryObj ? categoryObj.label : initiative.category;
    card.querySelector(".card-description").textContent = initiative.description || "No description available";
    card.querySelector(".card-time").textContent = `${initiativeStarTime} - ${initiativeEndTime}`
    card.querySelector(".card-visibility").textContent = visibilityObj ? visibilityObj.label : initiative.visibility;
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

export function loadPopupWindowButtons() {
    document.querySelectorAll(".new-initiative-button").forEach(button => {
        button.addEventListener("click", function () {
            showPopupWindow();
        })
    });
}

export function loadTogglePopupButtons() {
    document.querySelectorAll(".toggle-initiative-button").forEach(button => {
        button.addEventListener("click", function () {
            toggleInitiativePopup();
        })
    });
}

async function showPopupWindow() {
    const enumCategories = "categories";
    const enumVisibility = "visibility"

    await populateDropdown(enumCategories, "initiative-category");
    await populateDropdown(enumVisibility, "initiative-visibility");
    toggleInitiativePopup();
}

async function populateDropdown(enumType, elementId) {
    const dropdown = document.getElementById(elementId);
    const data = await EnumProxy.getEnums(enumType);

    const oldOptions = dropdown.querySelectorAll("option:not(.placeholder-option)");
    oldOptions.forEach(opt => opt.remove());

    data.forEach(item => {
        const option = new Option(item.label, item.name);
        dropdown.add(option);
    })
}

function toggleInitiativePopup() {
    const popupBox = document.getElementById("initiative-popup");
    popupBox.classList.toggle("visible");
}

async function fetchEnum(enumType) {
    const response = await fetch(`${BASE_URL}/enums/${enumType}`);
    const data = await response.json();
    return data;
}

const EnumProxy = {
    cache: {},

    async getEnums(enumType) {
        if (this.cache[enumType]) {
            //console.log("Hämtar enums från cache")
            return this.cache[enumType];
        }
        try {
            const enumData = await fetchEnum(enumType);
            this.cache[enumType] = enumData;
            //console.log("Hämtar enums från server")

            return enumData;
        } catch (error) {
            console.error("Cache-fel", error);
            throw error;
        }
    }
}

export function setupCreateButton() {

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
                const response = await fetch(`${BASE_URL}/initiatives/create-initiative`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(initiative)
                });

                if (response.ok) {
                    toggleInitiativePopup();
                    InitiativeProxy.invalidateCache();
                    await fetchMyInitiatives();
                    await fetchAllInitiatives();
                } else {
                    console.log("Couldn't create initiative: " + response);
                }

            } catch (err) {
                console.error(err);
            }
        })
    }
}

async function joinInitiative(initiativeID) {
    console.log("Join initiative: " , initiativeID);

    const currentUser = localStorage.getItem("user");
    const user = JSON.parse(currentUser);
    const userID = user.id;

    try {
        const response = await fetch(`${BASE_URL}/initiatives/${initiativeID}/join/${userID}`, {
            method: 'POST'
        })
        if (response.ok) {
            alert("You have joined initiative")
            InitiativeProxy.invalidateCache();
            await fetchMyInitiatives();
            await fetchAllInitiatives();
        }
    } catch (error) {
        console.error(error)
    }
}


