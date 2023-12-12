export function generatePostHTML(post) {
  const {
    id,
    title,
    body,
    media,
    author,
    created,
    _count: { reactions: reactionsCount, comments: commentsCount }
  } = post;

  const shortenedCreatedDate = created.slice(0, 10);
  const avatarUrl = author.avatar || "../images/profile-pictures/default-profile.jpg";

  const postHTML = `
    <div class="col-8 bg-primary m-1">
      <h3 class="card-title">${title}</h3>
      <div class="d-flex flex-row align-items-center">
        <img src="${avatarUrl}" class="rounded-circle border border-3 profile-pictures" alt="profile image">
        <p class="ms-2 mt-1">
          ${author.name}
        </p>
      </div>
      
      <div class="card-body">
        <p class="card-text overflow-hidden post-text">${body}</p>
      </div>
      <button class="btn btn-light bg-dark text-white spesificPost" data-post-id="${id}">See post</button>
      <button class="btn bg-primary text-white float-end delete-post-btn ${author.name} d-none"  title="delete post">🗑</button>
      <div class="d-flex flex-column flex-sm-row justify-content-evenly mb-3">
        <div class="p-2">⇧ ${reactionsCount} </div>
        <div class="p-2">🗨 ${commentsCount} </div>
        <div class="p-2">${shortenedCreatedDate}</div>
      </div>
    </div>
  `;
  return postHTML;
}
 
// <img src="${media}" class="post-img card-img-top mt-2 rounded mx-auto d-block" alt="${title}"></img>