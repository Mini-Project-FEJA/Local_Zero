const communityManagers = {};
const communityContainer = document.getElementById("communityContainer");

// Lista med communities
const communities = [
    {
        id: 1,
        name: "Community: Malmö"
    },
    {
        id: 2,
        name: "Community: Lund"
    },
    {
        id: 3,
        name: "Community: Helsingborg"
    },
    {
        id: 4,
        name: "Community: Eslöv"
    }
];

// Skapa dropdown för varje community
communities.forEach(community => {
    createCommunityCard(community);
});

function createCommunityCard(community) {

    const card = document.createElement("div");
    card.className = "community-card";

    card.innerHTML = `
        <div class="community-header">
            <div class="community-name">${community.name}</div>
        </div>

        <div id="userlist-${community.id}" class="user-list">
            <div>Laddar residents...</div>
        </div>
    `;

    communityContainer.appendChild(card);

    loadUsersForCommunity(community.id);
}

async function loadUsersForCommunity(communityId) {

    try {
        const response = await fetch(
            `http://localhost:8081/users/users-by-community/${communityId}`
        );

        const users = await response.json();

        const container = document.getElementById(`userlist-${communityId}`);

        container.innerHTML = "";

        if (!Array.isArray(users) || users.length === 0) {
            container.innerHTML = `<div>Inga residents hittades</div>`;
            return;
        }

        users.forEach(user => {

            const row = document.createElement("div");
            row.className = "user-row";

            row.innerHTML = `
                <div class="user-card">
                    <span class="username">${user.username}</span>
    
                       <div class="buttons">
                            <button class="role-btn resident-btn">👥 Resident ✔️</button>
                            <button class="role-btn admin-btn">💎 Admin ❌</button>
                            <button class="role-btn manager">👤Manager ❌</button>
                        </div>
                </div>
            `;

            const residentBtn = row.querySelector(".resident-btn");
            const adminBtn = row.querySelector(".admin-btn");
            const managerBtn = row.querySelector(".manager");

            let isResident = true;
            let isAdmin = true;
            let isManager = false;

            residentBtn.addEventListener("click", () => {
                isResident = !isResident;
                residentBtn.textContent = isResident ? "👥 Resident ✔️" : "👥 Resident ❌";
            });

            adminBtn.addEventListener("click", () => {
                isAdmin = !isAdmin;
                adminBtn.textContent = isAdmin ? "💎 Admin ❌" : "💎 Admin ✔️";
            });

            managerBtn.addEventListener("click", () => {

                const currentManagerId = communityManagers[communityId];

                if (!currentManagerId) {
                    communityManagers[communityId] = user.id;

                    managerBtn.textContent = "👤 Manager ✔️";
                    managerBtn.classList.remove("off");

                    return;
                }

                if (currentManagerId === user.id) {
                    delete communityManagers[communityId];

                    managerBtn.textContent = "👤 Manager ❌";
                    managerBtn.classList.add("off");

                    return;
                }

                const confirmBox = document.createElement("div");
                confirmBox.className = "manager-popup";
                confirmBox.textContent = `Byter manager till ${user.username}`;

                document.body.appendChild(confirmBox);

                setTimeout(() => confirmBox.remove(), 1500);

                communityManagers[communityId] = user.id;

                const allManagerBtns =
                    document.querySelectorAll(`#userlist-${communityId} .manager`);

                allManagerBtns.forEach(btn => {
                    btn.textContent = "👤 Manager ❌";
                    btn.classList.add("off");
                });

                managerBtn.textContent = "👤 Manager ✔️";
                managerBtn.classList.remove("off");
            });

            container.appendChild(row);
        });

    } catch (error) {
        console.error("Fel:", error);
    }
}