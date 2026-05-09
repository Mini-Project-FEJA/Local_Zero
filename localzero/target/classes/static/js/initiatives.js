import {loadPopupWindowButtons,
    loadTogglePopupButtons,
    setupCreateButton,
    fetchMyInitiatives,
    fetchAllInitiatives} from "./initiatives-utils.js";
import {loadLeftSidebar} from "./app.js";

async function initialize() {
    await fetchMyInitiatives();
    await fetchAllInitiatives();
    await loadLeftSidebar();
    await loadTogglePopupButtons();
    await loadPopupWindowButtons();
    setupCreateButton();
}

initialize();