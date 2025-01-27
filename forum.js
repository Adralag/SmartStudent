document.getElementById("postForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let postContent = document.getElementById("postContent").value;
    let forumPosts = document.getElementById("forumPosts");

    if (username.trim() === "" || postContent.trim() === "") {
        alert("Please fill in all fields!");
        return;
    }

    let postElement = document.createElement("div");
    postElement.classList.add("forum-post");
    postElement.innerHTML = `<h4>${username}</h4><p>${postContent}</p>`;

    forumPosts.prepend(postElement);

    document.getElementById("postForm").reset();
});