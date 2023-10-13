import endpointObject from "./endpoints.js";
import optionFactory from "./optionFactory.js";
import callApi from "./callApi.js";
import renderModal from "./renderModal.js";
import fadeText from "./fadeText.js";
const endpoint = endpointObject(
  JSON.parse(localStorage.getItem("currentUser"))
);
function showModal() {
  document.querySelector("#modalEdit").style.display = "block";
}

const editObject: {
  title: string;
  body: string;
  tags: string[];
  media?: string;
  id: number;
  setAll: Function;
} = {
  body: "",
  title: "",
  tags: [],
  media: "",
  id: 0,
  setAll: function (
    title: string,
    body: string,
    tags: string[],
    media: string
  ) {
    if (body) this.body = body;
    if (title) this.title = title;
    if (tags.length > 0) this.tags = tags;
    if (media) this.media = media;
  },
};

function getPostText(id) {
  const modalTitle = document.querySelector(
    "#title__modal--edit"
  ) as HTMLInputElement;
  const modalBody = document.querySelector(
    "#body__modal--edit"
  ) as HTMLInputElement;
  const modalTags = document.querySelector(
    "#tags__modal--edit"
  ) as HTMLInputElement;

  modalBody.addEventListener("input", () => {
    editObject.body = modalBody.value;
    console.log(editObject);
  });
  modalTitle.addEventListener("input", () => {
    editObject.title = modalTitle.value;
  });
  modalTags.addEventListener("input", () => {
    editObject.tags = modalBody.value.split("#");
  });

  modalTitle.value = document.querySelector(`#title${id}`)?.innerText;
  modalBody.value = document.querySelector(`#body${id}`)?.innerText;
  const tagArr = Array.from(document.querySelectorAll(`.tag${id}`));

  modalTags.value = tagArr.map((tag) => tag.innerText).join("#");
  editObject.setAll(
    document.querySelector(`#body${id}`)?.innerText,
    document.querySelector(`#title${id}`)?.innerText,
    tagArr.map((element) => element.innerText)
  );
  console.log(tagArr);
}

export default async function updatePost() {
  const test = await renderModal(1);
  document.querySelectorAll("[data-update-id]").forEach((button) =>
    button.addEventListener("click", () => {
      const id = button.dataset.updateId;
      editObject.id = id;
      getPostText(id);
      showModal();
    })
  );

  document.querySelector("#close-modal")?.addEventListener("click", () => {
    document.querySelector("#modalEdit").style.display = "none";
  });

  const postButton = document.querySelector("#modal-post-button");
  postButton?.addEventListener("click", () => {
    const editOption = optionFactory("PUT", editObject, endpoint);
    const id = editObject.id;
    console.log(id);
    callApi(endpoint.getId(id), editOption);
    document.querySelector("#modalEdit").style.display = "none";
    fadeText("update successfull!:D");
  });
}
