import endpointObject from "./endpoints.js";
import callApi from "./callApi.js";
import renderPosts from "./renderPost.js";
import filterPosts from "./filter.js";
import createSmileyPicker from "./emoji.js";
import reactToPost from "./reactToPost.js";

const endpoint = endpointObject("Jarle");
const [setSmiley, setId, getSmiley, getId] = createSmileyPicker();

let modal = document.querySelector("#modal");
const closeModal = document.querySelector("[data-closeButton]");
closeModal?.addEventListener("click", () => {
  modal.style.display = "none";
});

const sortInput = document.querySelector("#sort--feed") as HTMLSelectElement;
const sortOrder = document.querySelector("#sort--order") as HTMLInputElement;
const searchInput = document.querySelector("#search--feed") as HTMLInputElement;
const filterButton = document.querySelector("#filter--button");
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
  endpoint.filterUrl.resetCount();
  endpoint.sortAndPaginate.setSearch(searchInput.value);
});

filterButton?.addEventListener("click", async () => {
  console.log(endpoint.filterUrl.getCount());
  endpoint.filterUrl.resetCount();
  console.log(endpoint.filterUrl.getCount());
  postContainer.innerHTML = "";
  const allPosts = await filterPosts(searchInput.value, sortInput.value);
  allPosts.forEach((post) => renderPosts(postContainer, post));
  emojiReactButton();
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
    emojiReactButton();
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
      console.log(target);
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
        emojiReactButton();

        isObserving(false, intersectionObserver);
        setTarget();
        isObserving(true, intersectionObserver);
      }
    }),
  {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
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

  if (array[0]?.[category]?.name) {
    console.log("author");
    foundWord = array.find(
      (post) => post[category].name.toLowerCase() === searchWord.toLowerCase()
    );
  } else if (Array.isArray(array[0]?.[category])) {
    foundWord = array.find((post) =>
      post.tags.some(
        (element) => element.toLowerCase() === searchWord.toLowerCase()
      )
    );
  } else {
    foundWord = array.find((post) => {
      //if (post === null) {
      //return false;
      // }
      post[category]?.toLowerCase().includes(searchWord?.toLowerCase());
    });
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
      console.log(error);
    }
  }
}

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
  emojiReactButton();
  const observedObj = document.querySelectorAll("[data-observed]");
  const target = observedObj[observedObj.length - 1];
  console.log(observedObj, target);
  setTarget();
  isObserving(true, intersectionObserver);
})();

document.querySelectorAll("[data-buttonSelector]").forEach((button) => {
  button.addEventListener("click", () => {
    setSmiley(button.textContent);
    const smiley = getSmiley();
    const smileyId = getId();
    if (smiley && smileyId) {
      reactToPost(smiley, smileyId);
    }
  });
});

function emojiReactButton() {
  document.querySelectorAll("[data-id]").forEach((button) => {
    button.addEventListener("click", () => {
      console.log("clicked");
      let buttonRect = button.getBoundingClientRect();

      modal.style.top = buttonRect.top + "px";
      modal.style.left = buttonRect.left + "px";
      modal.style.display = "grid";
      setId(button.dataset.id);
      console.log(getId());
    });
  });
}
