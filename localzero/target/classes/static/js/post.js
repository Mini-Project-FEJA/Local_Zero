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

    const response = await fetch("/posts", {
        method: "POST",
        body: formData
    });

    const post = await response.json();

    if (response.ok) {
        alert("Post uploaded!");

        const postsList = document.getElementById("posts-list");

        postsList.innerHTML += `
    <div class="post-card">

        <p>${post.description ?? ""}</p>

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

