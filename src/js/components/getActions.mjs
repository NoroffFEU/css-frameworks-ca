
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
        const {title, body, author, id, _count, created} = postsArray[i];
        // console.log(`title is ${title}, body is ${body} and author is ${author.name}`);
        const postedDate = created.replaceAll("-", ".");
        const slicedPostDate = postedDate.slice(0, postedDate.length - 14).split(".").reverse().join(".");
        
        if (!body || !title) {
            continue;
        }
        if (author.name === myUserName) {
            domElement.innerHTML += `
            <div class="single-post m-3 custom-border">
                <div class="d-flex">
                <a href="/profile/index.html?name=${author.name}">
                    <img class="profile-pic-tiny" src="${author.avatar}" alt="User icon">
                </a>
                    <div class=username-and-post-date>
                        <p class="profile-name-post my-profile mt-1 mr-1 mb-0 ml-3"><a href="/profile/index.html?name=${author.name}">${author.name}</a></p>
                        <p class="mt-1 mr-1 mb-0 ml-1">Posted the ${slicedPostDate}</p>
                    </div>
                </div>
                <h5><a href="singlepost.html?id=${id}">${title}</a><h5>
                <p class="post-text">
                    ${body}
                </p>
                <p>Post has ${_count.comments} comments and ${_count.reactions} reactions</p>
            </div>
            `;
        } else {
            domElement.innerHTML += `
            <div class="single-post m-3 custom-border">
                <div class="d-flex">
                <a href="/profile/index.html?name=${author.name}">
                    <img class="profile-pic-tiny" src="${author.avatar}" alt="User icon">
                </a>
                    <div class=username-and-post-date>
                        <p class="profile-name-post someone-else-profile mt-1 mr-1 mb-0 ml-3"><a href="/profile/index.html?name=${author.name}">${author.name}</a></p>
                        <p class="mt-1 mr-1 mb-0 ml-1">Posted the ${slicedPostDate}</p>
                    </div>
                </div>
                <h5><a href="singlepost.html?id=${id}" class="single-post-link">${title}</a><h5>
                <p class="post-text">
                    ${body}
                </p>
                <p>Post has ${_count.comments} comments and ${_count.reactions} reactions</p>
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

    if (!searchWord) {
        printFeed(domElement, postsArray);
    }

    if (!searchIn) {
        filteredArray = postsArray.filter(post => {
            const {title, body} = post;
            const lowerCaseTitle = title.toLowerCase();
            if (title && body) {
                const lowerCaseBody = body.toLowerCase();
                return lowerCaseTitle.includes(`${searchWord}`) || lowerCaseBody.includes(`${searchWord}`);
            } else if (!body) {
                return lowerCaseTitle.includes(`${searchWord}`);
            }
        });
    } else {
        filteredArray = postsArray.filter(post => {
            const {title, body} = post; 
            if (searchIn === "title") {
                const lowerCaseTitle = title.toLowerCase();
                return lowerCaseTitle.includes(`${searchWord}`);
            } else if (searchIn === "body" && body) {
                const lowerCaseBody = body.toLowerCase();
                return lowerCaseBody.includes(`${searchWord}`);
            }
            
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
    const {title, body, media, created, author, id} = postData
    const creationDate = created.replaceAll("-", ".");
    const formattedDate = creationDate.slice(0, creationDate.length - 14).split(".").reverse().join(".");
    domElement.innerHTML = `
    <div class="post d-flex flex-column justify-content-center align-content-center">
        <h1 class="text-center">${title}</h1>
        <p class="text-center">${body}</p>
        <img class="post-img text-center justify-self-center align-self-center" src="${media}" alt="">
        <p class="text-center">Posted the ${formattedDate} by ${author.name}</p>
    </div>
    `;

    if (author.name === myUserName) {
        domElement.innerHTML += `
        <div class="d-flex justify-content-evenly">
            <button class="delete" id="${id}">delete post</button><button class="edit">edit post</button>
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
        const {author, body} = comments[i];
        if (!body){
            continue;
        }
        domElement.innerHTML += `
            <div class="comment">
            <div class="d-flex profile-info flex-row space-evenly">
            <a href="/profile/index.html?name=${author.name}">
                <img class="profile-pic-tiny" src="${author.avatar}" alt="User icon">
            </a>
                <p class="profile-name-post my-profile mt-1 mr-1 mb-0 ml-3"><a href="/profile/index.html?name=${author.name}">${author.name}</a></p>
            </div>
            <p class="comment-text">${body}</p>
            </div>
            `
    }
};

/**
 * 
 * @param {object} domElement  - where to print data
 * @param {*} userData - what data to print
 * gets data about the relevant user and prints a profile summary with the users avatar and name
 */
export function creatreProfileUser(domElement, userData) {
    const myUserName = localStorage.getItem("userName");
    const {followers, name, avatar} = userData;
    const userFollowers = followers;
    const me = userFollowers.find((follower) => follower.name === myUserName);
    if (userData.name === myUserName) {
        domElement.innerHTML = `
        <div class="col-4 profile-summary mt-lg-5 mr-auto mb-5 ml-auto mt-sm-0 d-flex flex-column align-items-center w-50">
            <img class="profile-pic m-3" src="${avatar}" alt="User icon created by Freepik">
            <div class="d-flex flex-column justify-content-center">
                <h1 class="profile-name text-center">${name}</h1>
            </div>
            <form class="set-avatar" action="submit">
                <label for="avatar">Change Avatar</label>
                <input type="text" name="avatar" id="avatar" placeholder="url to image">
                <button class="set-avatar-btn">Set avatar</button>
            </form>
        </div>
        `;       
    } else if (me) {
        domElement.innerHTML = `
            <div class="col-4 profile-summary mt-lg-5 mr-auto mb-5 ml-auto mt-sm-0 d-flex flex-column align-items-center w-50">
                <img class="profile-pic m-3" src="${avatar}" alt="User icon created by Freepik">
                <div class="d-flex flex-column justify-content-center">
                    <h1 class="profile-name text-center">${name}</h1>
                    <button class="btn unfollow-btn btn-primary mb-1">
                        Unfollow
                    </button>
                </div>
            </div>
        `;
    } else {
        domElement.innerHTML = `
            <div class="col-4 profile-summary mt-lg-5 mr-auto mb-5 ml-auto mt-sm-0 d-flex flex-column align-items-center w-50">
                <img class="profile-pic m-3" src="${avatar}" alt="User icon created by Freepik">
                <div class="d-flex flex-column justify-content-center">
                    <h1 class="profile-name text-center">${name}</h1>
                    <button class="btn follow-btn btn-primary mb-1">
                        Follow
                    </button>
                </div>
            </div>
        `;
    }
};

/**
 * 
 * @param {object} domElement  - where to print data
 * @param {*} userData - what data to print
 * gets data about the relevant user and prints a summary of who follows this profile, 
 */
export function showFollowers(domElement, userData) {
    const followers = userData.followers;
    if (followers.length === 0) {
        domElement.innerHTML = `
        <p>No followers yet</p>
        `;
    }
    for (let i = 0; i < followers.length; i++) {
        const {name, avatar} = followers[i];
        domElement.innerHTML += `
            <div class="d-flex align-items-center mt-2 mb-2">
                <a href="/profile/index.html?name=${name}">
                    <img class="profile-pic-tiny" src="${avatar}" alt="User icon">
                </a>
                <div>
                    <p class="profile-name-post mt-1 mr-1 mb-0 ml-1"><a href="/profile/index.html?name=${name}">${name}</a></p>
                </div>
            </div>
        `;
    }
};

/**
 * 
 * @param {object} domElement  - where to print data
 * @param {*} userData - what data to print
 * gets data about the relevant user and prints a summary of who the profile follows 
 */
export function showFollowing(domElement, userData) {
    const following = userData.following;
    if (following.length === 0) {
        domElement.innerHTML = `
        <p>Not following anyone yet</p>
        `;
    }
    for (let i = 0; i < following.length; i++) {
        const {name, avatar} = following[i];
        domElement.innerHTML += `
            <div class="d-flex align-items-center mt-2 mb-2">
                <a href="/profile/index.html?name=${name}">
                    <img class="profile-pic-tiny" src="${avatar}" alt="User icon">
                </a>
                <div>
                    <p class="profile-name-post mt-1 mr-1 mb-0 ml-1"><a href="/profile/index.html?name=${name}">${name}</a></p>
                </div>
            </div>
        `;
    }
}

/**
 * 
 * @param {object} domElement  - where to print data
 * @param {*} userData - what data to print
 * gets data about the relevant user and prints a the users posts
 */
export function createPostHistory(domElement, userData) {
    const {posts, avatar, name} = userData;
    for (let i = 0; i < posts.length; i++) {
        const {created, id, title, body} = posts[i];
        const postedDate = created.replaceAll("-", ".");
        const slicedPostDate = postedDate.slice(0, postedDate.length - 14).split(".").reverse().join(".");
        domElement.innerHTML += `
        <div class="single-post m-3 custom-border">
            <div class="d-flex">
                <img class="profile-pic-tiny" src="${avatar}" alt="User icon">
                <div>
                <p class="profile-name-post mt-1 mr-1 mb-0 ml-1 someone-else-profile ">${name}</p>
                    <p class="mt-1 mr-1 mb-0 ml-1">${slicedPostDate}</p>
                </div>
            </div>
            <h5><a href="../feed/singlepost.html?id=${id}" class="single-post-link">${title}</a></h5>
            <p class="post-text">
                ${body}
            </p>
        </div>
        `;
    }
}