import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

const action = "/posts";
const method = "post";

export async function createPost(postData) {
    const createPostURL = API_SOCIAL_URL + action;

    const response = await authFetch(createPostURL, {
        method,
        body: JSON.stringify(postData),
    });

    // const post = await response.json();
    // console.log(post);
    // return post;

    // console.log(await response.json());
    return await response.json();
}

// Maybe you want to set a default image or default tag if they did not provide that to the post?
//The code above is sending only the code that the user povides.
