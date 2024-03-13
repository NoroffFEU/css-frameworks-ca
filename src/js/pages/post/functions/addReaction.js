import { reactToPost } from "../../../api/posts/reactions/reactToPost.js";
import { load } from "../../../api/storage/load.js";

export async function addReaction(post, newPost) {
    try {
        const reactButton = newPost.querySelector('.post-reaction');
        const unReactButton = newPost.querySelector('.post-reaction-liked');
        const ownProfile = load("profile");
    
        const postId = post.id;
    
        if (post.reactions && post.reactions.length > 0 && post.reactions[0].reactors) {
            const reactorNames = post.reactions[0].reactors.map(reactor => reactor);
    
            if (reactorNames.includes(ownProfile.name)) {
                unReactButton.classList.remove('d-none');
                reactButton.classList.add('d-none');
    
                unReactButton.addEventListener('click', async (e) => {
                    unReactButton.classList.add('d-none');
                    reactButton.classList.remove('d-none');
                    reactToPost(postId);
                });
            } else {
                unReactButton.classList.add('d-none');
                reactButton.classList.remove('d-none');
    
                reactButton.addEventListener('click', async (e) => {
                    unReactButton.classList.remove('d-none');
                    reactButton.classList.add('d-none');
                    reactToPost(postId);
                });
            }
        } else {
            console.log('No reactions found for the post.');
            unReactButton.classList.add('d-none');
            reactButton.classList.remove('d-none');
    
            reactButton.addEventListener('click', async (e) => {
                unReactButton.classList.remove('d-none');
                reactButton.classList.add('d-none');
                reactToPost(postId);
            });
        }
    } catch(error) {
        console.log('Error:', error);
    }
}
