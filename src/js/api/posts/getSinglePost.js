import { API_KEY, NN_BASE, NN_POSTS } from "../constants.js";
import { load } from "../storage/load.js";

export async function getSinglePost(postId, includeAuthor = true, includeComments = true, includeReactions = true) {
    const queryParams = new URLSearchParams();
    if (includeAuthor) queryParams.append('_author', includeAuthor);
    if (includeComments) queryParams.append('_comments', includeComments);
    if (includeReactions) queryParams.append('_reactions', includeReactions);

    const response = await fetch(`${NN_BASE}${NN_POSTS}/${postId}?${queryParams}`, {
        headers: {
            Authorization: `Bearer ${load("token")}`,
            "X-Noroff-API-Key": API_KEY
        }
    });

    if (response.ok) {
        const responseData = await response.json();
        return responseData;
    }

    throw new Error("Failed to fetch Posts!");
}
