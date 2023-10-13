import createElementFactory from "./createElementFactory.js";

export default function createSmileyPicker(
  parentElement = document.querySelector("main")
) {
  if (document.querySelector("#modal")) {
    return;
  }
  const emojiList = [
    { emoji: "😀", altText: "Grinning Face" },
    { emoji: "😃", altText: "Grinning Face with Big Eyes" },
    { emoji: "😄", altText: "Grinning Face with Smiling Eyes" },
    { emoji: "😁", altText: "Beaming Face with Smiling Eyes" },
    { emoji: "😆", altText: "Grinning Squinting Face" },
    { emoji: "😅", altText: "Grinning Face with Sweat" },
    { emoji: "😂", altText: "Face with Tears of Joy" },
    { emoji: "🤣", altText: "Rolling on the Floor Laughing" },
    { emoji: "😊", altText: "Smiling Face with Smiling Eyes" },
    { emoji: "😇", altText: "Smiling Face with Halo" },
    { emoji: "😍", altText: "Heart Eyes" },
    { emoji: "😘", altText: "Face Blowing a Kiss" },
    { emoji: "😋", altText: "Face Savoring Food" },
    { emoji: "😜", altText: "Winking Face with Tongue" },
    { emoji: "🤪", altText: "Zany Face" },
    { emoji: "😝", altText: "Squinting Face with Tongue" },
    { emoji: "🤑", altText: "Money-Mouth Face" },
    { emoji: "😎", altText: "Smiling Face with Sunglasses" },
    { emoji: "🤓", altText: "Nerd Face" },
    { emoji: "🧐", altText: "Face with Monocle" },
  ];

  const container = createElementFactory(
    "div",
    "",
    parentElement,
    { id: "modal" },
    "hide",
    "emoji-grid"
  );

  const closeButton = createElementFactory(
    "button",
    "X",
    container,
    {
      "data-closeButton": "",
    },
    "bg-primary",
    "text-success",
    "badge"
  );

  emojiList.forEach((emoji) =>
    createElementFactory(
      "button",
      emoji.emoji,
      container,
      {
        type: "button",
        "aria-label": emoji.altText,
        "data-buttonSelector": "",
      },
      "bg-primary",
      "badge"
    )
  );

  const emojiFunctions = emojiClosure();

  function emojiClosure() {
    let currentEmoji = "";
    let id = "test";

    function setEmoji(emoji: string) {
      currentEmoji = emoji;
    }

    function getEmoji() {
      return currentEmoji;
    }
    function setId(newId: string) {
      id = newId;
    }

    function getId() {
      return id;
    }
    return [setEmoji, setId, getEmoji, getId];
  }
  return emojiFunctions;
}
