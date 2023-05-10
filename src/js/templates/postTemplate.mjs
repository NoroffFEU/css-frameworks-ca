export function postTemplate(postData) {
    const postContainer = document.createElement("div");
    postContainer.classList.add("post");
    // postContainer.innerText = postData.title;
    postContainer.innerHTML += `
    <div class="post d-flex  border-bottom mb-5">
    <img src="/images/follower-2.jpeg" class="rounded-circle" height="50" alt="Avatar" />
    <div class="post-content ps-3">
        <h4 class="text-body">
        ${postData.title}
          <span class="small text-muted font-weight-normal">• ${postData.created}</span>
        </h4>
       <h5>${postData.author.name}</h5>
  
      <p style="line-height: 1.2;">
      ${postData.body}   
        <a href="">View more...</a>
      </p>
      <div class="post-img">
          <img class="img-fluid" src="${postData.media}" alt="">
        </div>
      <ul class="list-unstyled d-flex justify-content-around mb-0 pe-xl-5">
        <li><i class="far fa-heart"></i><span class="small ps-2">${postData._count.reactions}</span></li>
        <li>
          <i class="far fa-comment"><span class="small ps-2">${postData._count.comments}</span></i>
        </li>
      </ul>
    </div>
  </div>`

    return postContainer;
}

export function renderPostTemplate(postData, parent) {
    parent.append(postTemplate(postData))
}

export function renderPostTemplates(postDataList, parent) {
    parent.append(...postDataList.map(postTemplate))
}