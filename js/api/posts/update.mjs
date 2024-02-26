
import { API_SOCIAL_URL } from "../api_constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "PUT";

export async function updatePost(postData) {

    if(!postData.id){
        throw new Error ("update requires a postID")
    }
  const updatePostURL = `${API_SOCIAL_URL}${action}/${postData.id}`;

  const response = await authFetch(updatePostURL, {
    method,
    body: JSON.stringify(postData),
  });
console.log(postData)
  return await response.json();
  
}

