const token = localStorage.getItem("accessToken");
const mainApiUrl = "https://api.noroff.dev/api/v1";
//const getMyPosts = `${mainApiUrl}/social/profiles/:name/posts`;
const myName = localStorage.getItem("name");
const getMyPosts = `${mainApiUrl}/social/profiles/${myName}/posts`;
const myPostsUrl = `${mainApiUrl}/social/posts`;


async function getPostsWithToken(url) {
    try {
        const getData = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, getData);
        console.log(response);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }

}

// showing my posts
async function getPosts() {
    var containerHTMLCard = document.getElementById("singleCardProfile");
    //Clear the page
    containerHTMLCard.innerHTML = "";

    var getPost = await getPostsWithToken(getMyPosts);
    var setImg = "";
    for (var i = 0; i < getPost.length; i++) {
        if (getPost[i].media === null ||
            getPost[i].media == "" ||
            getPost[i].media.includes(".jpg") === false ||
            getPost[i].media.includes(".jpeg") === false ||
            getPost[i].media.includes(".png") === false) {
            setImg = "../pics/jean-marc-vieregge-cDKqFb-NOZc-unsplash.jpg";
        } else {
            setImg = getPost[i].media;
        }

        containerHTMLCard.innerHTML += `
        <div class="my-2 col col-lg-10">
            <div class="card shadow-sm"> 
                <img src="${setImg}" alt="Hanks of wool" class="bd-placeholder-img card-img-top" id="cardPicture">
                <h5 class="card-title" id="cardTitle">${getPost[i].title}</h5>
                <div class="card-body">
                    <p class="card-text text-start" id="cardBody">${getPost[i].body}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-secondary" id="btnShowComments">Comments</button>
                            
                            <button type="button" class="btn btn-sm btn-secondary" id="btnShowReactions">Reactions</button>
                            <button type="button" class="btn btn-sm btn-secondary" id="btnEdit${getPost[i].id}">Edit</button>
                            <button type="button" class="btn btn-sm btn-secondary" id="btnDelete${getPost[i].id}" data-postid="${getPost[i].id}">Delete</button>
                        </div>
                        <small class="text-muted" id="cardUpdated">${getPost[i].updated}</small>
                        
                    </div>
                </div>
                <div id="showComments" style="display:none;">comments go here</div>
                <div id="showReactions" style="display:none;">reactions go here</div>
            </div>
        </div>        
        `;

    }

    //https://stackoverflow.com/questions/44162581/use-wildcard-to-find-specific-id-using-javascript
    //https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
    const deleteBtns = document.querySelectorAll('[id^="btnDelete"]');

    for (let i = 0; i < deleteBtns.length; i++) {
        const deleteBtn = deleteBtns[i];
        deleteBtn.addEventListener("click", async function () {
            const postId = deleteBtn.dataset.postid;
            await deletePost(postId);
        });
    }

}

window.onload = getPosts();



// delete post
async function deletePost(id) {
    const deletePost = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        await fetch(`${myPostsUrl}/${id}`, deletePost);
        await getPosts();
    } catch (error) {
        console.log(error);
    }

}