import createElementFactory from "./createElementFactory.js";

export default function fadeText(
  message: string = "Success✅!",
  parentElement = document.querySelector("main")
) {
  const successMessage = document.querySelector("#statusText");
  if (!successMessage) {
    createElementFactory(
      "p",
      message,
      parentElement,
      { id: "statusText" },
      "start-animation"
    );
  } else {
    successMessage.textContent=message
    successMessage.classList.remove("start-animation");
    void successMessage.offsetHeight; // This line forces a reflow and i got it from chat-gpt
    successMessage.classList.add("start-animation");
  }
}
