export function afterDeleteTemplate() {
    postContainer.innerHTML = "";

    const afterDeleteBox = document.createElement("div");
    afterDeleteBox.innerHTML = `<h1>Your post was successfully deleted</h1>`;
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "buttonDiv d-grid align-items-center mb-3";

    const feedButton = document.createElement("a");
    feedButton.href = "/posts/index.html";
    feedButton.className = "btn btn-sm btn-secondary";
    feedButton.innerHTML = "Feed";

    const profileButton = document.createElement("a");
    profileButton.href = "/profile/index.html";
    profileButton.className = "btn btn-sm btn-primary ms-2";

    profileButton.innerHTML = "Profile";

    buttonDiv.appendChild(feedButton);
    buttonDiv.appendChild(profileButton);

    afterDeleteBox.appendChild(buttonDiv);
    postContainer.appendChild(afterDeleteBox);

    return;
}

export function afterDeleteTemplateError() {
    postContainer.innerHTML = "";

    const afterDeleteBox = document.createElement("div");
    afterDeleteBox.innerHTML = `<h1>Sorry, post not found</h1>`;
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "buttonDiv d-grid align-items-center mb-3";

    const feedButton = document.createElement("a");
    feedButton.href = "/posts/index.html";
    feedButton.className = "btn btn-sm btn-secondary";
    feedButton.innerHTML = "Feed";

    const profileButton = document.createElement("a");
    profileButton.href = "/profile/index.html";
    profileButton.className = "btn btn-sm btn-primary ms-2";

    profileButton.innerHTML = "Profile";

    buttonDiv.appendChild(feedButton);
    buttonDiv.appendChild(profileButton);

    afterDeleteBox.appendChild(buttonDiv);
    postContainer.appendChild(afterDeleteBox);

    return;
}
