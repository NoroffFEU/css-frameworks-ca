
/** This function puts the values of a title, message(body) and media in an object
 * 
 * @param {string} title 
 * @param {string} message 
 * @param {string} media 
 * @returns {object} object with key-value pairs of title, message(body) and media
 */
function newPostValuesToObject(title, message, media) {
    const postToApi = {
        "title": title,
        "body": message,
        "media": media
    };
    return postToApi;
}

/** This function sends a created object (and assigned token) to API 
 * 
 * @param {string} url 
 * @param {object} post 
 */
async function newPostToApiFunksjon(url, post) {
    try {
        const token = localStorage.getItem("accessToken");
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(post),
        };
        const response = await fetch(url, postData);
        await response.json();
    } catch (error) {
        console.log(error)
    }
}


/** This function checks if the post includes a right format of media(img)
 * 
 * @param {string} media 
 * @returns {}
 */
function isMediaValid(media) {
    if (media === null || media === "") {
        return false;
    }
    return (media.toLowerCase().includes(".jpg") || media.toLowerCase().includes(".jpeg") || media.toLowerCase().includes(".png"));
}

/** This functions checks if a post has any comments and if it does, it puts them in Html; otherwise it creates the message that there are no comments
 * 
 * @param {array} comments 
 * @returns {array} array with comments and puts them in Html, if there are none it creates the message that there are no comments
 */
function processCommentsForPost(comments) {
    let commentsHtml = "";
    if (comments.length === 0) {
        commentsHtml = `
        <div>There are no comments</div>
         `;
    }
    for (let i = 0; i < comments.length; i++) {
        commentsHtml += `
        <div>${comments[i].body}</div>
        `;
    }
    return commentsHtml;
}


/** This functions checks if a post has any reactions and if it does, it puts them in Html; otherwise it creates the message that there are no reactions
 * 
 * @param {array} reactions 
 * @returns {array} array with reactions and puts them in Html, if there are none it creates the message that there are no reactions
 */
function processReactionsForPost(reactions) {
    let reactionsHtml = "";
    if (reactions.length === 0) {
        reactionsHtml = `
        <div>There are no reactions</div>
         `;
    }
    for (let i = 0; i < reactions.length; i++) {
        reactionsHtml += `
        <div>${reactions[i].symbol}</div>
        `;
    }
    return reactionsHtml;
}

// /** 
//  * This function gets parameters from an event listener and checks (filters) if any of posts includes the searched word in post's title or body
//  * @param {array} postsArray 
//  * @param {string} searchText 
//  * @returns {array} returns array that includes posts with searched word in their title or body(message)
//  */
// function searchElement(postsArray, searchText) {
//     return postsArray.filter((post) =>
//         post.title.includes(searchText) || post.body.includes(searchText)
//     );
// }




export { newPostValuesToObject, newPostToApiFunksjon, isMediaValid, processCommentsForPost, processReactionsForPost };