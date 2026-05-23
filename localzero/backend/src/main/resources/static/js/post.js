async function initialize() {

    await Promise.all([
        fetchMyPosts(),
        fetchAllPosts()
    ]);

}
initialize();

async function fetchAllPosts() {

    try {
        const containerID = "posts-list";
        const container = document.getElementById(containerID);

        container.innerHTML = "";
        const response = await fetch("http://localhost:8081/posts/search");

        const allPosts = await response.json();

        const user = JSON.parse(localStorage.getItem("user"));

        for (const post of allPosts) {

            const isCreator = user && user.id === post.user.id;

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

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) return;

        const container = document.getElementById("posts-list");

        const createdPosts = await InitiativeProxy.getPosts(
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
    // Stoppa sidan från att ladda om
    if (event) event.preventDefault();

    //  Hämta input-fälten och själva filen
    const currentUser = localStorage.getItem("user");
    const userId = JSON.parse(currentUser);
    const description = document.getElementById("post-id").value;
    const imageInput = document.getElementById("image-id");
    const imageFile = imageInput.files[0]; // Hämtar själva filobjektet

    //  Bygg upp ett FormData-objekt
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("description", description);

    if (imageFile) {
        formData.append("image", imageFile);
    }

   //Skicka anropet
    fetch("http://localhost:8081/posts/create", {
        method: "POST",
        body: formData
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Kunde inte spara inlägget");
        })
        .then(data => {
            console.log("Inlägget sparades!", data);

        })
        .catch(error => {
            console.error("Fel:", error);
        });
}


 