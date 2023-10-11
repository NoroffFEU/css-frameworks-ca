import apiClient from "../services/noroffAPI.js";

const deletePost = (id)=>{
    const fetchAPI = new apiClient()
    fetchAPI.deletePost(id)
        .then(setTimeout(() => {
            window.location.reload()
        }, 500))

}

export default deletePost;