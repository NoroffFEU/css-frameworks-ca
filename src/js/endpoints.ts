 export const endpoints = {
    register:"/social/auth/register",
    login:"/social/auth/login",
    baseUrl:"https://api.noroff.dev/api/v1",
    oneUser:"/social/profiles/<name>",
    allUsers:"/social/profiles",
    postsByOneUser:"/social/profiles/<name>/posts"
}


export default function endpointObject(userId:string){
    return {register:"/social/auth/register",
    login:"/social/auth/login",
    baseUrl:"https://api.noroff.dev/api/v1",
    oneUser:`/social/profiles/${userId}`,
    allUsers:"/social/profiles",
    postsByOneUser:`/social/profiles/${userId}/posts`
    }}


function getUserUrl(userID:string){
    return ``
}

