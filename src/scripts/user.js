import apiClient from "./services/noroffAPI.js";
import spinner from "../components/spinner.js";
import userComponent from "../components/userComponent.js";
import checkFollow from "./services/checkFollow.js";
const main = ()=>{
    const followButton = document.querySelector("#follow-btn")
    const usernameQueryParam = new URLSearchParams(window.location.search).get('user');
    
    const fetchAPI = new apiClient();
    
    fetchAPI.fetchProfile(usernameQueryParam)
        .then(spinner('#user-container'))
        .then(response => {
            userComponent('#user-container', response)
            if(checkFollow(response.followers)){
                
                followButton.textContent = "Unfollow"
                followButton.addEventListener("click", (e)=>{
                    fetchAPI.unFollowUser(usernameQueryParam)
                        .then(() => {
                            window.location.reload()
                        })
                        
                })
            } else {
                followButton.textContent = "Follow"
                followButton.addEventListener("click", (e)=>{
                    fetchAPI.followUser(usernameQueryParam)
                        .then(() => {
                            
                            window.location.reload()
                        })
                        
                })
            }
        })
}

main()