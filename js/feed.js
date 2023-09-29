
/**
 * Handles the editing of a post by prompting the user for new title and content.
 * @function
 * @param {string} id - The ID of the post to edit.
 */
export function editPost(id) {
    const title = prompt('Enter the new title:');
    const content = prompt('Enter the new content:');
    if (title && content) {
        const updatedPost = {
            title: title,
            body: content,
        };
        updatePost(id, updatedPost);
    }
}
