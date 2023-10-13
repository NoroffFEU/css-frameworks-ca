import createElementFactory from "./createElementFactory.js";

export default function renderPosts(
  domEl: HTMLDivElement,
  {
    id,
    title,
    body,
    tags,
    media,
    created,
    updated,
    _count,
    author,
    comments,
    reactions = [""],
  }
) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const container = createElementFactory(
    "div",
    "",
    domEl,
    { "data-observed": "", id: `div${id}` },
    "card",
    "mb-3",
    "bg-white",
    "p-1"
  );
  const row = createElementFactory("div", "", container, {}, "row", "mb-4");

  const anker = createElementFactory(
    "div",
    "",
    row,
    {},
    "col-lg-4",
    "d-flex",
    "flex-column",
    "mb-2",
    "flex-column"
  );
  const reactionContainer = createElementFactory("div", "", anker, {});

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
  const divCol8 = createElementFactory("div", "", row, {}, "col-lg-8");
  const tagContainer = createElementFactory("div", "", divCol8, {});

  const postLink = createElementFactory("a", "", divCol8, {
    href: `/src/post/index.html?id=${id}`,
  });
  const header = createElementFactory("h2", title, postLink, {
    id: `title${id}`,
  });

  const paragraph = createElementFactory(
    "p",
    body,
    divCol8,
    { id: `body${id}` },
    "card-text",
    "text-black"
  );

  const deleteButton = createElementFactory(
    "button",
    "delete",
    divCol8,
    { id: `button--${id}`, "data-delete-id": id },
    currentUser !== author.name && "hide",
    "btn",
    "btn-success"
  );

  const updateButton = createElementFactory(
    "button",
    "update",
    divCol8,
    { "data-update-id": id, id: `button--edit--${id}` },
    currentUser !== author.name && "hide",
    "btn",
    "btn-outline-primary"
  );

  const picturePost = media
    ? createElementFactory("img", "", divCol8, { src: media }, "postImage")
    : "";

  if (reactions[0]) {
    reactions.forEach((emoji) =>
      createElementFactory(
        "span",
        emoji.symbol + `(${emoji.count})`,
        reactionContainer,
        {},
        "badge",
        "text-bg-primary",
        "m-1"
      )
    );
  }

  tags?.forEach((tag) =>
    createElementFactory(
      "span",
      tag,
      tagContainer,
      {},
      "badge",
      "text-bg-primary",
      "m-1",
      `tag${id}`
    )
  );

  const reactButton = createElementFactory(
    "button",
    "React",
    divCol8,
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
    `${_count ? `comments(${_count.comments})` : "comments"}`,
    commentContainer,
    {},
    "fs-6"
  );

  const inputGroupContainer = createElementFactory(
    "div",
    "",
    commentContainer,
    {},
    "d-flex",
    "flex-column",
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
