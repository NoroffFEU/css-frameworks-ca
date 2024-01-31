const currentProfileNames = document.querySelectorAll(".username");
const bodyMessage = document.querySelector("main");

// Prevents from accessing pages through URL
currentProfileNames.forEach(text => {
    const accessToken = localStorage.getItem("accessToken")
    const storedName = localStorage.getItem("name");
    if (storedName && accessToken !== null) {
        text.innerText = storedName;
    } else {
        bodyMessage.innerHTML = `<div class="alert alert-danger text-center w-50 mx-auto" role="alert">
            Unauthorized access
        </div>`;
    }
});
