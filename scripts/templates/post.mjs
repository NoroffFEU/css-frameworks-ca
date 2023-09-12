export function postTemplate(postData) {
    const post = document.createElement("div");
    post.classList.add("post","m-2", "p-4", "bg-secondary", "border", "border-primary", "rounded");

    const titleLink = document.createElement("a");
    titleLink.href = `/post/?id=${postData.id}`; 
    titleLink.classList.add("h4", "text-primary");
    titleLink.innerText = postData.title;
    
    post.appendChild(titleLink);
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

    if (postData.tags && postData.tags.length > 0) {
        const tagsContainer = document.createElement("div");
        tagsContainer.classList.add("tags-container"); 

        postData.tags.forEach(tag => {
            const hashtag = document.createElement("span");
            hashtag.innerText = `#${tag} `;
            hashtag.classList.add("hashtag");
            tagsContainer.appendChild(hashtag);
        });

        post.appendChild(tagsContainer);
    }

    return post;
}
