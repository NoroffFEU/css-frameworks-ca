export function postTemplate(postData) {
    const post = document.createElement("div");
    post.classList.add("post");
    post.innerText = postData.title;
    post.innerText = postData.body;

    if (postData.media) {
        const img = document.createElement('img');
        img.src = postData.media;
        img.alt = `Image from ${postData.title}`;
        post.append(img)
    }
    
    return post;
}

export function renderPostTemplate(postData, parent) {
    parent.append(postTemplate(postData))
}

export function renderPostTemplates(postDatalist, parent) {
    parent.append(...postDatalist.map(postTemplate))
}