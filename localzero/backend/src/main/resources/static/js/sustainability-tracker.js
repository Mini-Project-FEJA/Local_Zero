import {loadLeftSidebar, loadRightSidebar} from "./app.js";

async function initialize() {
    await loadLeftSidebar();
    await loadRightSidebar();
    await loadDashboard();
}

initialize();

window.logAction = async function(actionType) {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("No logged in user found.");
        return;
    }

    try {
        const response = await fetch("/api/tracker", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                actionType: actionType,
                userId: user.id
            })
        });

        const message = await response.text();

        // alert(message);
        await loadDashboard();

    } catch (error) {
        console.error(error);
        alert("Failed to log eco action.");
    }
}

async function loadDashboard() {

    const user =
        JSON.parse(localStorage.getItem("user"));

    const response = await fetch(
        `/api/tracker/dashboard/${user.id}`
    );

    const data = await response.json();

    document.getElementById("total-carbon")
        .innerText =
        `${data.totalCarbonSaved} kg CO₂`;

    updateProgressBar("bike", data.bikeProgress);
    updateProgressBar("recycling", data.recyclingProgress);
    updateProgressBar("bottle", data.bottleProgress);

    // ACHIEVEMENTS

    const achievementList =
        document.getElementById(
            "achievement-list"
        );

    achievementList.innerHTML = "";

    data.achievements.forEach(
        achievement => {

            const li =
                document.createElement("li");

            li.innerText = achievement;

            achievementList.appendChild(li);
        }
    );
}

function updateProgressBar(type, progressData) {

    const percentage =
        (progressData.currentProgress
            / progressData.goal) * 100;

    document.getElementById(
        `${type}-progress-fill`
    ).style.width = `${percentage}%`;

    document.getElementById(
        `${type}-progress-text`
    ).innerText =
        `${progressData.currentProgress}
        / ${progressData.goal}`;
}