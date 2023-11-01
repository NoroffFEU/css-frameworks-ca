

export function errorMsg(domElement, error) {
    console.log("hello")
    console.dir(domElement);
    console.log(error);
    domElement.innerHTML = `Something went wrong, it's ${error}`;
}