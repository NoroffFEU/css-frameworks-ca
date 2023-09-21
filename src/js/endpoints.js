export const endpoints = {
    register: "/social/auth/register",
    login: "/social/auth/login",
    baseUrl: "https://api.noroff.dev/api/v1",
    oneUser: "/social/profiles/<name>",
    allUsers: "/social/profiles",
    postsByOneUser: "/social/profiles/<name>/posts",
};
export default function endpointObject(userId) {
    function closureCount() {
        let _count = -10;
        const increment = () => {
            return (_count += 10);
        };
        return increment;
    }
    const countTen = closureCount();
    return {
        register: "https://api.noroff.dev/api/v1/social/auth/register",
        login: "https://api.noroff.dev/api/v1/social/auth/login",
        baseUrl: "https://api.noroff.dev/api/v1",
        profileOneUser: `https://api.noroff.dev/api/v1/social/profiles/${userId}`,
        profileOneUserAllEnabled: `https://api.noroff.dev/api/v1/social/profiles/${userId}?_posts=true&_followers=true&_following=true`,
        profileAllUsers: "https://api.noroff.dev/api/v1/social/profiles",
        follow: `https://api.noroff.dev/api/v1/social/profiles/${userId}/follow`,
        unfollow: `https://api.noroff.dev/api/v1/social/profiles/${userId}/unfollow`,
        postsByOneUser: `https://api.noroff.dev/api/v1/social/profiles/${userId}/posts`,
        changeMedia: `https://api.noroff.dev/api/v1/social/profiles/${userId}/media`,
        allPostsFollowed: `https://api.noroff.dev/api/v1/social/posts/following?_author=true`,
        createPost: `https://api.noroff.dev/api/v1/social/posts`,
        paginatedPosts: `https://api.noroff.dev/api/v1/social/posts?limit=100&offset=${countTen()}&_author=true&_comments=true&_reactions=true&sort=updated`,
        getId: function (id) {
            return `https://api.noroff.dev/api/v1/social/posts/${id}`;
        },
        react: function (symbol) {
            return `https://api.noroff.dev/api/v1/social/posts/<id>/react/${symbol}`;
        },
        getToken: function () {
            return JSON.parse(localStorage.getItem("token") || "");
        },
        //searchFor: function (category: string, query: string) {
        // return `https://api.noroff.dev/api/v1/social/posts?${category}=${query}`;
        //},
    };
}
