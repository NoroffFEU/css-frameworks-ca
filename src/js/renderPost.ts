import createElementFactory from "./createElementFactory.js";

export default function renderPosts(
  domEl: HTMLDivElement,
  { id, title, body, tags, media, created, updated, _count, author, comments }
) {
  const container = createElementFactory(
    "div",
    "",
    domEl,
    { "data-observed": "" },
    "card",
    "mb-3",
    "bg-secondary",
    "p-2",
    "w-percentage--95"
  );
  const row = createElementFactory("div", "", container, {}, "row");

  const anker = createElementFactory(
    "a",
    "",
    row,
    { href: `/src/profile/index.html?user=${author?.name}` },
    "col-4"
  );

  const image = createElementFactory(
    "img",
    "",
    anker,
    {
      src: author.avatar ? author.avatar : "",
    },
    "rounded-circle",
    "w-25"
  );
  const spanName = createElementFactory(
    "p",
    author.name ? author.name : "",
    anker,
    {},
    "text-primay",
    "fs-6"
  );
  const divCol8 = createElementFactory("div", "", row, {}, "col-8");
  const postLink = createElementFactory("a", "", divCol8, {
    href: `/src/post/index.html?id=${id}`,
  });
  const header = createElementFactory("h3", title, postLink, {});

  const paragraph = createElementFactory(
    "p",
    body,
    divCol8,
    {},
    "card-text",
    "text-black"
  );

  const picturePost = media
    ? createElementFactory("img", "", divCol8, { src: media }, "w-100", "h-50")
    : "";

  tags?.forEach((tag) =>
    createElementFactory(
      "span",
      tag,
      divCol8,
      {},
      "badge",
      "text-bg-primary",
      "m-1"
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

  const dateSpan = createElementFactory(
    "p",
    created.split("T")[0],
    anker,
    {},
    "fs-6"
  );
  if (comments[0]) {
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
    const commentRow = createElementFactory(
      "div",
      "",
      commentContainer,
      {},
      "row"
    );

    comments.forEach((comment) =>
      renderComments(commentRow, comment.body, comment.created, comment.author)
    );
  }
}

function renderComments(commentRow, body, created, { name, avatar }) {
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
