
/**
 * 
 * @param {Array} postsArray 
 * @param {object} domElement 
 * 
 * This function takes the array of posts, and a DOM comment, then produces
 * HTML based on the array in  our given HTML-comment. 
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
        const slicedPostDate = postedDate.slice(0, postedDate.length - 14).split(".").reverse().join(".");
        
        if (!post.body || !post.title) {
            continue;
        }
        if (post.author.name === myUserName) {
            domElement.innerHTML += `
            <div class="single-post m-3 custom-border">
                <div class="d-flex">
                <a href="/profile/index.html?name=${post.author.name}">
                    <img class="profile-pic-tiny" src="${post.author.avatar}" alt="User icon">
                </a>
                    <div class=username-and-post-date>
                        <p class="profile-name-post my-profile mt-1 mr-1 mb-0 ml-3"><a href="/profile/index.html?name=${post.author.name}">${post.author.name}</a></p>
                        <p class="mt-1 mr-1 mb-0 ml-1">Posted the ${slicedPostDate}</p>
                    </div>
                </div>
                <h5><a href="singlepost.html?id=${post.id}">${post.title}</a><h5>
                <p class="post-text">
                    ${post.body}
                </p>
                <p>Post has ${post._count.comments} comments and ${post._count.reactions} reactions</p>
            </div>
            `;
        } else {
            domElement.innerHTML += `
            <div class="single-post m-3 custom-border">
                <div class="d-flex">
                <a href="/profile/index.html?name=${post.author.name}">
                    <img class="profile-pic-tiny" src="${post.author.avatar}" alt="User icon">
                </a>
                    <div class=username-and-post-date>
                        <p class="profile-name-post someone-else-profile mt-1 mr-1 mb-0 ml-3"><a href="/profile/index.html?name=${post.author.name}">${post.author.name}</a></p>
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
    

/**
 * 
 * @param {object} domElement - where to print HTML  
 * @param {array} postData - what HTML to print
 * 
 * This function prints HTML to the single post DOM element
 */    
export function singlePostContent(domElement, postData) {
    const myUserName = localStorage.getItem('userName');
    const creationDate = postData.created.replaceAll("-", ".");
    const formattedDate = creationDate.slice(0, creationDate.length - 14).split(".").reverse().join(".");
    domElement.innerHTML = `
    <div class="post d-flex flex-column justify-content-center align-content-center">
        <h1 class="text-center">${postData.title}</h1>
        <p class="text-center">${postData.body}</p>
        <img class="post-img text-center justify-self-center align-self-center" src="${postData.media}" alt="">
        <p class="text-center">Posted the ${formattedDate} by ${postData.author.name}</p>
    </div>
    `;

    if (postData.author.name === myUserName) {
        domElement.innerHTML += `
        <div class="d-flex justify-content-evenly">
            <button class="delete" id="${postData.id}">delete post</button><button class="edit">edit post</button>
        </div>`;
    }
};

/**
 * 
 * @param {object} domElement - where to print HTML  
 * @param {array} postData - what HTML to print
 * 
 * This function prints the post reactions to HTML in the reactions div  
 */
export function createReactions(domElement, postData) {
    const reactions = postData.reactions; 
    for (let i = 0; i < reactions.length; i++) {
        domElement.innerHTML += `<span class="reaction text-center m-2">${reactions[i].symbol}${reactions[i].count}</span>`;
    }
    // domElement.innerHTML += `
    
    // `;
}

/**
 * 
 * @param {object} domElement - where to print HTML  
 * @param {array} postData - what HTML to print
 * 
 * This function  prints post commmments to the post. If the comment was 
 * made by the logged in user, you get the option to delete or edit it
 */
export function createComments(domElement, postData) {
    const myUserName = localStorage.getItem('userName');
    const comments = postData.comments;
    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        if (!comment.body){
            continue;
        }
        domElement.innerHTML += `
        <div class="comment">
            <div class="d-flex profile-info flex-row space-evenly">
            <a href="/profile/index.html?name=${comment.author.name}">
                <img class="profile-pic-tiny" src="${comment.author.avatar}" alt="User icon">
            </a>
                <p class="profile-name-post my-profile mt-1 mr-1 mb-0 ml-3"><a href="/profile/index.html?name=${comment.author.name}">${comment.author.name}</a></p>
            </div>
            <p class="comment-text">${comment.body}</p>
        </div>
            `
    }
};
