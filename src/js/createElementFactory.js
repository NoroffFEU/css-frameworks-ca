export default function createElementFactory(tag, textContent, parentElement, object, ...classNames) {
    classNames.forEach;
    const element = document.createElement(tag);
    element.textContent = textContent;
    parentElement.appendChild(element);
    Object.keys(object).forEach((key) => {
        element.setAttribute(key, object[key]);
    });
    classNames.forEach((classname) => element.classList.add(classname.trim()));
    return element;
}
