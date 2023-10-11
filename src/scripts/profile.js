import profileComponent from "../components/profileComponent.js";
import FollowCard from "../components/FollowCard.js";
import apiClient from "./services/noroffAPI.js";
import Navbar from "../components/Navbar.js";
import spinner from "../components/spinner.js";
import PostsComponent from "../components/newPostComponent.js";
import settingsComponent from "../components/settingsComponent.js";

const main = ()=>{
    const APICLIENT = new apiClient();
    const posts = new PostsComponent()
    const usernameQueryParam = localStorage.getItem('user');

    const navbar = new Navbar('#navbar')
    navbar.addNavItem('#navbar-item-profile', ()=>{
        return {
            href: `./profile.html?user=${usernameQueryParam}`,
            
        }
    });
    navbar.addNavItem('#navbar-item-feed', ()=>{
        return {
            href: `./feed.html`,
            
        }
    })

    navbar.addNavItem('#navbar-item-sign-out', ()=>{
        return {
            href: `./index.html`,
            signOut: true,
        }
    })


    APICLIENT.fetchProfile(usernameQueryParam)
        .then(spinner('#profile-container'))
        .then(response => {
            profileComponent('#profile-container', response)
            settingsComponent('#user-settings-image', response)
            FollowCard('#following-container', response.following, ()=>{
                return {
                    type: ['bi', 'bi-person-dash', 'icon-medium'],

                }
            })
            FollowCard('#followers-container', response.followers, ()=>{
                return {
                    type: ['bi', 'bi-person-dash', 'icon-medium'],
                    event: (event)=>{
                        console.log("click");
                        console.log(event.target);
                    }
                }
            })
        })
    APICLIENT.fetchProfilePosts(usernameQueryParam)
        .then(spinner('#profile_post-container'))
        .then(response => posts.renderPosts('#profile_post-container', response))
}

main()