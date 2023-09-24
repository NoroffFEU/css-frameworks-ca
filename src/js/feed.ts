import endpointObject from "./endpoints.js";

const endpoint = endpointObject("Jarle");

const sortInput = document.querySelector("#sort--feed") as HTMLSelectElement;
const sortOrder = document.querySelector("#sort--order") as HTMLInputElement;
const searchInput = document.querySelector("#search--feed") as HTMLInputElement;

/*sortOrder.addEventListener("input", () => {
  endpoint.sortAfter() = endpoint.sortOrder(
    endpoint.sortAfter(sortInput.value),
    sortOrder.value
  );
  endpoint.sortAfter();
});

sortInput.addEventListener("input", () => {
  console.log(sortInput.value);
});
*/
function observerTargetClosure() {
  let target: Element;
  function setTarget() {
    if (document.querySelectorAll("[data-observed]")) {
      const observedObj = document.querySelectorAll("[data-observed]");
      target = observedObj[observedObj.length - 1];
    }
  }
  function isObserving(bool: boolean, obs) {
    console.log(target);
    bool ? obs.observe(target) : obs.unobserve(target);
  }

  return [setTarget, isObserving];
}
const [setTarget, isObserving] = observerTargetClosure();

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
  domEl.innerHTML += ` <div data-observed  class=" card mb-3 bg-secondary p-2 w-percentage--95">
    <div class="row">
      <a href="/src/profile/index.html?user=${author.name}" class="col-4">
        <img 
          class="rounded-circle w-25"
          src=${author.avatar}
          alt="Profile picture of Thistle" />
        <span class="text-primay fs-6">${author.name}</span>
      </a>
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
  const newObject: {
    method: htmlMethod;
    headers: { Authorization: string; "Content-type": string };
    body?: {};
  } = {
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
  endpoint.sortAndPaginate.setString(
    endpoint.generatePaginate(sortInput.value, sortOrder.value)
  ),
  (data: post[]) => {
    data.forEach((element: post) => renderPosts(postContainer, element));

    const observedObj = document.querySelectorAll("[data-observed]");
    const target = observedObj[observedObj.length - 1];
    console.log(observedObj, target);
    setTarget();
    isObserving(true, intersectionObserver);
  },
  postOption
);

const createMessageTitle = document.querySelector(
  "#title--feed"
) as HTMLInputElement;
const createMessageMessage = document.querySelector(
  "#text-body--feed"
) as HTMLInputElement;
const createMessageMedia = document.querySelector(
  "#media--feed"
) as HTMLInputElement;
const createMessageTags = document.querySelector(
  "#tags--feed"
) as HTMLInputElement;
const postButton = document.querySelector("#post--button") as HTMLButtonElement;
const postContainer = document.querySelector(
  "#feed--container"
) as HTMLDivElement;

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

const messageObject: {
  title: string;
  body: string;
  media: string;
  tags: string[];
} = {
  title: "",
  body: "",
  media: "",
  tags: [],
};

postButton?.addEventListener("click", () => {
  const message = optionFactory("POST", messageObject);
  callApi(
    endpoint.createPost,
    (data: {}[]) => {
      console.log(data);
    },
    message
  );
});
/*
const options = optionFactory("GET", {}, endpoint);
const searchSelect = document.querySelector(
  "#select--search--feed"
) as HTMLSelectElement;
const sortInput = document.querySelector("#search--feed") as HTMLInputElement;
const searchButton = document.querySelector(
  "#search--button"
) as HTMLButtonElement;

type searchCategory = "user" | "created" | "title" | "tags";

searchButton?.addEventListener("click", () => {
  const category: searchCategory = searchSelect.value;
  const query: string = searchInput.value;
  console.log(endpoint.searchFor(category, query));
  callApi(
    endpoint.searchFor(category, query),
    (data) => {
      console.log(data);
    },
    options
  );
});
*/

const intersectionObserver = new IntersectionObserver((entries) =>
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      callApi(
        endpoint.sortAndPaginate.setString(
          endpoint.generatePaginate(sortInput.value, sortOrder.value)
        ),
        (data: post[]) => {
          data.forEach((element: post) => renderPosts(postContainer, element));
          isObserving(false, intersectionObserver);
          setTarget();
          isObserving(true, intersectionObserver);
          console.log(
            "string=" + endpoint.sortAndPaginate.getString(),
            "count=" + endpoint.sortAndPaginate.getCount(),
            data
          );
        },
        postOption
      ),
        {
          root: null,
          rootMargin: "0px",
          threshold: 1,
        };
    }
  })
);
