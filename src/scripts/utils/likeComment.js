import apiClient from "../services/noroffAPI.js";
/**
 * 
 * @param {Number} postID 
 */
const likeComment = (postID)=>{
    const APICLIENT = new apiClient()
    APICLIENT.likeComment(postID)
        .then(setTimeout(() => {
            window.location.reload()
        }, 500))
}

export default likeComment;