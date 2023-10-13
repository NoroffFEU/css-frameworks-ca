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
    function allPostPaginatedby100() {
        let count = -100;
        function incrementUrl() {
            count += 100;
            return `https://api.noroff.dev/api/v1/social/posts?limit=100&offset=${count}&_author=true&_comments=true&_reactions=true`;
        }
        function resetCount() {
            count = -100;
        }
        function getCount() {
            return count;
        }
        return { resetCount, incrementUrl, getCount };
    }
    function sortUrl() {
        let url;
        let count = 0;
        let previousSearch;
        function setString(newUrl, offset = 10, limit = 10) {
            /*if (limit) {
              let urlWithLimit = new URL(newUrl);
              let params = new URLSearchParams(urlWithLimit);
              params.set("limit", limit.toString());
              urlWithLimit.search = params.toString();
              newUrl = urlWithLimit.toString();
            }
      */
            let urlObject = new URL(newUrl);
            let incrementedUrl = new URLSearchParams(urlObject.search);
            if (limit) {
                incrementedUrl.set("limit", limit.toString());
                urlObject.search = incrementedUrl.toString();
                newUrl = urlObject.toString();
            }
            console.log(newUrl + count, "___", url);
            if (newUrl + count === url) {
                count += offset;
                incrementedUrl.set("offset", count.toString());
                urlObject.search = incrementedUrl.toString();
                url = urlObject.toString();
            }
            else {
                count = 0;
                url = newUrl + count;
                console.log("elseRoute");
            }
            return url;
        }
        function getString() {
            return url;
        }
        function getCount() {
            return count;
        }
        function setCount(number) {
            count = number;
        }
        function setSearch(searchWord) {
            if (searchWord !== previousSearch)
                setCount(0);
        }
        function getSearch() {
            return previousSearch;
        }
        return { setString, getString, getCount, setCount, setSearch, getSearch };
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
            return `https://api.noroff.dev/api/v1/social/posts/${id}?_author=true&_comments=true&_reactions=true`;
        },
        comment: function (id) {
            return `https://api.noroff.dev/api/v1/social/posts/${id}/comment`;
        },
        react: function (symbol, id) {
            return `https://api.noroff.dev/api/v1/social/posts/${id}/react/${symbol}`;
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
            const validCategories = ["title", "tags", "created", "body"];
            sort = validCategories.some((element) => element === sort)
                ? sort
                : "updated";
            return `https://api.noroff.dev/api/v1/social/posts?limit=10&_author=true&_comments=true&_reactions=true&sort=${sort}&sortOrder=${order}&offset=`;
        },
        filterUrl: allPostPaginatedby100(),
    };
}
