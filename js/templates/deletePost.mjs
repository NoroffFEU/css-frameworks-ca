export function createDeletePostElement(postData) {
  try {
    const deletePostElement = document.createElement("div");
    deletePostElement.classList.add("delete-post");

    const title = document.createElement("h4");
    title.classList.add("card-title", "text-center");
    title.textContent = postData.title || "Title";

    const media = document.createElement("img");
    media.src = postData.media;
    media.alt = "Post Media";
    media.classList.add("img-fluid");

    const body = document.createElement("p");
    body.classList.add("card-text", "text-center");
    body.textContent = postData.body;

    deletePostElement.appendChild(title);
    deletePostElement.appendChild(media);
    deletePostElement.appendChild(body);

    return deletePostElement;
  } catch (error) {
    console.error("Error creating delete post element:", error);
    return null; // Return null in case of error
  }
}
