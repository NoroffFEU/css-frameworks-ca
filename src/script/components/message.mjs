const loader = document.querySelector(".loader");
function message(type = "success", message = "") {
  return `<div class ="${type}">${message}</div>`;
}
export { loader, message };
