document
  .querySelectorAll("a")
  .forEach(
    (anchor) =>
      (anchor.href += `?user=${JSON.parse(
        localStorage.getItem("currentUser")
      )}`)
  );

const logoutButton: HTMLButtonElement = document.querySelector("#logout");

logoutButton.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "../../index.html";
});
