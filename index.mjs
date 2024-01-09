const currentProfileName = document.querySelectorAll(".username")

currentProfileName.forEach(text => {
    text.innerText = localStorage.getItem("name")
});

