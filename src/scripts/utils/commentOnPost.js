import apiClient from "../services/noroffAPI.js";
/**
 * 
 * @param {string} input 
 * @param {Number} postID 
 */
const commentOnPost = (input, postID)=>{
    const APICLIENT = new apiClient()
    console.log(input, postID)
    const payload = {
        body: input.value
    }
    console.log(payload)
    APICLIENT.postComment(postID, payload)
        .then(setTimeout(() => {
            window.location.reload()
        }, 500))

}

export default commentOnPost;