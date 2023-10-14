/**
 * 
 * @param {Array} followers 
 * @returns string || null
 */
const checkFollow = (followers)=>{
    const loggedInUser = localStorage.getItem("user");
    return followers.find(follower => follower.name == loggedInUser)
}
export default checkFollow;