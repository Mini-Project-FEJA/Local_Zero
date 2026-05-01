//All JavaScript för frontpage


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

        console.log(initiative);

        try {
            const response = await fetch("http://localhost:8081/create-initiative", {
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