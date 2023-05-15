export function postsTemplate(postData) {
  //   const userAvatar = document.querySelector("#profileAvatar");
  // userAvatar.innerHTML = `
  // ${
  //   //NAO DEVERIA ESTAR AQUI
  //     postData.author.avatar
  //       ? `<img src="${postData.author.avatar}"  class="rounded-circle" height="50" onerror="this.src='/images/user-icon-image-placeholder.jpg'" alt="${postData.author.name}">`
  //       : `<img src="/images/user-icon-image-placeholder.jpg" class="rounded-circle" height="50" alt="${postData.author.name}">`
  //   }`
  const postContainer = document.createElement("div");
  postContainer.classList.add("post");
  postContainer.innerHTML += `
    <div class="post d-flex  border-bottom mb-5">
    ${postData.author.avatar
      ? `<img src="${postData.author.avatar}" class="rounded-circle" height="50" onerror="this.src='/images/user-icon-image-placeholder.jpg'" alt="${postData.author.name}">`
      : `<img src="/images/user-icon-image-placeholder.jpg" class="rounded-circle" height="50" alt="${postData.author.name}">`
    }

    <div class="post-content ps-3">
        <h4 class="text-body">
        ${postData.title}
          <span class="small text-muted font-weight-normal">• ${postData.created}</span>
        </h4>
       <h5>By: <a href="/profile/index.html?name=${postData.author.name
    }">${postData.author.name
    }</a></h5>
    <div class="actionBtns">
    <a class="btn btn-warning" href="/post/edit/?id=${postData.id
    }"" role="button">Edit</a>
    <a class="btn btn-danger" href="#" role="button">Delete</a>
    </div> 
  
      <p style="line-height: 1.2;">
      ${postData.body}   
      </p>
      <a href="/post/index.html?id=${postData.id
    }">View more...</a>
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
  </div>
  `

  return postContainer;
}


export function renderPostsTemplates(postDataList, parent) {
  parent.append(...postDataList.map(postsTemplate))
}


//SINGLE POST
export function singlePostTemplate(postData) {
  const postContainer = document.createElement("div");
  postContainer.classList.add("post");
  postContainer.innerHTML += `
    <div class="post d-flex">
    ${postData.author.avatar
      ? `<img src="${postData.author.avatar}" class="rounded-circle" height="50" onerror="this.src='/images/user-icon-image-placeholder.jpg'" alt="${postData.author.name}">`
      : `<img src="/images/user-icon-image-placeholder.jpg" class="rounded-circle" height="50" alt="${postData.author.name}">`
    }

    <div class="post-content ps-3">
        <h4 class="text-body">
        ${postData.title}
          <span class="small text-muted font-weight-normal">• ${postData.created}</span>
        </h4>
       <h5>By: <a href="/profile/index.html?name=${postData.author.name
    }">${postData.author.name
    }</a></h5>
  
      <p style="line-height: 1.2;">
      ${postData.body}   
      </p>
      <div class="post-img">
          <img class="img-fluid" src="${postData.media}" alt="">
        </div>
      <ul class="list-unstyled d-flex justify-content-around m-2 pe-xl-5">
        <li><i class="far fa-heart"></i><span class="small ps-2">${postData._count.reactions}</span></li>
        <li>
          <i class="far fa-comment"><span class="small ps-2">${postData._count.comments}</span></i>
        </li>
      </ul>
    </div>
    </div>
  </div>
  <div class="commentContainer"> 
  <p style="line-height: 1.2;">
  ${postData.comments[0].body}   
  </p>
  <h5>By: <a href="/profile/index.html?name=${postData.comments[0].author.name
    }">${postData.comments[0].author.name}</a></h5>
  </div>`;


  return postContainer;

  // const commentContainer = document.querySelector("#getComments");
  // commentContainer.innerHTML += ` <p style="line-height: 1.2;">${postData.comments.body}</p>`
}
export function renderSinglePostTemplate(postData, parent) {
  parent.append(singlePostTemplate(postData))
}

// //COMMENTS
// export function commentsTemplate(postData) {
//   const commentContainer = document.createElement("div");
//   commentContainer.classList.add("comment");
//   commentContainer.innerHTML += ` <p style="line-height: 1.2;">${postData.comments.body}</p>`
//                                  return commentContainer;
// }

// export function renderCommentsTemplates(postDataList, parent) {
//   parent.append(...postDataList.map(commentsTemplate))
// }