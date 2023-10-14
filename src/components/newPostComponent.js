
import convertDate from "../scripts/utils/dateConvert.js";
import deletePost from "../scripts/utils/deletePost.js";
import editPost from "../scripts/utils/editPost.js";
import ImagePlaceholder from "./ImagePlaceholder.js";
import commentOnPost from "../scripts/utils/commentOnPost.js";
import likeComment from "../scripts/utils/likeComment.js";

export default class PostsComponent{
    /**
     * 
     * @returns HTML component
     */
    postCard(){
        const card = document.createElement('div');
        card.classList.add('post', 'mb-4');
        return card;
    }

    /**
     * 
     * @param {string} author 
     * @param {number} postID 
     * @returns null || HTML component
     */

    postHeader(author, postID){
        const {name, avatar} = author;
        const user = localStorage.getItem('user');
        if(name.length === 0){
            return
        }
        const header = document.createElement('div');

        header.classList.add('card-header', 'd-flex', 'align-items-center', 'justify-content-between');
        const userContainer = document.createElement('div');
        userContainer.classList.add('d-flex', 'align-items-center', 'justify-content-center')
        const authorElement = document.createElement('a');
        authorElement.classList.add('card-title', 'ms-3');
        authorElement.textContent = name;
        authorElement.href = `./user.html?user=${name}`
        userContainer.append(authorElement)
        
        
        userContainer.prepend(avatar ? this.postProfileImage(avatar) : ImagePlaceholder());
        header.append(userContainer)
        name === user && header.append(this.postOptions(postID))
        return header;
    }

    /**
     * 
     * @param {number} postID 
     * @returns HTML component
     */

    postOptions(postID){
        
        const dropDown = document.createElement('div');
        dropDown.classList.add('dropstart');
        const dropDownButton = document.createElement('button');
        dropDownButton.classList.add('btn', 'btn-secondary');
        dropDownButton.type = 'button';
        dropDownButton.dataset.bsToggle = 'dropdown';
        const btnIcon = document.createElement('i');
        btnIcon.classList.add('bi', 'bi-three-dots');
        dropDownButton.append(btnIcon);
        const dropDownMenu = document.createElement('ul');
        dropDownMenu.classList.add('dropdown-menu');
        const menuItemEdit = document.createElement('li');
        const editButton = document.createElement('button');
        editButton.classList.add('dropdown-item', 'text-secondary');
        editButton.type = 'button';
        editButton.textContent = "Edit post";
        const editIcon = document.createElement('i');
        editIcon.classList.add('bi', 'bi-pencil', 'me-1')

        editButton.addEventListener('click', editPost);

        editButton.prepend(editIcon);
        menuItemEdit.append(editButton);
        const menuItemDelete = document.createElement('li');
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('dropdown-item', 'text-primary');
        deleteButton.type = 'button';
        deleteButton.textContent = 'Delete Post';
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('bi', 'bi-trash', 'me-1');
        deleteButton.prepend(deleteIcon);

        deleteButton.addEventListener("click", ()=>{deletePost(postID)})

        menuItemDelete.append(deleteButton)
        dropDownMenu.append(menuItemEdit, menuItemDelete)

        dropDown.append(dropDownButton, dropDownMenu);

        return dropDown;
    }

    /**
     * 
     * @param {string} src 
     * @returns HTML component
     */

    postProfileImage(src){
        const circle = document.createElement('div');
        circle.classList.add('postCard-image');
        const profileImage = document.createElement('img');
        profileImage.alt = "User profile picture";
        profileImage.src = src;
        circle.append(profileImage)
        return circle;
    }

    /**
     * 
     * @param {string} name 
     * @returns HTML component
     */

    postProfileDefaultImage(name){
        const circle = document.createElement('div');
        circle.classList.add('circle');
        const profileDefaultImage = document.createElement('div');
        profileDefaultImage.classList.add('image-profile-default');
        profileDefaultImage.textContent = name.charAt(0).toUpperCase();
        circle.append(profileDefaultImage)
        return circle;
    }

    /**
     * 
     * @param {string} content 
     * @param {Array} tags 
     * @param {string} media 
     * @param {number} date 
     * @param {number} postID 
     * @returns HTML component
     */

    postBody(content, tags, media, date, postID){
        const body = document.createElement('div');
        body.classList.add('card-body');
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('post-content');
        const dateElement = document.createElement('p');
        dateElement.classList.add('ms-auto', 'fw-lighter', 'small')
        dateElement.textContent = convertDate(date);
        const contentString = document.createElement('p');
        contentString.classList.add('card-text', 'mt-2', "content");
        contentString.id = `post-${postID}`;
        contentString.textContent = `${content}`;
        media ? contentContainer.append(dateElement, contentString, this.postMedia(media)) : contentContainer.append(dateElement, contentString)
        contentContainer.append(this.postTags(tags));
        body.append(contentContainer)
        return body;
    }

    /**
     * 
     * @param {string} src 
     * @returns HTML component
     */

    postMedia(src){
        const image = document.createElement('img');
        image.classList.add('card-img-top', 'img-thumbnail', 'post-image', 'mb-3');
        image.src = src;
        image.alt = 'Post Image';
        image.addEventListener('click', ()=>console.log(src))
        return image;
    }

    /**
     * 
     * @param {Array} tags 
     * @returns HTML component
     */

    postTags(tags){
        const tagsContainer = document.createElement('div');
        tagsContainer.classList.add('border-top', 'd-flex');
        tags.forEach(tag => {
            if(tag.length === 0){
                return
            }
            const tagElement = document.createElement('p');
            tagElement.classList.add('text-primary', 'mt-1', 'ms-2');
            tagElement.textContent = `#${tag}`;
            tagsContainer.append(tagElement);
        })
        return tagsContainer;
    }

    /**
     * 
     * @param {number} postID 
     * @param {object} _count 
     * @param {number} comments 
     * @returns HTML component
     */

    postFooter(postID, _count, comments){
        const {comments: commentCount, reactions: reactionCount} = _count;
        const footer = document.createElement('div');
        footer.classList.add('card-footer');
        const reactionsContainer = document.createElement('div');
        reactionsContainer.classList.add('d-flex', 'justify-content-between');
        const commentReactionContainer = document.createElement('div');
        commentReactionContainer.classList.add('d-flex');
        // Comment Element
        const commentCountElement = document.createElement('a');
        commentCountElement.href = `#${postID}`;
        commentCountElement.role = 'button';
        commentCountElement.dataset.bsToggle = 'collapse';
        
        commentCountElement.textContent = commentCount === 0 ? 'No comments' : commentCount === 1 ? `${commentCount} comment` : `${commentCount} comments`;
        
        commentReactionContainer.append(commentCountElement)
        // Like Icon
        const likeReactionContainer = document.createElement('div');
        likeReactionContainer.classList.add('d-flex')
        const likeReactionIcon = document.createElement('i');
        likeReactionIcon.classList.add('bi', 'bi-hand-thumbs-up-fill', 'me-2');
        likeReactionIcon.addEventListener("click", ()=>{likeComment(postID)})
        const likeReactionCount = document.createElement('p');
        likeReactionCount.textContent = reactionCount === 0 ? 'No Likes' : reactionCount === 1 ? `${reactionCount} like` : `${reactionCount} likes`;
        likeReactionContainer.append(likeReactionIcon, likeReactionCount);

        reactionsContainer.append(commentReactionContainer, likeReactionContainer);
        // COMMENTS CONTAINER WITH NEW COMMENT ELEMENT

        const commentsContainer = document.createElement('div');
        commentsContainer.classList.add('collapse', 'w-100');
        commentsContainer.id = postID;
        commentsContainer.append(this.commentForm(postID), this.postComments(comments))
        footer.append(reactionsContainer, commentsContainer);
        return footer;
        
    }

    /**
     * 
     * @param {number} postID 
     * @returns HTML component
     */

    commentForm(postID){
        const form = document.createElement('form');
        form.classList.add('w-100', 'mb-4', 'pb-4', 'border-bottom');
        const inputContainer = document.createElement('div');
        inputContainer.classList.add('form-floating');

        const commentInputElement = document.createElement('input');
        commentInputElement.classList.add('form-control');
        commentInputElement.placeholder = 'Comment on post';
        commentInputElement.type = 'text';
        commentInputElement.id = `ID${postID}`
        const inputLabel = document.createElement('label');
        inputLabel.classList.add('form-label', 'text-white');
        inputLabel.htmlFor = `ID${postID}`;
        inputLabel.textContent = 'Comment on Post';
        const formButton = document.createElement('button');
        formButton.disabled = true
        commentInputElement.addEventListener("input", (e)=>{
            e.preventDefault()
            if(commentInputElement.value.length !== 0){
                formButton.disabled = false
            } else {
                formButton.disabled = true
            }
        })

        formButton.classList.add('custom-btn-small', 'ms-auto', 'mt-2');
        formButton.textContent = 'Comment'
        formButton.addEventListener("click", (event)=>{
            event.preventDefault()
            commentOnPost(commentInputElement, postID)
        })
        inputContainer.append(commentInputElement, inputLabel);
        form.append(inputContainer, formButton);
        return form;
    }

    /**
     * 
     * @param {Array} comments 
     * @returns HTML component
     */

    postComments(comments){
        const commentsContainer = document.createElement('div');
        comments.forEach(comment => {
            const {body: content, created, owner} = comment
            const card = document.createElement('div');
            card.classList.add('card', 'my-3');
            // HEADER
            const header = document.createElement('div');
            header.classList.add('card-header', 'd-flex', 'align-items-center', 'justify-content-between');
            const commentAuthor = document.createElement('p');
            commentAuthor.classList.add('small', 'text-primary');
            commentAuthor.textContent = owner;
            
            const dateElement = document.createElement('p');
            dateElement.classList.add('small')
            dateElement.textContent = convertDate(created);
            header.append(commentAuthor, dateElement);

            //BODY
            const body = document.createElement('div');
            body.classList.add('card-body');
            body.textContent = content;

            // APPENDING SUB COMPONENTS
            card.append(header, body);
            
            commentsContainer.append(card)
        })
        return commentsContainer;
    }


    /**
     * 
     * @param {string} selector 
     * @param {Array} data 
     */

    renderPosts(selector, data){
        const parentNode = document.querySelector(selector);
        parentNode.querySelectorAll('.post').forEach(post => post.remove());
        parentNode.querySelector('#spinner').remove();
        data.forEach(post =>{
            
            const {id: postID, title, body: content, tags, media, updated: date, _count, comments, author} = post;
            if(content === null || author.length === 0){
                
                return
            } else{
                const card = this.postCard();
                const header = this.postHeader(author, postID);
                const body = this.postBody(content, tags, media, date, postID)
                const footer = this.postFooter(postID,_count, comments)
                card.append(header, body, footer);
                parentNode.append(card);
            }

           
        })
    }
}