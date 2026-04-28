//All JavaScript för frontpage

document.getElementById("new-initiative-button").addEventListener("click",function () {
    const popupBox = document.getElementById("initiative-popup");
    popupBox.classList.toggle("visible");
    console.log("popup visible");
})


const createInitiativeButton = document.getElementById("create-initiative-button");

if (createInitiativeButton) {
    createInitiativeButton.addEventListener("click", async function(e) {

        const user = localStorage.getItem("user");

        const titleInput = document.getElementById("initiative-title");
        const startDateInput = document.getElementById("initiative-start-date");
        const startTimeInput = document.getElementById("initiative-start-time");
        const endDateInput = document.getElementById("initiative-end-date");
        const endTimeInput = document.getElementById("initiative-end-time");
        const categoryInput = document.getElementById("initiative-categories");
        const locationInput = document.getElementById("initiative-location");
        const visibilityInput = document.getElementById("initiative-visibility");
        const descriptionInput = document.getElementById("initiative-description-field");

        const initiative = {
            title: titleInput.value,
            startDate: startDateInput.value,
            startTime: startTimeInput.value,
            endDate: endDateInput.value,
            endTime: endTimeInput.value,
            category: categoryInput.value,
            location: locationInput.value,
            visibility: visibilityInput.value,
            description: descriptionInput.value,

        }

    })

}