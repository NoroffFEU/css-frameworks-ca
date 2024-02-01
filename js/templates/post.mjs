
export function postTemplate(postData) {
  const post = document.createElement('div');
  post.classList.add('post');
  post.innerText = postData.title;

  // const button = document.createElement('button');
  // post.append(button);
  // button.addEventListener('click', () => console.log(postData));
  
  return post;  
  } 

export function renderPostTemplate(postData, parent) {
  parent.append(postTemplate(postData));
}