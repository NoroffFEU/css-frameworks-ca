const currentProfileNames = document.querySelectorAll(".username");
const bodyMessage = document.querySelector("main, .container-feed");


currentProfileNames.forEach(text => {
    const accessToken = localStorage.getItem("accessToken");
    const storedName = localStorage.getItem("name");
    if (accessToken !== null) {
        
        text.innerText = storedName;
    } else {
        const errorMessage = "Unauthorized access";
        bodyMessage.innerHTML = `
            <div class="alert alert-danger text-center w-50 mx-auto" role="alert">
                ${errorMessage}
            </div>`;
    }
});


