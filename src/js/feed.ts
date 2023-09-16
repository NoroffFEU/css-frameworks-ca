import endpointObject from "./endpoints.js";

const endpoint = endpointObject("Jarle");

type htmlMethod = "POST" | "GET" | "PATCH" | "PUT" | "DELETE";

async function callApi(endpoint: string, callBack: Function, options: {}) {
  const response = await fetch(endpoint, options);
  const data = await response.json();
  callBack(data);
}

interface post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  media: string;
  created: Date;
  updated: Date;
  _count: { comments: number; reactions: number };
  author: { name: string; email: string; avatar: string; media: string };
}

function renderPosts(
  domEl: HTMLDivElement,
  { id, title, body, tags, media, created, updated, _count, author }: post
) {
  domEl.innerHTML += ` <div class="card mb-3 bg-secondary p-2 w-percentage--95">
    <div class="row">
      <div class="col-4">
        <img
          class="rounded-circle w-25"
          src=${author.avatar}
          alt="Profile picture of Thistle" />
        <span class="text-primay fs-6">${author.name}</span>
      </div>
      <div class="col-8">
      <h3>${title}</h3>
        <p class="card-text text-black">
          ${body}${media && media}
        </p>
        ${tags
          .map(
            (element) =>
              `<span class="badge text-bg-primary m-1">${element}</span>`
          )
          .join("")}
          <span class="fs-6">${created}</span>
      </div>
    </div>
  </div>`;
}

function optionFactory(method: htmlMethod, body: {}) {
  const newObject = {
    method: method,
    headers: {
      Authorization: `Bearer ${endpoint.getToken()}`,
      "Content-type": "application/json",
    },
  };
  if (Object.keys(body).length !== 0) {
    newObject.body = JSON.stringify(body);
  }
  return newObject;
}

const postOption = optionFactory("GET", {});

console.log(postOption);

callApi(
  endpoint.allPostsFollowed,
  (data: post[]) => {
    data.forEach((element: post) =>
      renderPosts(document.querySelector("#feed--container"), element)
    );
  },
  postOption
);

const createMessageTitle = document.querySelector("#title--feed");
const createMessageMessage = document.querySelector("#text-body--feed");
const createMessageMedia = document.querySelector("#media--feed");
const createMessageTags = document.querySelector("#tags--feed");
const postButton = document.querySelector("#post--button");

createMessageMedia?.addEventListener("input", () => {
  messageObject.media = createMessageMedia.value;
});
createMessageTitle?.addEventListener("input", () => {
  messageObject.title = createMessageTitle.value;
});
createMessageMessage?.addEventListener("input", () => {
  messageObject.body = createMessageMessage.value;
  console.log(messageObject);
});
createMessageTags?.addEventListener("input", () => {
  const tagArr = createMessageTags.value.split("#");
  messageObject.tags = tagArr;
  console.log(messageObject);
});

const messageObject: { title: string; message: string; media: string } = {
  title: "",
  body: "",
  media: "",
};

postButton?.addEventListener("click", () => {
  const message = optionFactory("POST", messageObject);
  callApi(
    endpoint.createPost,
    (data) => {
      console.log(data);
    },
    message
  );
});
