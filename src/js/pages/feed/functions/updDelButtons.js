import { load } from "../../../api/storage/load.js";
import { deletePost } from "./deletePost.js";
import { editPost } from "./editPost.js";

export async function updDelButtons(profileName, newPost, postId) {
    const ownProfile = load("profile");


    if (profileName === ownProfile.name) {
        
        newPost.querySelector('.edit-button').classList.remove('d-none');
        newPost.querySelector('.edit-button').addEventListener('click', async (e) => {
            e.preventDefault();

            editPost(newPost, postId);
        })

        newPost.querySelector('.delete-button').classList.remove('d-none');
        newPost.querySelector('.delete-button').addEventListener('click', async (e) => {
            e.preventDefault();
            
            deletePost(postId);
        })

    } else {
    }
}