export function postTemplate(postData) {
  const post = document.createElement("div");
  post.classList.add("posts");
  post.innerHTML = postData.title;

  const imageSrc = postData.media || "../../../images/placeholder-image.png";

  const postHTML = `
    <div class="col">
      <div class="card shadow-sm">
        <img src="${imageSrc}" 
             alt="${
               postData.media
                 ? `This image is from ${postData.title}`
                 : "Placeholder image"
             }" 
             style="max-width: 420px; max-height: 300px; object-fit: cover;">
        <div class="card-body">
          <p class="card-text">${postData.title}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-primary">Like</button>
              <button type="button" class="btn btn-sm btn-outline-primary">Comment</button>
            </div>
            <small class="text-body-secondary">${postData.likes} Likes</small>
          </div>
        </div>
      </div>
    </div>
  `;

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = postHTML.trim();
  return tempDiv.firstChild;
}

/*const postDiv = document.createElement("div");
  postDiv.innerHTML = postHTML.trim();

  const placeHolderImage = document.createElement("div");
  placeHolderImage.style.width = "300px";
  placeHolderImage.style.height = "200px";
  placeHolderImage.style.objectFit = "cover";
  placeHolderImage.style.backgroundColor = "gray";

  if (postData.media) {
    const img = document.createElement("Img");
    img.src = postData.media;
    img.alt = `This image is from${postData.title}`;
    post.append(img);
  } else {
    post.append(placeHolderImage);
  }

  return post;
}*/

/* To see how i can make it in js
             <div class="d-flex justify-content-between align-items-center">
               <div class="btn-group">
                 <button type="button" class="btn btn-sm btn-outline-primary">Like</button>
                 <button type="button" class="btn btn-sm btn-outline-primary">Comment</button>
              </div>
              <small class="text-body-secondary">136 Likes</small>*/

export function renderPostTemplate(postData, parent) {
  parent.append(postTemplate(postData));
}

export function renderPostTemplates(postDataList, parent) {
  parent.append(...postDataList.map(postTemplate));
}
