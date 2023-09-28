export const endpoints = {
  register: "/social/auth/register",
  login: "/social/auth/login",
  baseUrl: "https://api.noroff.dev/api/v1",
  oneUser: "/social/profiles/<name>",
  allUsers: "/social/profiles",
  postsByOneUser: "/social/profiles/<name>/posts",
};

export default function endpointObject(userId: string | null) {
  function closureCount() {
    let _count: number = -10;
    const increment: Function = () => {
      console.log(_count + 10);
      return (_count += 10);
    };

    return increment;
  }

  function sortUrl() {
    let url: string | null = null;
    let count = 0;

    function setString(newUrl: string, offset: number = 10) {
      console.log("URL", url, "----------------" + "NEWURL", newUrl);
      if (newUrl + count === url) {
        count += offset;
        let urlObject = new URL(url);
        let incrementedUrl = new URLSearchParams(urlObject.search);
        incrementedUrl.set("offset", count.toString());
        urlObject.search = incrementedUrl.toString();
        url = urlObject.toString();
        console.log(url, "det funka");
      } else {
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
    getId: function (id: number) {
      return `https://api.noroff.dev/api/v1/social/posts/${id}`;
    },
    react: function (symbol: string) {
      return `https://api.noroff.dev/api/v1/social/posts/<id>/react/${symbol}`;
    },
    getToken: function () {
      return JSON.parse(localStorage.getItem("token") || "");
    },
    sortAfter: function (
      sortWord: string = "updated",
      sortOrder: string = "desc"
    ) {
      return `https://api.noroff.dev/api/v1/social/posts?limit=10&offset=${countTen()}&_author=true&_comments=true&_reactions=true&sort=${sortWord}&sortOrder=${sortOrder}`;
    },
    paginatedSort: function (sort: string, order: string) {
      const counter = closureCount();

      return `https://api.noroff.dev/api/v1/social/posts?limit=10&offset=${counter()}&_author=true&_comments=true&_reactions=true&sort=${sort}&sortOrder=${order}`;
    },
    sortAndPaginate: sortUrl(),
    generatePaginate: function (sort: string, order: string) {
      return `https://api.noroff.dev/api/v1/social/posts?limit=1&_author=true&_comments=true&_reactions=true&sort=${sort}&sortOrder=${order}&offset=`;
    },
  };
}
