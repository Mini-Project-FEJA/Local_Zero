import {loadPopupWindowButtons,
    loadTogglePopupButtons,
    setupCreateButton,
    fetchMyInitiatives,
    fetchAllInitiatives} from "./initiatives-utils.js";
import {loadLeftSidebar, loadRightSidebar, loadInitiativePopup} from "./app.js";

async function initialize() {
    await loadLeftSidebar();
    await loadRightSidebar();
    await loadInitiativePopup();

    await fetchMyInitiatives();
    await fetchAllInitiatives();

    await loadPopupWindowButtons();
    await loadTogglePopupButtons();
    setupCreateButton();
}

initialize();