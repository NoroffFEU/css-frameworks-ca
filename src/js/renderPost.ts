import createElementFactory from "./createElementFactory.js";

export default function renderPosts(
  domEl: HTMLDivElement,
  { id, title, body, tags, media, created, updated, _count, author, comments }
) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const container = createElementFactory(
    "div",
    "",
    domEl,
    { "data-observed": "" },
    "card",
    "mb-3",
    "bg-white",
    "p-2",
    "w-percentage--95"
  );
  const row = createElementFactory("div", "", container, {}, "row", "mb-4");

  const anker = createElementFactory(
    "div",
    "",
    row,
    {},
    "col-4",
    "d-flex",
    "flex-column"
  );

  const dateSpan = createElementFactory(
    "p",
    created.split("T")[0],
    anker,
    {},
    "fs-6"
  );

  const image = createElementFactory(
    "img",
    "",
    anker,
    {
      src: author.avatar ? author.avatar : "",
    },
    "rounded-3",
    "max-width-85"
  );
  const spanName = createElementFactory(
    "a",
    author.name ? author.name : "",
    anker,
    { href: `/src/profile/index.html?user=${author?.name}` },
    "text-primay",
    "fs-6"
  );
  const divCol8 = createElementFactory("div", "", row, {}, "col-8");
  const postLink = createElementFactory("a", "", divCol8, {
    href: `/src/post/index.html?id=${id}`,
  });
  const header = createElementFactory("h2", title, postLink, {});

  const paragraph = createElementFactory(
    "p",
    body,
    divCol8,
    {},
    "card-text",
    "text-black"
  );

  const deleteButton = createElementFactory(
    "button",
    "delete",
    divCol8,
    { id: `button--${id}` },
    currentUser !== author.name && "hide",
    "btn",
    "btn-success"
  );

  const updateButton = createElementFactory(
    "button",
    "update",
    divCol8,
    { "data-id": id, id: `button--edit--${id}` },
    currentUser !== author.name && "hide",
    "btn",
    "btn-outline-primary"
  );

  const picturePost = media
    ? createElementFactory("img", "", divCol8, { src: media }, "w-100", "h-50")
    : "";

  tags?.forEach((tag) =>
    createElementFactory(
      "span",
      tag,
      anker,
      {},
      "badge",
      "text-bg-primary",
      "m-1"
    )
  );
  const reactButton = createElementFactory(
    "button",
    "React",
    anker,
    {
      type: "button",
      "data-id": id,
    },
    "btn",
    "btn-outline-primary"
  );

  const commentContainer = createElementFactory(
    "div",
    "",
    container,
    {},
    "container"
  );
  const commentHeader = createElementFactory(
    "h3",
    "Comments",
    commentContainer,
    {}
  );

  const inputGroupContainer = createElementFactory(
    "div",
    "",
    commentContainer,
    {},
    "input-group",
    "mb-4"
  );

  const commentInput = createElementFactory(
    "textArea",
    "",
    inputGroupContainer,
    {
      placeholder: "Write your comment here",
      ariaDescribedby: "commentButton",
      id: `commentInput${id}`,
    },
    "form-control"
  );

  const commentButton = createElementFactory(
    "button",
    "Post Comment",
    inputGroupContainer,
    { type: "button", id: "commentButton", "data-comment-id": id },
    "btn",
    "btn-primary"
  );
  const commentRow = createElementFactory(
    "div",
    "",
    commentContainer,
    { id: `comment-row--${id}` },
    "row",
    "overflow-y-auto",
    "h-px--150"
  );
  if (comments) {
    comments.forEach((comment) =>
      renderComments(commentRow, comment.body, comment.created, comment.author)
    );
  }
}

export function renderComments(commentRow, body, created, { name, avatar }) {
  const commentFirstCol = createElementFactory(
    "div",
    "",
    commentRow,
    {},
    "col-4"
  );
  const commentSecondCol = createElementFactory(
    "div",
    "",
    commentRow,
    {},
    "col-8"
  );
  const commenterImg = createElementFactory(
    "img",
    "",
    commentFirstCol,
    {
      src: avatar,
    },
    "rounded-circle",
    "w-25"
  );
  const commenterBody = createElementFactory("p", body, commentSecondCol, {});

  const commenterName = createElementFactory("p", name, commentFirstCol, {});
}
