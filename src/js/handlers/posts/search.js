export function search(e) {
    e.preventDefault();
    const searchValue = document.querySelector("#search").value.toLowerCase();
    window.find(searchValue);
  }

// const feedSearch = document.querySelector("#search");
// feedSearch.addEventListener("keyup", search);

// export function search() {
//   let searchValue = feedSearch.value.toLowerCase();
//   const posts = document.querySelectorAll(".post").forEach(post => {
//     post.innerText.toLowerCase().indexOf(searchValue) > -1 
//     ? post.getElementsByClassName.display = '' 
//     : post.display = 'none';
//   })
// }

//COM BOTAO
// export function search(e) {
//   e.preventDefault();
//   const searchValue = document.querySelector("#search").value.toLowerCase();
//   // window.find(searchValue);
//   const posts = document.querySelectorAll(".post").forEach(post => {
//     post.innerText.toLowerCase().indexOf(searchValue) > -1
//       ? post.getElementsByClassName.display = ''
//       : post.display = 'none';
//   })
// }