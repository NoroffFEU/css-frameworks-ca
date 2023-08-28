export function postTemplate(postData) {
    const post = document.createElement("div");
    post.classList.add("post", "m-5", "p-4", "bg-secondary", "border", "border-primary", "rounded");

    const title = document.createElement("h2");
    title.classList.add("h4", "text-primary"); 
    title.innerText = postData.title;
    post.appendChild(title);

    const body = document.createElement("p");
    body.innerText = postData.body;
    post.appendChild(body);

    if (postData.media) {
        const imgContainer = document.createElement("div");
        const img = document.createElement('img');
        img.src = postData.media;
        img.alt = `Image from ${postData.title}`;
        img.classList.add("img-fluid", "rounded");
        img.style.width = "300px";
        img.style.height = "200px";
        imgContainer.appendChild(img);

        post.appendChild(imgContainer);
    }

    return post;
}

export function renderPostTemplate(postData, parent) {
    parent.append(postTemplate(postData))
}

export function renderPostTemplates(postDataList, parent) {
    parent.append(...postDataList.map(postTemplate))
}
