const mainApiUrl = "https://api.noroff.dev/api/v1";
const getPostsUrl = `${mainApiUrl}/social/posts`;

// using token to fetch the posts

async function getPostsWithToken(url) {
    try {
        const token = localStorage.getItem("accessToken");
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



// showing posts

var containerHTMLCard = document.getElementById("singleCard");

async function getPosts() {
    var getPost = await getPostsWithToken(getPostsUrl);
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
                            <button type="button" class="btn btn-sm btn-secondary">Show comments post</button>
                            <button type="button" class="btn btn-sm btn-secondary">Show Reactions</button>
                        </div>
                        <small class="text-muted" id="cardUpdated">${getPost[i].updated}</small>
                    </div>
                </div>
            </div>
        </div>        
        `;
    }
}

window.onload = getPosts();

// filter comments and reactions