
export async function readPost(id) {}


import { authToken } from "../authToken.mjs";
import { BASE_API_URL } from "../constant.mjs";

const action = "/posts";


export async function readPosts() {


    const readPostsUrl = `${BASE_API_URL}${action}`;
    
    const response = await authToken(readPostsUrl);

    return await response.JSON();
}



export async function readPost(id) {

    if (!id) {
        throw new Error("Read post requieres an ID")
    }


    const readPostUrl = `${BASE_API_URL}${action}/${id}`;
    
    const response = await authToken(readPostUrl);

    return await response.JSON();
}