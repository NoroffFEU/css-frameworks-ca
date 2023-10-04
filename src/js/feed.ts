import endpointObject from "./endpoints.js";
import callApi from "./callApi.js";

const endpoint = endpointObject("Jarle");

const sortInput = document.querySelector("#sort--feed") as HTMLSelectElement;
const sortOrder = document.querySelector("#sort--order") as HTMLInputElement;
const searchInput = document.querySelector("#search--feed") as HTMLInputElement;
const searchButton = document.querySelector(
  "#search--button"
) as HTMLButtonElement;
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
});
createMessageTags?.addEventListener("input", () => {
  const tagArr = createMessageTags.value.split("#");
  messageObject.tags = tagArr;
});

searchInput.addEventListener("input", () => {
  endpoint.sortAndPaginate.setSearch(searchInput.value);
});

searchButton.addEventListener("click", async () => {
  const data: post[] = !searchInput.value
    ? await callApi(
        endpoint.sortAndPaginate.setString(
          endpoint.generatePaginate(sortInput.value, sortOrder.value)
        ),
        postOption
      )
    : await callApi(
        endpoint.sortAndPaginate.setString(
          endpoint.generatePaginate(sortInput.value, sortOrder.value),
          100,
          100
        ),
        postOption
      );
  console.log(data, searchInput.value);
  if (endpoint.sortAndPaginate.getCount() == 0) {
    postContainer.innerHTML = "";
  }
  if (searchInput.value) {
    let foundItem: post | undefined = await searchApi(
      data,
      sortInput.value,
      0,
      searchInput.value
    );
    console.log(foundItem ? "true" : "false");
    if (foundItem) {
      renderPosts(postContainer, foundItem);
    } else if (data.length === 1) {
      renderPosts(postContainer, data[0]);
    }
  } else {
    data.forEach((element: post) => renderPosts(postContainer, element));
    console.log("else route");
    const observedObj = document.querySelectorAll("[data-observed]");
    const target = observedObj[observedObj.length - 1];
    console.log(observedObj, target);
    setTarget();
    isObserving(true, intersectionObserver);
  }
});

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
      <a href="/src/profile/index.html?user=${
        author.name ? author.name : ""
      }" class="col-4">
        <img 
          class="rounded-circle w-25"
          src=${author.avatar ? author.avatar : ""}
          alt="Profile picture of Thistle" />
        <span class="text-primay fs-6">${author.name ? author.name : ""}</span>
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

(async () => {
  const data: post[] = await callApi(
    endpoint.sortAndPaginate.setString(
      endpoint.generatePaginate(sortInput.value, sortOrder.value)
    ),
    postOption
  );

  if (data.length === 1) {
    renderPosts(postContainer, data[0]);
  } else {
    data.forEach((element: post) => renderPosts(postContainer, element));
  }
  const observedObj = document.querySelectorAll("[data-observed]");
  const target = observedObj[observedObj.length - 1];
  console.log(observedObj, target);
  setTarget();
  isObserving(true, intersectionObserver);
})();

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

    message
  );
});

const intersectionObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        const data = await callApi(
          endpoint.sortAndPaginate.setString(
            endpoint.generatePaginate(sortInput.value, sortOrder.value)
          ),
          postOption
        );
        if (endpoint.sortAndPaginate.getCount() == 0) {
          postContainer.innerHTML = "";
        }
        if (data.length === 1) {
          renderPosts(postContainer, data[0]);
        } else
          data.forEach((element: post) => renderPosts(postContainer, element));
        isObserving(false, intersectionObserver);
        setTarget();
        isObserving(true, intersectionObserver);
      }
    }),
  {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  }
);

type category = "title" | "updated" | "tags" | "body" | "author";

async function searchApi(
  array: post[],
  category: category,
  count: number = 0,
  searchWord: string | null = null
): Promise<post | undefined> {
  if (!searchWord || count > 10) {
    return;
  }
  let foundWord;
  console.log(array[0][category].name.toLowerCase());
  if (array[0][category].name) {
    console.log("author");
    foundWord = array.find(
      (post) => post[category].name.toLowerCase() === searchWord.toLowerCase()
    );
  } else if (Array.isArray(array[0][category])) {
    foundWord = array.find((post) =>
      post.tags.some(
        (element) => element.toLowerCase() === searchWord.toLowerCase()
      )
    );
  } else {
    foundWord = array.find((post) =>
      post[category].toLowerCase().includes(searchWord?.toLowerCase())
    );
  }

  if (foundWord) {
    return foundWord;
  } else {
    try {
      const data: post[] = await callApi(
        endpoint.sortAndPaginate.setString(
          endpoint.generatePaginate(sortInput.value, sortOrder.value),
          100,
          100
        ),
        postOption
      );
      console.log(
        endpoint.sortAndPaginate.getString(),
        endpoint.sortAndPaginate.getCount()
      );
      if (data && data.length > 1) {
        return searchApi(data, category, count + 1, searchWord);
      }
    } catch (error) {
      throw error;
    }
  }
}
