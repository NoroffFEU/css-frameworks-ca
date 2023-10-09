import createElementFactory from "./createElementFactory.js";

function createSmileyPicker(parentElement = document.querySelector("main")) {
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
    "hide"
  );

  emojiList.forEach((emoji) =>
    createElementFactory("button", emoji.emoji, container, {
      type: "button",
      "aria-label": emoji.altText,
    })
  );

  const emojiFunctions = emojiClosure();

  function emojiClosure() {
    let currentEmoji = "";
    let id = "";

    function setEmoji(emoji: string) {
      currentEmoji = emoji;
    }

    function getEmoji() {
      return currentEmoji;
    }
    function setId(id: string) {
      id = id;
    }

    function getId() {
      return id;
    }
    return [setEmoji, setId];
  }
  return emojiFunctions;
}
