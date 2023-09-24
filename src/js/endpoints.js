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
            console.log(_count + 10);
            return (_count += 10);
        };
        return increment;
    }
    function sortUrl() {
        let url = null;
        let count = 0;
        function setString(newUrl, offset = 10) {
            console.log("URL", url, "----------------" + "NEWURL", newUrl);
            if (newUrl + count === url) {
                count += offset;
                let urlObject = new URL(url);
                let incrementedUrl = new URLSearchParams(urlObject.search);
                incrementedUrl.set("offset", count.toString());
                urlObject.search = incrementedUrl.toString();
                url = urlObject.toString();
                console.log(url, "det funka");
            }
            else {
                count = 0;
                url = newUrl + count;
            }
            return url;
        }
        function getString() {
            return url;
        }
        function getCount() {
            return count;
        }
        return { setString, getString, getCount };
    }
    const countTen = closureCount();
    const countTenFollowed = closureCount();
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
        allPostsFollowed: `https://api.noroff.dev/api/v1/social/posts/following??limit=10&offset=${countTenFollowed()}&_author=true&_comments=true&_reactions=true&sort=updated`,
        createPost: `https://api.noroff.dev/api/v1/social/posts`,
        paginatedPosts: `https://api.noroff.dev/api/v1/social/posts?limit=10&offset=${countTen()}&_author=true&_comments=true&_reactions=true&sort=updated`,
        getId: function (id) {
            return `https://api.noroff.dev/api/v1/social/posts/${id}`;
        },
        react: function (symbol) {
            return `https://api.noroff.dev/api/v1/social/posts/<id>/react/${symbol}`;
        },
        getToken: function () {
            return JSON.parse(localStorage.getItem("token") || "");
        },
        sortAfter: function (sortWord = "updated", sortOrder = "desc") {
            return `https://api.noroff.dev/api/v1/social/posts?limit=10&offset=${countTen()}&_author=true&_comments=true&_reactions=true&sort=${sortWord}&sortOrder=${sortOrder}`;
        },
        paginatedSort: function (sort, order) {
            const counter = closureCount();
            return `https://api.noroff.dev/api/v1/social/posts?limit=10&offset=${counter()}&_author=true&_comments=true&_reactions=true&sort=${sort}&sortOrder=${order}`;
        },
        sortAndPaginate: sortUrl(),
        generatePaginate: function (sort, order) {
            return `https://api.noroff.dev/api/v1/social/posts?limit=10&_author=true&_comments=true&_reactions=true&sort=${sort}&sortOrder=${order}&offset=`;
        },
    };
}
