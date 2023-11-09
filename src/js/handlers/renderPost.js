import * as templates from "../templates/index.js";
import * as postMethods from "../api/posts/index.js";

export function renderPostDetails() {
    // Executes for the post detail page
    const urlParams = new URLSearchParams(location.search);
    const postId = urlParams.get("id");

    if (postId) {
        async function renderPost() {
            // Fetch the specific post by ID using the getPost method
            const post = await postMethods.getPost(postId);
            const container = document.querySelector("#postContainer");
            templates.renderPostTemplate(post, container);
            console.log(post);

            function beAbleToRemovePost() {
                // Get the current user's username from local storage
                const userName = localStorage.getItem("userName");
                // Trim it so it does not have the quotation marks on it
                const currentUserName = userName ? userName.trim().replace(/^"(.*)"$/, "$1") : null;
                console.log("currentUserName:", currentUserName);

                const authorName = post.author.name.trim();
                console.log("authorName:", authorName);

                //check if the current username from local storage matches the post author name in api
                if (currentUserName === post.author.name) {
                    const removePostButton = document.querySelector("#removePostButton");
                    const updatePostButton = document.querySelector("#updatePostButton");

                    if (removePostButton && updatePostButton) {
                        removePostButton.style.display = "block";
                        updatePostButton.style.display = "block";
                        removePostButton.addEventListener("click", async (event) => {
                            event.preventDefault();
                            // Remove post
                            try {
                                await postMethods.removePost(postId);
                                // Message indicating the post has been deleted.
                                alert("Post has been deleted.");
                                // Remove the post UI from the page.
                                const postContainer = document.querySelector("#postContainer");
                                if (postContainer) {
                                    templates.afterDeleteTemplate();
                                }
                            } catch (error) {
                                console.error("Error deleting post:", error);
                                alert("An error occurred while deleting the post.");
                            }
                        });
                    }
                } else {
                    function notMyPost() {
                        const removePostButton = document.querySelector("#removePostButton");
                        const updatePostButton = document.querySelector("#updatePostButton");
                        if (removePostButton && updatePostButton) {
                            removePostButton.style.display = "none";
                            updatePostButton.style.display = "none";
                        }
                    }
                    notMyPost();
                }
            }

            beAbleToRemovePost();
        }
        renderPost();
    } else {
        templates.afterDeleteTemplateError();
    }
}

export function renderPostsInFeed() {
    // Executes for the posts/index.html page
    // Rendering the list of posts
    async function renderPosts(posts = null, parent) {
        // If posts parameter is not provided, fetch posts
        if (!posts) {
            posts = await postMethods.getPosts();
        }

        const goodPosts = postMethods.filterBadPostData(posts);
        // const profilePosts = postMethods.filterPostDataForProfile(posts);
        console.log("goodPosts filtered from API:", goodPosts);
        // console.log(profilePosts);
        const container = parent || document.querySelector("#postList");
        container.innerHTML = "";
        templates.renderPostTemplates(goodPosts, container);
        // templates.renderPostTemplates(profilePosts, container);
    }
    renderPosts();

    // if(location.pathname.includes("/profile/index.html")) {}

    function titleMatches(query, post) {
        return post.title.toLowerCase().includes(query.toLowerCase());
    }

    function bodyMatches(query, post) {
        return post.body && post.body.toLowerCase().includes(query.toLowerCase());
    }

    function authorMatches(query, post) {
        return post.author.name.toLowerCase().includes(query.toLowerCase());
    }

    function tagMatches(query, post) {
        return post.tags.map((tag) => tag.toLowerCase()).includes(query.toLowerCase());
    }

    function search(query, posts) {
        return posts.filter((post) => {
            return titleMatches(query, post) || bodyMatches(query, post) || authorMatches(query, post) || tagMatches(query, post);
        });
    }

    function updateFeedWithSearchResults(results) {
        const feed = document.querySelector("#postList");
        feed.innerHTML = "";

        if (results.length === 0) {
            feed.textContent = "No result found";
            return;
        }

        renderPosts(results, feed);
    }

    const searchInput = document.querySelector("#search-input");
    searchInput.addEventListener("keyup", handleSearchInput);

    const searchForm = document.querySelector("#search-form");
    searchForm.addEventListener("submit", handleSearchSubmit);

    function handleSearchInput(event) {
        const inputValue = event.currentTarget.value.trim().toLowerCase();
        console.log(inputValue);

        // Get all posts
        postMethods.getPosts().then((posts) => {
            const searchResults = search(inputValue, posts);
            console.log(searchResults);

            // Update the feed with the search results
            updateFeedWithSearchResults(searchResults);
        });
    }

    function handleSearchSubmit(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const inputValue = searchInput.value.trim().toLowerCase();
        console.log(inputValue);

        // Get all posts
        postMethods.getPosts().then((posts) => {
            const searchResults = search(inputValue, posts);
            console.log("search results:", searchResults);

            // Update the feed with the search results
            updateFeedWithSearchResults(searchResults);
        });
    }
}
