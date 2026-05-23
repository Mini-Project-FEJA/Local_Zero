async function initialize() {

    await Promise.all([
        fetchMyPosts(),
        fetchAllPosts()
    ]);

}

initialize();


var postDetails = {
    "post-id" : "",
    "image-id" : null

}


/*function formatDateTime(date) {

    const dateObj = new Date(date);

    return dateObj.toLocaleString("sv-SE", {
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit"
    });

}

 */


async function fetchAllPosts() {

    try {

        const containerID = "posts-list";

        const container =
            document.getElementById(containerID);

        container.innerHTML = "";

        const response =
            await fetch("http://localhost:8081/posts/search");

        const allPosts = await response.json();

        const user =
            JSON.parse(localStorage.getItem("user"));

        for (const post of allPosts) {

            const isCreator =
                user && user.id === post.user.id;

            if (!isCreator) {

                createPostCard(post, container);

            }

        }

    } catch (error) {

        console.error(error);

    }

}


async function fetchMyPosts() {

    try {

        const user =
            JSON.parse(localStorage.getItem("user"));

        if (!user) return;

        const container =
            document.getElementById("posts-list");

        const createdPosts =
            await InitiativeProxy.getPosts(
                `created/${user.id}`
            );

        for (const post of createdPosts) {

            createPostCard(post, container, true);

        }

    } catch (error) {

        console.error(error);

    }

}

function savePost(event) {
    // 1. Stoppa sidan från att ladda om
    if (event) event.preventDefault();

    // 2. Hämta input-fälten och själva filen (inte bara sökvägen/värdet)
    const currentUser = localStorage.getItem("user");
    const userId = JSON.parse(currentUser);
    const description = document.getElementById("post-id").value;
    const imageInput = document.getElementById("image-id");
    const imageFile = imageInput.files[0]; // Hämtar själva filobjektet

    // 3. Bygg upp ett FormData-objekt (matchar @RequestParam och MultipartFile)
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("description", description);

    if (imageFile) {
        formData.append("image", imageFile);
    }

    // 4. Skicka anropet (Ta bort Content-Type header, webbläsaren sätter rätt automatiskt för FormData)
    fetch("http://localhost:8081/posts/create", {
        method: "POST",
        body: formData // Skicka FormData direkt, använd INTE JSON.stringify
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Kunde inte spara inlägget");
        })
        .then(data => {
            console.log("Inlägget sparades!", data);
            // Här kan du nollställa formuläret eller uppdatera UI:t
        })
        .catch(error => {
            console.error("Fel:", error);
        });
}


/*function createPostCard(post, container, isMine = false) {

    const card = document.createElement("div");

    card.classList.add("post-card");

    const formattedDate =
        post.createdAt
            ? formatDateTime(post.createdAt)
            : "";

    let imageHTML = "";

    if (post.imageUrl) {

        imageHTML = `
            <img 
                class="post-image"
                src="http://localhost:8081${post.imageUrl}"
                alt="Post image"
            />
        `;

    }

    card.innerHTML = `
    
        <div class="card-header">
        
            <h3>${post.user.username}</h3>
            
            <small>${formattedDate}</small>
            
        </div>

        <p>${post.description ?? ""}</p>

        ${imageHTML}

        <div class="post-footer">
        
            ❤️ ${post.amountOfLikes}
            
        </div>
    
    `;

    if (isMine) {

        card.querySelector(".card-header")
            .classList.add("hosted-initiatives-header");

    }

    container.prepend(card);

}


const postForm =
    document.getElementById("post-form");


if (postForm) {

    postForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();

            try {

                const currentUser =
                    JSON.parse(
                        localStorage.getItem("user")
                    );

                if (!currentUser) {

                    console.log("No user found");

                    return;

                }

                const description =
                    document.getElementById("post-input").value;

                const imageFile =
                    document.getElementById("imageInput")
                        .files[0];

                const formData = new FormData();

                console.log(formData);

                formData.append(
                    "userId",
                    currentUser.id
                );

                formData.append(
                    "description",
                    description
                );

                if (imageFile) {

                    formData.append(
                        "image",
                        imageFile
                    );

                }

                console.log(currentUser.id);
                console.log(description);
                console.log(imageFile);

                const response =
                    await fetch(
                        "http://localhost:8081/posts",
                        {
                            method: "POST",
                            body: formData
                        }
                    );

                if (response.ok) {

                    document.getElementById(
                        "post-input"
                    ).value = "";

                    document.getElementById(
                        "imageInput"
                    ).value = "";

                    await Promise.all([
                        fetchMyPosts(),
                        fetchAllPosts()
                    ]);

                } else {

                    console.log(
                        "Could not create post"
                    );

                }

            } catch (err) {

                console.error(err);

            }

        }
    );

}

 */