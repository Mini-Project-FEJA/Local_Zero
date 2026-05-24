import {QueryBuilder} from "./query-builder.js";

export async function getNewestInitiatives(category, limit) {

    try {
        const initiatives = await new QueryBuilder("initiatives")
            .withCategory(category)
            .newestFirst()
            .withLimit(limit)
            .executeSearch();
        console.log(initiatives);
        return initiatives;
    } catch (error) {
        console.error("Couldn't fetch latest initiatives ", error);
        return [];
    }
}

export async function getLatestPosts(userId, limit) {
    try {
        const latestPosts = await new QueryBuilder("posts")
            .perUser(userId)
            .newestFirst()
            .withLimit(limit)
            .executeSearch();
        console.log(latestPosts);
        return latestPosts;
    } catch (error) {
        console.error("Couldn't fetch latest posts ", error);
        return [];
    }
}

export async function loadPostAndInitiativeFeed() {

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    const [posts, initiatives] = await Promise.all([
        getLatestPosts(null, 10),
        getNewestInitiatives(null, null)
    ]);

    const combinedFeed = [...posts, ...initiatives];

    combinedFeed.sort((a, b) => {
        const timeA = new Date(a.createdAt || a.startTime);
        const timeB = new Date(b.createdAt || b.startTime);

        return timeB - timeA;
    })

    console.log(combinedFeed);

    for (const item of combinedFeed) {
        if (item.type === "POST") {
            await createFeedPostCard(item, "frontpage-feed-container");
        } else if (item.type === "INITIATIVE") {
            await createFeedInitiativeCard(item, "frontpage-feed-container");
        }
    }
}

export function createFeedPostCard(post, containerId) {

    const container = document.getElementById(containerId);

    const card = document.createElement("div");
    card.className = "feed-card feed-post-card";

    card.innerHTML = `
        <div class="feed-card-header feed-post-card-header">
            <h3 class="poster-name">Poster: </h3>
            <h3 class="post-timestamp">Tid</h3>
        </div>
        <div class="card-content">
            <btn id="view-post"></btn>
            <p class="post-description">Text</p>
        </div>
    `

    card.querySelector(".poster-name").textContent = `Posted by: ${post.user.username}`;
    card.querySelector(".post-timestamp").textContent = `Created at: ${formatDate(post.createdAt)}`;
    card.querySelector(".post-description").textContent = `${post.description}`;

    container.appendChild(card);

    return card;
}

function createFeedInitiativeCard(initiative, containerId) {
    const container = document.getElementById(containerId);

    const card = document.createElement("div");
    card.className = "feed-card feed-initiative-card";

    card.innerHTML = `
        <div class="feed-card-header feed-initiative-card-header">
            <h2 class="initiative-title"></h2>
        
            <div class="feed-card-sub-header">
                <div class="initiative-info">
                    <h3 class="initiative-host">Host: </h3>
                    <h3 class="initiative-location"></h3>
                </div>
                <div class="initiative-time">
                    <h3 class="initiative-start-time"></h3>
                    <h3 class="initiative-end-time"></h3>
                </div>
            </div>
            
        </div>
        <div class="card-content">
            <p class="initiative-description">Text</p>
        </div>
    `

    card.querySelector(".initiative-title").textContent = `Initiative: ${initiative.title}`;
    card.querySelector(".initiative-host").textContent = `Host: ${initiative.user.username}`;
    card.querySelector(".initiative-location").textContent = `Location: ${initiative.location}`;
    card.querySelector(".initiative-start-time").textContent = `Starts at: ${initiative.startTime || "Not specified"}`;
    card.querySelector(".initiative-end-time").textContent = `Ends at: ${initiative.endTime || "Not specified"}`;

    card.querySelector(".initiative-description").textContent = `Description: ${initiative.description}`;

    container.appendChild(card);
    return card;
}

function formatDate(isoString) {
    const date = new Date(isoString);

    return (
        date.getFullYear() + "-" +
        String(date.getMonth() + 1).padStart(2, "0") + "-" +
        String(date.getDate()).padStart(2, "0") + " " +
        String(date.getHours()).padStart(2, "0") + ":" +
        String(date.getMinutes()).padStart(2, "0")
    );
}