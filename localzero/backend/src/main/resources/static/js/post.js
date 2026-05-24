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

    const userRaw = localStorage.getItem("user");

    if (!userRaw) {
        console.error("No user in localStorage");
        return;
    }

    const user = JSON.parse(userRaw);

    const userId = user?.id;

    if (!userId) {
        console.error("Missing user.id:", user);
        return;
    }

    try {
        container.innerHTML = "";
        const myPosts = await getLatestPosts(userId, 20);
        myPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        for (const post of myPosts) {
            await createFeedPostCard(post, "frontpage-feed-container");
            console.log("creating post card");
        }
    } catch (error) {
        console.error("Failed to load posts:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const userRaw = localStorage.getItem("user");

    if (!userRaw) {
        console.error("No user in localStorage");
        return;
    }

    const user = JSON.parse(userRaw);

    const newPostBtn = document.getElementById("new-post-btn");

    if (!newPostBtn) {
        console.error("#new-post-btn not found");
        return;
    }

    const postBox = document.createElement("div");
    postBox.id = "post-box";
    postBox.style.display = "none";

    postBox.innerHTML = `
        <div id="post-card">
            <textarea
                id="post-description"
                placeholder="Write something..."
                rows="4"
                cols="40"></textarea>
            
            <button class="post-page-button" id="submit-post-btn">
                Create Post
            </button>
        </div>
    `;

    newPostBtn.insertAdjacentElement("afterend", postBox);

    newPostBtn.addEventListener("click", () => {

        if (postBox.style.display === "block") {
            postBox.style.display = "none";
        } else {
            postBox.style.display = "block";
        }
    });

    postBox.addEventListener("click", (e) => {

        if (e.target.id !== "submit-post-btn") return;

        const textarea =
            document.getElementById("post-description");

        if (!textarea) {
            console.error("#post-description not found");
            return;
        }

        const description = textarea.value.trim();

        if (!description) return;

        const payload = {
            userId: user.id,
            post: {
                description: description
            }
        };

        fetch("http://localhost:8081/posts/createPost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then(async res => {

                const data = await res.json().catch(() => null);

                if (!res.ok) {
                    throw new Error(data?.message || "Request failed");
                }

                return data;
            })
            .then(post => {

                console.log("Post created:", post);

                textarea.value = "";
                postBox.style.display = "none";

                location.reload();
            })
            .catch(err => {
                console.error("Error creating post:", err);
            });

    });
});