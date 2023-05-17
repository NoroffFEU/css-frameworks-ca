import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

const action = "/posts";
const method = "delete";

export async function removePost(id) {
    if (!id) {
        throw new Error("Delete requires a postID");
    }
    const removePostUrl = `${API_SOCIAL_URL}${action}/${id}`;

    const response = await authFetch(removePostUrl, {
        method,
    });
    if (response.ok) {
        // window.location.href = "/posts/index.html";
        window.location.reload();

    } else {
        const json = await response.json();
        alert(json.errors[0].message);
    }

}

// export async function removePost(id) {
//     const viewPostURL = `${API_SOCIAL_URL}${action}${author}`;
//     const response = await fetchWithToken(viewPostURL, {
//       methodGET,
//     });
//     const postIdResult = await response.json();
    
//     for (let i = 0; i < postIdResult.length; i++) {
//       const postId = postIdResult[i];
//       if (localStorage.getItem("name") === postId.author.name) {
//         const response = await fetchWithToken(
//           `${API_SOCIAL_URL}${action}/${postId.id}`,
//           {
//             method: "delete",
//           }
//         );
        
//         window.location.reload();
//         return response.json();
//         }
//       }
//     }

// export async function deletePost(id) {
//     const options = {
//         method,
//     }
//     authFetch(`${API_SOCIAL_URL}${action}${id}`, options)
//     .then((response) => response.json())
//     .catch( => alert(json.errors[0].message))
//     .finally(() => window.location.reload());
 
//     }            
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