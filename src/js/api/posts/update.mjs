import { authToken } from "../authToken.mjs";
import { BASE_API_URL } from "../constant.mjs";

const action = "/posts";
const method = "put"

export async function updatePost(postData) {

    if (!postData.id) {
        throw new Error("Update requires an ID")
    }


    const updatePostUrl = `${BASE_API_URL}${action}/${postData.id}`;
    
    const response = await authToken(updatePostUrl, {
        method,
        body: JSON.stringify(postData)

    });

    return await response.JSON();
}