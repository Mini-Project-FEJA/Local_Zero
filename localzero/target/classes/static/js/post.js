const form = document.getElementById("post-form");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append(
        "userId",
        1
    );

    formData.append(
        "description",
        document.getElementById("post-input").value
    );

    const imageFile =
        document.getElementById("imageInput").files[0];

    if (imageFile) {
        formData.append("image", imageFile);
    }
import {createFeedPostCard, getLatestPosts} from "./feed.js";
import {loadLeftSidebar, loadRightSidebar} from "./app.js";


async function initialize() {
    await loadLeftSidebar();
    await loadRightSidebar();
   await loadMyPosts();
}

    const response = await fetch("/posts", {
        method: "POST",
        body: formData
    });

    const post = await response.json();

    if (response.ok) {
        alert("Post uploaded!");
initialize();

        const postsList = document.getElementById("posts-list");
async function loadMyPosts() {
    const container = document.getElementById("frontpage-feed-container");

        postsList.innerHTML += `
    <div class="post-card">
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

        <p>${post.description ?? ""}</p>
    const myPosts = await getLatestPosts(userId, 20);

        ${
            post.imageUrl
                ? `<img src="${post.imageUrl}" width="300">`
                : ""
        }

    </div>
`;

        form.reset();
    }





});


    for (const post of myPosts) {
        await createFeedPostCard(post, "frontpage-feed-container");
        console.log("creating post card");
    }
}