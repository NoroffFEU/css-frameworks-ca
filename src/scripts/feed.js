
import Navbar from "../components/Navbar.js";
import apiClient from "./services/noroffAPI.js";
import PostsComponent from "../components/newPostComponent.js";
import parseTags from "./utils/parseTags.js";
import parseTitle from "./utils/parseTitle.js";
import spinner from "../components/spinner.js";
import getTags from "./utils/getTags.js";


const main = ()=>{
    const APICLIENT = new apiClient();
    const posts = new PostsComponent()
    const usernameQueryParam = localStorage.getItem('user');
    const addMediaButton = document.querySelector("#add-media-button");
    const cancelMediaButton = document.querySelector("#cancel-media-button")
    const navbar = new Navbar('#navbar');
    navbar.addNavItem('#navbar-item-profile', ()=>{
        return {
            href: `./profile.html?user=${usernameQueryParam}`,
        }
    });
    navbar.addNavItem('#navbar-item-feed', ()=>{
        return {
            href: `./feed.html`
        }
    });
    navbar.addNavItem('#navbar-item-sign-out', ()=>{
        return {
            href: `./index.html`,
            signOut: true,
        }
    })

    // Declare post object for creating a new post
    const post = {};
    const newPost = document.querySelector('#new-post');
    const newPostButton = document.querySelector('#new-post-button');
    newPost.addEventListener('input', (event) =>{
        newPostButton.disabled = true;
        const message = event.target.value;
        
        if(message.trim().length > 2){
            newPostButton.disabled = false;
            
        }
    })

    addMediaButton.addEventListener("click", ()=>{
        const media = document.querySelector('#mediaImage').value;
        post.media = media;
    })

    cancelMediaButton.addEventListener("click", ()=>{
        document.querySelector("#mediaImage").value = ""
    })

    newPostButton.addEventListener('click', (event)=>{
        event.preventDefault()
        const message = newPost.value;
        const tags = parseTags(message)
        const title = parseTitle(message)
        post.title = title, 
        post.body = message, 
        post.tags = [...tags]
        APICLIENT.newPost(post)
            .then(response => console.log(response))
            .then(setTimeout(() => {
                window.location.reload()
            }, 500))
    })
    

    // Search functionality. Allows user to search for posts by key words or by user ID
    const searchInput = document.querySelector('#search-input')
    const postsContainer = document.querySelector('#profile_post-container')

    const searchPostsButton = document.querySelector('#search-posts-button')
    searchPostsButton.addEventListener('click', (event)=>{
        event.preventDefault()
        const searchString = searchInput.value
        postsContainer.querySelectorAll('.post').forEach(post => post.remove())
        APICLIENT.fetchPosts()
            .then(spinner('#profile_post-container'))
            .then(response => {
                
                const filteredResponse = response.filter(post => {
                    if(post.body === null){
                        return
                    } else{
                        return post.body.toLowerCase().includes(searchString) || post.body.includes(searchString) || post.id == searchString
                    }
                })
                if(filteredResponse.length === 0){
                    console.log("no found")
                    const error = document.createElement("p");
                    error.textContent = "No Posts Found"
                    document.querySelector("#profile_post-container").append(error)
                    setTimeout(() => {
                        
                        posts.renderPosts("#profile_post-container", response)
                        error.remove()
                    }, 1000);
                    
                } else{
                    posts.renderPosts('#profile_post-container', filteredResponse)
                    searchInput.value = ""
                }

            })
    })

    // Filter functionality. Filter posts by date of posts

    const filterPosts = document.querySelector('#filter-posts')
    filterPosts.addEventListener('change', (event)=>{
        postsContainer.querySelectorAll('.post').forEach(post => post.remove())
        const appliedFilter = event.target.value;
        APICLIENT.sortPosts(appliedFilter)
            .then(spinner('#profile_post-container'))
            .then(response => {
                posts.renderPosts('#profile_post-container', response)
            })

    })

    // Comment on posts

    

    // Fetch posts from API and render posts in feed

    APICLIENT.fetchPosts()
        .then(spinner('#profile_post-container'))
        .then(response => {
            posts.renderPosts('#profile_post-container', response)
            const uniqueTags = [...new Set(response.map((post) => post.tags).flat())];
            const tags = response.map(post => post.tags).flat()
            getTags(tags)
        })
}


main()