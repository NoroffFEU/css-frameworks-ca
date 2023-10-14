
export default  class apiClient{
    constructor(){
        this.BASE_URL = 'https://api.noroff.dev';
        this.REGISTER_USER_URL = '/api/v1/social/auth/register';
        this.SIGN_IN_URL = '/api/v1/social/auth/login',
        this.GET_USERS_URL = '/api/v1/social/profiles',
        this.GET_POSTS = '/api/v1/social/posts'
    }

    /**
     * 
     * @param {object} payload 
     * @param {callback} callback 
     */
    async registerUser(payload, callback){
        
        try{
            const postData = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            };
            
            const response = await fetch(`${this.BASE_URL}${this.REGISTER_USER_URL}`, postData)
            const {status: statusCode} = response;
            console.log(response)
            const json = await response.json();
            
            const data = {
                validRegistration: statusCode === 201,
                data: json,
            }
            callback(data);
        }
        catch (error){
            console.log(error)
        }
    };
    /**
     * 
     * @param {object} payload 
     * @param {callback} callback 
     */
    async login(payload, callback){
        try{
            const postData = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            };

            const response = await fetch(`${this.BASE_URL}${this.SIGN_IN_URL}`, postData);
            const {status: statusCode} = response;
            const json = await response.json();
            const data = {
                isAuthenticated: statusCode === 200,
                data: json,
            }
            callback(data);
            
        }
        catch(error){
            console.log(error);
        }
    };
    /**
     * 
     * @param {object} payload 
     * @returns {Array}
     */
    async fetchProfile(payload){
        try{
            const accessToken = localStorage.getItem('accessToken');
            const postData = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }
            }
            const response = await fetch(`${this.BASE_URL}${this.GET_USERS_URL}/${payload}?_following=true&_followers=true&_posts=true`, postData)
            const json = await response.json()
            return json;
        }
        catch(error){
            console.log(error)
        }
    }
    /**
     * 
     * @param {object} payload 
     * @returns {Array}
     */
    async fetchProfilePosts(payload){
        try{
            const accessToken = localStorage.getItem('accessToken');
            const postData = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }
            }
            const response = await fetch(`${this.BASE_URL}${this.GET_USERS_URL}/${payload}/posts?_author=true&_comments=true&_reactions=true`, postData)
            const json = await response.json()
            return json;
        }
        catch(error){
            console.log(error)
        }
    }
    /**
     * 
     * @returns {Array}
     */
    async fetchPosts(){
        
        try{
            
            const accessToken = localStorage.getItem('accessToken');
            const postData = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }
            }
            
            const response = await fetch(`${this.BASE_URL}${this.GET_POSTS}?_author=true&_comments=true&_reactions=true`, postData)
            const json = await response.json()
            
            return json
        }
        catch(error){
            console.log(error)
        }

    }

    /**
     * 
     * @param {object} payload 
     * @returns {Array}
     */

    async newPost(payload){
        console.log(payload);
        try{
            const accessToken = localStorage.getItem('accessToken');
            const postData = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(payload)
            }
            const response = await fetch(`${this.BASE_URL}${this.GET_POSTS}`, postData)
            const json = await response.json()
            return json
        }
        catch(error){
            console.log(error)
        }
    }
    /**
     * 
     * @param {string} appliedFilter 
     * @returns {Array}
     */
    async sortPosts(appliedFilter){
        try{
            const accessToken = localStorage.getItem('accessToken');
            const postData = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }
            }
            
            
            const response = await fetch(`${this.BASE_URL}${this.GET_POSTS}?${appliedFilter}&_author=true&_comments=true&_reactions=true`, postData)
            const json = await response.json()

            return json
        }
        catch(error){
            console.log(error)
        }

    }
    /**
     * 
     * @param {string} username 
     * @returns {Array}
     */
    async followUser(username){
        try{
            const accessToken = localStorage.getItem('accessToken');
            const postData = {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
            
            
            const response = await fetch(`${this.BASE_URL}${this.GET_USERS_URL}/${username}/follow`, postData)
            const json = await response.json()
           
            return json
        }
        catch(error){
            console.log(error)
        }
    }
    /**
     * 
     * @param {string} username 
     * @returns {Array}
     */
    async unFollowUser(username){
        try{
            const accessToken = localStorage.getItem('accessToken');
            const postData = {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
            
            
            const response = await fetch(`${this.BASE_URL}${this.GET_USERS_URL}/${username}/unfollow`, postData)
            const json = await response.json()
           
            return json
        }
        catch(error){
            console.log(error)
        }
    }

    /**
     * 
     * @param {number} id 
     * @param {object} payload 
     * @returns {Array}
     */

    async editPost(id, payload){
        
        try{
            const accessToken = localStorage.getItem('accessToken');
            const postData = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(payload)
            }
            const response = await fetch(`${this.BASE_URL}${this.GET_POSTS}/${id}`, postData)
            const json = await response.json()
        
            return json
        }
        catch(error){
            console.log(error)
        }
    }

    /**
     * 
     * @param {number} id 
     * @returns {Array}
     */
    async deletePost(id){
        try{
            const accessToken = localStorage.getItem("accessToken")
            const postData = {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },   
            }
            const response = await fetch(`${this.BASE_URL}${this.GET_POSTS}/${id}`, postData)
            const json = await response.json()
            
            return json
        } 
        catch(error){
            console.log(error)
        }
    }

    /**
     * 
     * @param {Number} id 
     * @param {Object} payload 
     * @returns {Array}
     */

    async postComment(id, payload){
        try{
            const accessToken = localStorage.getItem("accessToken")
            const postData = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(payload)
            }
            const response = await fetch(`${this.BASE_URL}${this.GET_POSTS}/${id}/comment`, postData)
            const json = await response.json()
            return json
        } 
        catch(error){
            console.log(error)
        }
    }

    /**
     * 
     * @param {Number} id 
     * @returns {Array}
     */

    async likeComment(id){
        try{
            const accessToken = localStorage.getItem("accessToken")
            const postData = {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
            const response = await fetch(`${this.BASE_URL}${this.GET_POSTS}/${id}/react/👍`, postData)
            const json = await response.json()
            return json
        } catch(error){
            console.log(error)
        }
    }

    /**
     * 
     * @param {String} name 
     * @param {Object} payload 
     * @returns {Array}
     */
    async updateAvatar(name, payload){
        try{
            const accessToken = localStorage.getItem("accessToken")
            const postData = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(payload)
            }
            const response = await fetch(`${this.BASE_URL}${this.GET_USERS_URL}/${name}/media/`, postData)
            const json = await response.json()
            return json
        } catch(error){
            console.log(error)
        }
    }


}