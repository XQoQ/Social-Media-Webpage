const jsonHolderURL = "https://jsonplaceholder.typicode.com/";

async function getUser() {
    const response = await fetch(jsonHolderURL + "users/");
    const json = await response.json();
    return json;
}

async function getComment() {
    const response = await fetch(jsonHolderURL + "comments/");
    const json = await response.json();
    return json;
}

async function getCatImage() {
    const response = await fetch("https://cataas.com/cat");
    const blob = await response.blob();
    return blob;
}

async function getCatGIF() {
    const response = await fetch("https://cataas.com/cat/gif");
    const blob = await response.blob();
    return blob;
}

const mainDiv = document.getElementById("main-div");
let numToGenerate = 5;

async function fetchPosts(numWanted) {
    for (let i = 0; i < numWanted; i++) {
        let postDiv = document.createElement("div");
        postDiv.className = "post";

        try {
            // Profile Section
            const profileDiv = document.createElement("div");
            profileDiv.className = "post-profile";

            const profileImgEl = document.createElement("img");
            profileImgEl.className = "post-profile-img";
            const userProfileImgBlob = await getCatImage();
            profileImgEl.src = URL.createObjectURL(userProfileImgBlob);
            profileDiv.append(profileImgEl);

            const usernameEl = document.createElement("div");
            usernameEl.className = "post-username";
            const usernameJSON = await getUser();
            let randUserIndex = Math.floor(Math.random() * usernameJSON.length);
            usernameEl.textContent = `${JSON.stringify(usernameJSON[randUserIndex].name).substring(1, usernameJSON[randUserIndex].name.length)}`;
            profileDiv.append(usernameEl);

            postDiv.append(profileDiv);

            // Image Section
            const catGIFEl = document.createElement("img");
            catGIFEl.className = "post-image";
            const catGIFBlob = await getCatGIF();
            catGIFEl.src = URL.createObjectURL(catGIFBlob);
            postDiv.append(catGIFEl);

            // Comment Section
            const commentDiv = document.createElement("div");
            commentDiv.className = "post-comment";
            const comments = await getComment();

            let randCommenterIndex = Math.floor(Math.random() * usernameJSON.length);
            const commenter = `${JSON.stringify(usernameJSON[randCommenterIndex].name).substring(1, usernameJSON[randCommenterIndex].name.length)}`;
            const commenterEmail = `${JSON.stringify(usernameJSON[randCommenterIndex].email)}`;
            let randCommentIndex = Math.floor(Math.random() * comments.length);

            const commenterSpan = `<span class='commenter-name' style='font-weight: bold;'>${commenter}</span>`;
            const commenterEmailSpan = `<span class='commenter-email'>${commenterEmail}</span>`;
            commentDiv.innerHTML = commenterSpan + " " + commenterEmailSpan + "<br>" + comments[randCommentIndex].body;
            postDiv.append(commentDiv);

            // Append to Main Div
            mainDiv.append(postDiv);
        } catch (error) {
            console.error("Failed to fetch cat image or comment", error);
        }
    }
}

const pageTitle = document.createElement("h1");
pageTitle.className = "page-title"; 
pageTitle.innerText = "Planet Meow";
mainDiv.append(pageTitle);
fetchPosts(numToGenerate);
