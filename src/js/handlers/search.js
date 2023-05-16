const searchBtn = document.querySelector("search");

searchBtn.addEventListener("input", e =>{
    const value = e.target.value
    console.log(value);
})