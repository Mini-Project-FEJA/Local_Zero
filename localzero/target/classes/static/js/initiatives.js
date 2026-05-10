import {loadPopupWindowButtons,
    loadTogglePopupButtons,
    setupCreateButton,
    fetchMyInitiatives,
    fetchAllInitiatives} from "./initiatives-utils.js";
import {loadLeftSidebar, loadRightSidebar} from "./app.js";

async function initialize() {
    await loadLeftSidebar();
    await loadRightSidebar();
    await fetchMyInitiatives();
    await fetchAllInitiatives();
    await loadTogglePopupButtons();
    await loadPopupWindowButtons();
    setupCreateButton();
}

initialize();