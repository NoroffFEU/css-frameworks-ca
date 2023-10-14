import apiClient from "../services/noroffAPI.js";
/**
 * 
 * @param {Event} e 
 */
const editPost = (e)=>{
    const fetchAPI = new apiClient()
    console.log(e.target.closest('.post').querySelector('.post-content'));
    const postContainer = e.target.closest('.post').querySelector('.post-content')
    const parentNode = e.target.closest(".post").querySelector(".content");
    const image = e.target.closest(".post").querySelector("img")
    const input = document.createElement("input");
    input.classList.add("form-control")
    const editImage = ()=>{
        
        input.value = image.src
        image.before(input)
    }

    if(image != null){
        console.log(image)
        image.classList.add("opacity-25", "edit-image")
        image.addEventListener("click", editImage)
    } else{
        input.placeholder = "Add Image URL"
        parentNode.before(input)
        
    }
    
    console.log(parentNode)
    parentNode.setAttribute("contenteditable", true);
    parentNode.classList.add("text-bg-light", "p-3", "edit-content")
    const editButton = document.createElement("button")
    editButton.classList.add("custom-btn-small")
    editButton.textContent = "Edit Post"
    
    editButton.addEventListener("click", (e)=>{
        const previousText = parentNode.textContent
        const postID = parentNode.id.substring(parentNode.id.indexOf("-")+1)

        console.log(postID)
        const payload = {
            body: previousText,
            media: input.value === "" ? image.src : input.value
        }
        console.log(payload)
        fetchAPI.editPost(postID, payload)
            .then(setTimeout(() => {
                window.location.reload()
            }, 500))
    })
    const cancelButton = document.createElement("button");
    cancelButton.classList.add("custom-btn-small", "bg-light", "ms-5")
    cancelButton.textContent = "Cancel"
    cancelButton.addEventListener("click", (e)=>{
        parentNode.setAttribute("contenteditable", false);
        parentNode.classList.remove("text-bg-light", "p-3")
        if(image != null){
            image.classList.remove("opacity-25", "edit-image")
            image.removeEventListener("click", editImage)
            
        }
        input.remove()
        editButton.remove()
        cancelButton.remove()
        
    })
    e.target.closest(".post").querySelector(".post-content").append(editButton, cancelButton)
}



export default editPost;