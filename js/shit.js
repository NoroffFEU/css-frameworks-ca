(function () {
  const methodOptions = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  fetch(`${API_BASE_URL}/profiles/${user.name}`, methodOptions)
    .then((data) => data.json())
    .then((json) => {
      console.log("Fetch:", json);
      displayName.innerText = json.name;
      countPosts.innerText = json._count.posts;
      countFollowers.innerText = json._count.followers;
      countFollowing.innerText = json._count.following;
    });
  fetch(`${API_BASE_URL}/profiles/${user.name}/posts?_author=true&_comments=true&_reactions=true`, methodOptions)
    .then((data) => data.json())
    .then((json) => {
      console.log("Fetch:", json);
      loader.classList.add("d-none");
      if (json.length === 0) {
        noPostsMessage.classList.remove("d-none");
      }
      json.forEach(({ author, body, comments, created, id, media, reactions, tags, title, updated, _count }) => {
        container.innerHTML += `
          <div class="row bg-light border rounded-4 py-2 mb-3 post">
            <a class="p-3 rounded-5 col-auto"></a>
            <div class="col me-4">
              <div class="mb-2 row justify-content-between">
                <div class="col-auto fw-bold rounded-3">${author.name}</div>
                <span class="col-auto p-0" role="button"
                  ><i class="fa-solid fa-ellipsis"></i>
                  <div
                    id="postOptions"
                    class="rounded-3 btn-group-vertical text-white position-absolute"
                    style="display: none"
                  >
                    <button id="editButton" class="row p-2 btn btn-dark">Edit</button>
                    <button class="deleteButton row p-2 btn btn-dark">Delete</button>
                  </div>
                </span>
              </div>
              <p>${title}</p>
              <p>${body}</p>
              <div class="row">
                <a data-id="${id}" class="col-auto reactions"
                  ><i class="fa-regular fa-heart"></i>
                  ${_count.reactions}</a
                >
                <a class="col-auto"
                  ><i class="fa-regular fa-comment"></i>
                  ${_count.comments}</a
                >
              </div>
            </div>
          </div>
            `;

        deleteButton.addEventListener("click", function (event) {
          deletePost(id).then(() => {
            window.location.reload();
          });
        });
      });
    });
})();
