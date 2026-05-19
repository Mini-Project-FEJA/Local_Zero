import {createFeedPostCard, getLatestPosts} from "./feed.js";
import {loadLeftSidebar, loadRightSidebar} from "./app.js";


async function initialize() {
    await loadLeftSidebar();
    await loadRightSidebar();
   await loadMyPosts();
}

initialize();

async function loadMyPosts() {
    const container = document.getElementById("frontpage-feed-container");

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    const myPosts = await getLatestPosts(userId, 20);

    for (const post of myPosts) {
        await createFeedPostCard(post, "frontpage-feed-container");
        console.log("creating post card");
    }
}