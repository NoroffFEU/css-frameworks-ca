export function postTemplate(postData) {
    const post = document.createElement("div");
    post.classList.add("post");
    post.innerText = postData.title;
    post.innerText = postData.body;
    return post;
}

export function renderPostTemplate(postData, parent) {
    parent.append(postTemplate(postData))
}

export function renderPostTemplates(postDatalist, parent) {
    parent.append(...postDatalist.map(postTemplate))
}