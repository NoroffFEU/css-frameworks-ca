document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('newPostForm');
    const modal = new bootstrap.Modal(document.getElementById('createPostModal'));

    form.addEventListener('submit', function (event) {
        if (form.checkValidity()) {
            // Form is valid, close the modal
            modal.hide();
        }
    });
});