import createElementFactory from "./createElementFactory.js";

export default function renderPosts(
  domEl: HTMLDivElement,
  { id, title, body, tags, media, created, updated, _count, author }
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
    { href: `/src/profile/index.html?user=${author.name ? author.name : ""}` },
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
    "span",
    author.name ? author.name : "",
    anker,
    {},
    "text-primay",
    "fs-6"
  );
  const divCol8 = createElementFactory("div", "", row, {}, "col-8");
  const header = createElementFactory("h3", title, divCol8, {});
  const paragraph = createElementFactory(
    "p",
    body,
    divCol8,
    {},
    "card-text",
    "text-black"
  );

  tags.forEach((tag) =>
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
  const dateSpan = createElementFactory("span", created, divCol8, {}, "fs-6");
}
