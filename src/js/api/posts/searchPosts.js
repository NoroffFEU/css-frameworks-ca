import { API_KEY, NN_BASE, NN_POSTS } from "../constants.js";
import { load } from "../storage/load.js";

export async function searchPosts(query, includeAuthor = true) {
    const queryParams = new URLSearchParams();
    if (includeAuthor) queryParams.append('_author', includeAuthor);
    const response = await fetch(`${NN_BASE}${NN_POSTS}/search?q=${query}&${queryParams}`, {
        headers: {
            Authorization: `Bearer ${load("token")}`,
            "X-Noroff-API-Key": API_KEY
        },
        method: "GET"
    });

    if (response.ok) {
        const responseData = await response.json();
        return responseData;
    }

    throw new Error("Failed to search for posts.");
}