export function search(e) {
    e.preventDefault();
    const searchValue = document.querySelector("#search").value.toLowerCase();
    window.find(searchValue);
  }