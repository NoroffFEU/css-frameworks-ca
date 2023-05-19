import { setDeletePostListener } from "../../handlers/posts/deletePost.js";
import { dateTemplate } from "../components/dateTemplate.js";

export function postsTemplate(postData) {
  const postContainer = document.createElement("div");
  postContainer.classList.add("post");
  postContainer.innerHTML += `
  <div class="post d-flex  border-bottom mb-5">
  ${postData.author.avatar
          ? `<img src="${postData.author.avatar}" class="rounded-circle" height="50" width="50" onerror="this.src='/images/user-icon-image-placeholder.jpg'" alt="${postData.author.name}">`
          : `<img src="/images/user-icon-image-placeholder.jpg" class="rounded-circle" height="50" width="50" alt="${postData.author.name}">`
      }

  <div class="post-content ps-3">
      <h4 class="text-body">
      ${postData.title}
        <span class="small text-muted">• ${dateTemplate(postData.created)} </span>
      </h4>
     <h5>By: ${postData.author.name
      }</a></h5>
    <p style="line-height: 1.2;">
    ${postData.body}   
    </p>
    <p style="line-height: 1.2;">
    Tags: ${postData.tags}   
    </p>
    <a href="/post/?id=${postData.id
      }">View post...</a>
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
  <div class="actionBtns">
  <a class="btn btn-warning" href="/post/edit/?id=${postData.id
      }"" role="button">Edit</a>
  <button class="btn btn-danger btn-delete" data-id="${postData.id}" type="button">Delete</button>
  </div> 
</div>
`
  return postContainer;
}


export function renderPostsTemplates(postDataList, parent) {
  parent.append(...postDataList.map(postsTemplate))
  setDeletePostListener();
}


//SINGLE POST
export function singlePostTemplate(postData) {
  const postContainer = document.createElement("div");
  postContainer.classList.add("post");
  postContainer.innerHTML += `
  <div class="post d-flex">
  ${postData.author.avatar
          ? `<img src="${postData.author.avatar}" class="rounded-circle" height="50" width="50"  onerror="this.src='/images/user-icon-image-placeholder.jpg'" alt="${postData.author.name}">`
          : `<img src="/images/user-icon-image-placeholder.jpg" class="rounded-circle" height="50" width="50" alt="${postData.author.name}">`
      }

  <div class="post-content ps-3">
      <h4 class="text-body">
      ${postData.title}
        <span class="small text-muted font-weight-normal">• ${dateTemplate(postData.created)}  </span>
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
console.log(postData.comments);


  return postContainer;

}
export function renderSinglePostTemplate(postData, parent) {
  parent.append(singlePostTemplate(postData))
}