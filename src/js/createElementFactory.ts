export default function createElementFactory(
  tag: string,
  textContent: string,
  parentElement: HTMLElement,
  object: {},

  ...classNames: string[]
) {
  classNames.forEach;
  const element = document.createElement(tag);
  element.textContent = textContent;
  parentElement.appendChild(element);
  Object.keys(object).forEach((key) => {
    element.setAttribute(key, object[key]);
  });
  classNames.forEach((classname) => element.classList.add(classname));
  return element;
}
