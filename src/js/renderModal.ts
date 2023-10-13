import createElementFactory from "./createElementFactory.js";

export default function renderModal(count: number) {
  if (count > 5) return;
  if (document.querySelector("#modalEdit")) {
    return;
  }
  return new Promise((resolve, reject) => {
    const modalContainer = createElementFactory(
      "div",
      "",
      document.querySelector("body"),
      { id: "modalEdit" },
      "container",
      "bg-primary"
    );
    const closeButton = createElementFactory(
      "button",
      "X",
      modalContainer,
      { id: "close-modal--edit" },
      "btn-close",
      "ms-auto"
    );

    const modalHeader = createElementFactory(
      "h2",
      "edit post",
      modalContainer,
      {},
      "text-secondary",
      "fs-4",
      "mt-4"
    );

    const modalForm = createElementFactory(
      "form",
      "",
      modalContainer,
      { action: "" },
      "m-auto"
    );
    const formFloating = createElementFactory(
      "div",
      "",
      modalForm,
      {},
      "form-floating"
    );

    const titleInput = createElementFactory(
      "input",
      "",
      formFloating,
      {
        name: "title__modal--edit",
        id: "title__modal--edit",
        placeholder: "title",
        type: "text",
      },
      "form-control",
      "mb-2"
    );

    const titleLabel = createElementFactory("label", "title", formFloating, {
      for: "title__modal--edit",
    });
    const formFloatingTwo = createElementFactory(
      "div",
      "",
      modalForm,
      {},
      "form-floating"
    );

    const bodyInput = createElementFactory(
      "textarea",
      "",
      formFloatingTwo,
      {
        name: "body__modal--edit",
        id: "body__modal--edit",
        placeholder: "your thoughts",
        cols: "30",
        rows: "10",
      },
      "form-control",
      "h-25",
      "mb-2"
    );

    const bodyLabel = createElementFactory(
      "label",
      "your thoughts",
      formFloatingTwo,
      {
        for: "body__modal--edit",
      }
    );

    const formFloatingThree = createElementFactory(
      "div",
      "",
      modalForm,
      {},
      "form-floating"
    );

    const mediaInput = createElementFactory(
      "input",
      "",
      formFloatingThree,
      {
        name: "media__modal--edit",
        id: "media__modal--edit",
        placeholder: "img url",
        type: "text",
      },
      "form-control",
      "mb-2"
    );

    const mediaLabel = createElementFactory(
      "label",
      "img url",
      formFloatingThree,
      {
        for: "media__modal--edit",
      }
    );

    const formFloatingfour = createElementFactory(
      "div",
      "",
      modalForm,
      {},
      "form-floating"
    );

    const tagsInput = createElementFactory(
      "input",
      "",
      formFloatingfour,
      {
        name: "tags__modal--edit",
        id: "tags__modal--edit",
        placeholder: "tags seperated by #",
        type: "text",
      },
      "form-control",
      "mb-2"
    );

    const tagsLabel = createElementFactory(
      "label",
      "tags seperated by #",
      formFloatingfour,
      {
        for: "tags__modal--edit",
      }
    );

    const postButton = createElementFactory(
      "button",
      "post",
      modalForm,
      { type: "button", id: "modal-post-button" },
      "btn",
      "btn-secondary"
    );

    if (document.querySelector("#body__modal--edit")) resolve();
    else
      reject(
        setTimeout(() => {
          renderModal(count + 1);
        }, 5000)
      );
  });
}
