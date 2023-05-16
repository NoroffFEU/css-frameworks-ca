import { API_SOCIAL_URL } from "../constants.js";
import { headers } from "../authFetch.js";

const action = "/posts";
const method = "delete";

export async function deletePost(id) {
    const options = {
        method,
        headers
    }
    fetch(`${API_SOCIAL_URL}${action}${id}`, options)
    .then((response) => response.json())
    .catch((error) => alert(json.errors[0].message))
    .finally(() => window.location.reload());
 
    }            
    // return await response.json();

    // const post = await response.json();
    // console.log(post);
    // // console.log("The post was deleted.");
    // if (response.status == 200) {
    //     window.location.reload();

    // } else {
    //     const json = await response.json();
    //     alert(json.errors[0].message);
    // }