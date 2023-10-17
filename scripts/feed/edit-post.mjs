import { API_CREATE_POST } from "../common/constant.mjs";

function openEditModal(post) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modal = document.getElementById("editModal");
    const editTitle = modal.querySelector("#editTitle");
    const editBody = modal.querySelector("#editBody");
    const editMedia = modal.querySelector("#editMedia");
    const modalForm = modal.querySelector("#editForm");

    editTitle.value = post.title;
    editBody.value = post.body;
    editMedia.value = post.media;

    modal.style.display = "block";
    modalOverlay.style.display = "block";

    modalForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const editedPost = {
            title: editTitle.value,
            body: editBody.value,
            media: editMedia.value,
        };

        try {
            const token = localStorage.getItem('accessToken');

            if (!token) {
                console.log('Access token is missing. Redirect to the login page.');
                return;
            }

            const putOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(editedPost),
            };

            const response = await fetch(`${API_CREATE_POST}/${post.id}`, putOptions);

            if (response.ok) {
                modal.style.display = "none";
                modalOverlay.style.display = "none";
                window.location.reload();
            } else {
                console.log('Error response:', response.status, await response.json());
            }
        } catch (error) {
            console.log(error);
        }
    });

    const closeModal = document.getElementById("closeModal");
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
        modalOverlay.style.display = "none";
    });
}

window.addEventListener("click", (event) => {
    const modal = document.getElementById("editModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

export { openEditModal };
