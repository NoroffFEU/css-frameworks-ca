const currentProfileNames = document.querySelectorAll(".username");

const bodyMessage = document.querySelector("main, .container-feed");

/**
 * Iterates over the current profile names and updates them if the access token is available, otherwise displays an error message.
 * @param {Element} text The text element representing a current profile name.
 * @returns {void}
 */
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



