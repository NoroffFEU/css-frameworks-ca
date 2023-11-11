
/**
 * 
 * @param {Array} postsArray 
 * @param {object} domElement 
 * 
 * This function takes the array of posts, and a DOM element, then produces
 * HTML based on the array in  our given HTML-element. 
 * 
 * Posts without title or content are skipped because I think they look ugly and don't 
 * provide anything to the page.
 */
export function printFeed(domElement, postsArray) {
    domElement.innerHTML = "";
    const myUserName = localStorage.getItem('userName');

    for (let i = 0; i < postsArray.length; i++) {
        const post = postsArray[i];

        const postedDate = post.created.replaceAll("-", ".");
        const editDate = post.updated.replaceAll("-", ".");
        const slicedPostDate = postedDate.slice(0, postedDate.length - 14).split(".").reverse().join(".");
        const slicedEditDate = editDate.slice(0, postedDate.length - 14).split(".").reverse().join(".");

        if (!post.body || !post.title) {
            continue;
        }
        if (post.author.name === myUserName) {
            domElement.innerHTML += `
            <div class="single-post m-3 custom-border">
                <div class="d-flex">
                    <img class="profile-pic-tiny" src="../images_and_icon/icons/user_icon.png" alt="User icon created by Freepik">
                    <div class=username-and-post-date>
                        <p class="profile-name-post mt-1 mr-1 mb-0 ml-3">${post.author.name}</p>
                        <p class="mt-1 mr-1 mb-0 ml-1">Posted the ${slicedPostDate}</p>
                    </div>
                </div>
                <h5><a href="${post.id}">${post.title}</a><h5>
                <p class="post-text">
                    ${post.body}
                </p>
                <p>Post has ${post._count.comments} comments and ${post._count.reactions} reactions</p>
                <button>delete post</button><button>edit post</button>
            </div>
            `;
        } else {
            domElement.innerHTML += `
            <div class="single-post m-3 custom-border">
                <div class="d-flex">
                    <img class="profile-pic-tiny" src="../images_and_icon/icons/user_icon.png" alt="User icon created by Freepik">
                    <div class=username-and-post-date>
                        <p class="profile-name-post mt-1 mr-1 mb-0 ml-3">${post.author.name}</p>
                        <p class="mt-1 mr-1 mb-0 ml-1">Posted the ${slicedPostDate}</p>
                    </div>
                </div>
                <h5><a href="singlepost.html?id=${post.id}" class="single-post-link">${post.title}</a><h5>
                <p class="post-text">
                    ${post.body}
                </p>
                <p>Post has ${post._count.comments} comments and ${post._count.reactions} reactions</p>
            </div>
            `;
        }
    }
}


/**
 * Sorts an array before creating HTML 
 * @param {array} postsArray - array of posts from the API
 * @param {object} domElement - where in the DOM the new array is printed
 * @param {string} sortBy - how to sort the array
 * This function sorts my array before printing out the feed in a new order. 
 */
export function sortArray(domElement, postsArray, sortBy){
    switch (sortBy) {
        case "newest-posts":
            printFeed(domElement, postsArray);
            break;
        
        case "oldest-posts":
            const reverseArray = postsArray.slice().reverse();
            printFeed(domElement, reverseArray);
            break;
    
        case "most-reactions":
            const arrayByReactions = postsArray.sort(function (x, y) {
                return y._count.reactions - x._count.reactions;
            });
            printFeed(domElement, arrayByReactions);
            break;

        case "most-comments":
            const arrayByComments = postsArray.sort(function (x, y) {
                return y._count.comments - x._count.comments;
            });
            printFeed(domElement, arrayByComments);
            break;
        
        default:
            break;
    }
};


/**
 * 
 * @param {array} postsArray - an array containing all posts
 * @param {object} domElement - the object where I print my HTML, only there to be passed down to printFeed();
 * @param {object} searchQuery - an object containing both what I am searching in (title, body or both) and what string I want the post to includce
 * 
 * This function lets me search my array by title, body or both. 
 */
export function searchArray(domElement, postsArray, searchQuery) {
    let filteredArray;
    const searchWord = searchQuery.searchText.toLowerCase();
    const searchIn = searchQuery.searchKeys;

    if (!searchIn) {
        filteredArray = postsArray.filter(post => {
            return post[`title`].toLowerCase().includes(`${searchWord}`) || post[`body`].toLowerCase().includes(`${searchWord}`)
        });
    } else {
        filteredArray = postsArray.filter(post => {
            return post[`${searchIn}`].toLowerCase().includes(`${searchWord}`)
        });
    }
    printFeed(domElement, filteredArray);
    }
    

export function singlePostContent(domElement, postData) {
    const creationDate = postData.created.replaceAll("-", ".");
    const formattedDate = creationDate.slice(0, creationDate.length - 14).split(".").reverse().join(".");
    domElement.innerHTML = `
    <h1>${postData.title}</h1>
    <p>${postData.body}</p>
    <img src="${postData.media}" alt="">
    <p>Posted the ${formattedDate}</p>
    `;

    const reactions = postData.reactions.reverse(); 
    for (let i = 0; i < reactions.length; i++) {
        domElement.innerHTML += `<span class="reactions m-2">${reactions[i].symbol}${reactions[i].count}</span>`;
    }
}