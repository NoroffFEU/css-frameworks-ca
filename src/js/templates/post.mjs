export function postTemplateA(postData) {
  return `<div class="post" id=${postData.id}>${postData.title}</div>`;
}

export function postTemplateB(postData) {
  const post = document.createElement("div");
  post.classList.add("post");
  post.innerHTML = postData.title;
  post.innerHTML += `<div>${postData.id}</div>`;

  if (postData.media) {
    const img = document.createElement("img");
    img.src = postData.media;
    img.alt = `Image from ${postData.title}`;
    post.append(img);
  }

  return post;
}

export function renderPostTemplate(postData, parent) {
  //parent.innerHTML += postTemplateA(postData);
  parent.append(postTemplateB(postData));
}

export function renderPostTemplates(postDataList, parent) {
  console.log(parent);
  postDataList.forEach((postData) => {
    const postElement = postTemplateB(postData);
    parent.append(postElement);
    console.log(parent);
  });
}
