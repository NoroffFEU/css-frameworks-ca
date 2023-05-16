import { API_SOCIAL_URL } from "../api/constants.js";
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
    <button class="btn btn-danger btn-delete" type="button" onClick="deletePost(${postData.id
    })">Delete</button>
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
  </div>`;


  return postContainer;

}
export function renderSinglePostTemplate(postData, parent) {
  parent.append(singlePostTemplate(postData))
}

// export function commentsTemplates(postData) {
//   for (let i = 0; i < comments.length; i++) {
//     const COMMENTER_URL = `${API_SOCIAL_URL}/profiles/${sortedComments[i].owner}?_posts=true&_author=true&_following=true&_followers=true`;
//     const commenterData = await authFetch(COMMENTER_URL);
//     console.log(COMMENTER_URL);
//     const commentContainer = document.createElement("div");
//     commentContainer.classList.add("comment");
//     commentContainer.innerHTML += `
//   <div id="${sortedComments[i].id}" class="card d-flex flex-column p-3 mt-3">
//       <a href="./profile.html?name=${sortedComments[i].owner}">
//           <div class="d-flex align-items-center">
//               <div class="profile-img-wrapper">
//               ${commenterData.avatar
//         ? `<img src="${commenterData.avatar}" class="rounded-circle" alt="User Image" onerror="this.src='/assets/components/icons/account-icon.png'">`
//         : `<img src="/assets/components/icons/account-icon.png" alt="User Image" class="rounded-circle">`
//       }
//               </div>
//               <h3 class="no-style user-hover">${sortedComments[i].owner}</h3>
//           </div>
//       </a>
//       <div class="ms-5">
//           <p class="post-content">${sortedComments[i].body}</p>
//       </div>
//       <div class="d-flex justify-content-between">
//           <p class="post-content text-bg green-text ms-5">
//           </p>
//       </div>
//   </div>`;

//   }
// }
// export function renderCommentsTemplates(postDataList, parent) {
//   parent.append(...postDataList.map(commentsTemplates))
// }