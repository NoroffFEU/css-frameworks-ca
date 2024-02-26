


export function renderPostTemplate(postData, parent) {
  const postElement = createPostElement(postData);
  parent.appendChild(postElement);
}

export function renderPostTemplates(postDataList, parent) {
  parent.innerHTML = ""; // Clear the existing content
  postDataList.forEach((postData) => {
    renderPostTemplate(postData, parent);
  });
}