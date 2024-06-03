export function searchPost() {
    const searchInput = document.querySelector("#searchForm");
    const container = document.getElementById("posts");

    searchInput.addEventListener("input", function() {
        const searchTerm = this.value.toLowerCase().trim();
        const postElements = container.querySelectorAll(".post-content")

        postElements.forEach(postElement => {
            if (postElement.nodeType === 1) {
                const postText = postElement.textContent.toLowerCase();
                if (postText.includes(searchTerm)) {
                    postElement.style.display = "";
                } else {
                    postElement.style.display = "none";
                }
            }
        });
    });
}
